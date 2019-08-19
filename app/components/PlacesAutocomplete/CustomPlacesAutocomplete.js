import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import StyledWrapper from './styled/StyledWrapper';
import env from 'env';

class CustomPlacesAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placesAddressTo: '',
      gmapsLoaded: false,
      searchOptions: {
        radius: 2000000,
        language: env.LANGUAGE || 'vi',
      },
    };
    this.initMap = this.initMap.bind(this);
  }

  componentDidMount() {
    if (!window.google) {
      window.initMap = this.initMap;
      const gmapScriptEl = document.createElement('script');
      gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_MAP_API}&libraries=places&callback=initMap`;
      document.querySelector('body').insertAdjacentElement('beforeend', gmapScriptEl);
    } else {
      this.initMap();
    }
  }

  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    });
  }

  render() {
    const { searchOptions } = this.state;

    if (window.google) {
      // Initial Viet Nam location center
      searchOptions.location = new window.google.maps.LatLng(10.762622, 106.660172);
    }

    const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
      <div>
        <input
          {...getInputProps({
            placeholder: this.props.placeholder,
            className: 'location-search-input form-control',
            disabled: this.props.disabled,
            onFocus: this.props.onFocus,
            onBlur: this.props.onBlur,
            name: this.props.name,
          })}
        />
        <div className="pac-container pac-logo">
          {suggestions.map((suggestion) => {
            const className = suggestion.active ? 'suggestion-item--active pac-item' : 'suggestion-item pac-item';
            // inline style for demonstration purpose
            const style = suggestion.active
              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
              : { backgroundColor: '#ffffff', cursor: 'pointer' };
            return (
              <div className="pac-item" {...getSuggestionItemProps(suggestion, { className, style })}>
                <span className="pac-icon pac-icon-marker" />
                <span className="pac-item-query"> <span>{suggestion.description}</span></span>
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <StyledWrapper>
        {this.state.gmapsLoaded && (
        <PlacesAutocomplete
          value={(typeof this.props.address === 'object') ? this.props.address.placesAddressTo : this.props.address}
          onChange={(placesAddressTo) => {
            this.setState({
              placesAddressTo,
            });
            this.props.onChange(placesAddressTo);
          }}
          onSelect={(placesAddressTo) => {
            geocodeByAddress(placesAddressTo)
              .then((results) => {
                const place = results[0];

                const componentForm = {
                  street_number: 'short_name',
                  route: 'long_name',
                  political: 'long_name',
                  sublocality_level_1: 'long_name',
                  administrative_area_level_2: 'short_name',
                  administrative_area_level_1: 'short_name',
                  country: 'long_name',
                };
                const data = {};
                for (let i = 0; i < place.address_components.length; i++) {
                  const addressType = place.address_components[i].types[0];
                  if (componentForm[addressType]) {
                    const val = place.address_components[i][componentForm[addressType]];
                    data[addressType] = val;
                  }
                }
                data.placesAddressTo = placesAddressTo;
                if (!data.political) {
                  const regex = /Phường (.*?),/;
                  const matched = regex.exec(place.formatted_address);
                  if (matched && matched.length > 1) {
                    data.political = matched[1];
                  }
                }
                this.props.onSelect(data);
              })
              .catch((error) => console.error('Error', error));
          }}
          searchOptions={this.props.searchOptions ? searchOptions : null}
          debounce={1000}
          highlightFirstSuggestion
        >
          {renderFunc}
        </PlacesAutocomplete>
        )}
        {this.state.errorMessage && <mdall className="text-danger">{this.state.errorMessage}</mdall>}
      </StyledWrapper>
    );
  }
}

CustomPlacesAutocomplete.propTypes = {
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  address: PropTypes.string,
  placeholder: PropTypes.string,
  searchOptions: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
};
CustomPlacesAutocomplete.defaultProps = {
  searchOptions: true,
};
export default CustomPlacesAutocomplete;
