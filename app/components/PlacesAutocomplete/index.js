import React, { Component } from 'react';
import CustomPlacesAutocomplete from './CustomPlacesAutocomplete';
import PropTypes from 'prop-types';

class PlacesFieldCustom extends Component {
  render() {
    return (
      <CustomPlacesAutocomplete
        disabled={this.props.disabled}
        address={(typeof this.props.value === 'object') ? this.props.value.placesAddressTo : this.props.value}
        onSelect={(data) => {
          this.setState({ value: data }, () => {
            if (this.props.onSelect) {
              this.props.onSelect(data);
            }
          });
        }}
        onChange={(data) => {
          this.setState({ value: data }, () => {
            if (this.props.onChange) {
              this.props.onChange(data);
            }
          });
        }}
        searchOptions={this.props.searchOptions}
        placeholder={this.props.placeholder}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        name={this.props.name}
      />
    );
  }
}

PlacesFieldCustom.propTypes = {
  onSelect: PropTypes.any,
  onChange: PropTypes.any,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  searchOptions: PropTypes.bool,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
};

PlacesFieldCustom.defaultProps = {
  onSelect: () => {
  },
  onChange: () => {
  },
};

export default PlacesFieldCustom;
