import React from 'react';
// import ReactDOM from 'react-dom';
import Input from 'components/Input';
import TreeSelect from 'antd/lib/tree-select';
import Icon from 'antd/lib/icon';
import radiusData from './radius-data.json';
import { StyledComponent } from './styled/styled';
// import { get, isEmpty, isEqual } from 'lodash';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import PlacesFieldCustom from 'components/PlacesAutocomplete';
import Geocode from 'react-geocode';
// import $ from 'jquery';
import { configuration } from '../../constants';
import env from 'env';
// Utils
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saga from './saga';
import { bindActionCreators, compose } from 'redux';
import reducer from './reducer';
import { getBrands, onChange, onSearchDeals } from './actions';
import selectSearchBarDomain from './selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import SearchCategory from './styled/SearchCategory';
import SearchLocation from './styled/SearchLocation';
import SearchLocationRadius from './styled/SearchLocationRadius';
import SearchSubmit from './styled/SearchSubmit';
import SearchInput from './styled/SearchInput';
import CommonButton from 'components/CommonButton';
import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import { DAEMON } from '../../utils/constants';

const TreeNode = TreeSelect.TreeNode;

export class SearchBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      location: {
        address: configuration.geoLocation.address,
        latitude: configuration.geoLocation.lat,
        longitude: configuration.geoLocation.lon,
      },
      value: '',
      brands: [],
      filterData: {},
      keyForReload: null,
    };
    this.getLatLongFromAddress = this.getLatLongFromAddress.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    this.props.getBrands();
    if (this.props.isSearchOnLoadPage) {
      this.props.onSearchDeals();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.props.onChange('keywords', '');
      this.handleSearch();
    }
    if (!isEmpty(nextProps.brands)) {
      this.setState({
        brands: nextProps.brands,
      });
      if (this.props.handleGetBrands) {
        this.props.handleGetBrands(nextProps.brands);
      }
    }

    if (!isEmpty(nextProps.deals) && this.props.handleSearch) {
      this.props.handleSearch(nextProps.deals, false, get(this.props.searchData, 'keywords'));
    }

    if (!isEqual(nextProps.filterData, this.props.filterData)) {
      Object.entries(nextProps.filterData).forEach((entry) => {
        let key = entry[0];
        let value = entry[1];
        this.props.onChange(key, value);
      });
      this.handleSearch();
    }

    if (nextProps.keyForReload && !isEqual(nextProps.keyForReload, this.state.keyForReload)) {
      this.setState({
        keyForReload: nextProps.keyForReload,
      });

      this.handleSearch();
    }
  }

  getLatLongFromAddress(address) {
    const { location } = this.state;

    Geocode.setApiKey(env.GOOGLE_MAP_API);

    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        location.latitude = lat.toString();
        location.longitude = lng.toString();

        this.props.onChange('lat', location.latitude);
        this.props.onChange('lon', location.longitude);

        this.setState({
          location,
        });
      },
      (error) => {
        // console.log(error);
      }
    );
  }
  handleKeyUp(event) {
    if (event.keyCode === 13) {
      return this.handleSearch();
    }
    return false;
  }
  handleSearch(params = {}) {
    
    if(this.props.redirect){
      this.props.redirect();
    }
    if (this.props.overrideSearch) {
      this.props.overrideSearch();
    } else {
      this.props.handleSearch(null, true, get(this.props.searchData, 'keywords'));
      this.props.onSearchDeals(params);
    }
  }

  render() {
    return (
      <StyledComponent className={`${this.props.header?"mobile-view":"d-none d-md-block"} ${this.props.show ? '':'d-none'}`}>
        <div className="search-bar">
          <SearchCategory className={'d-none d-md-block'}>
            <TreeSelect
              
              showSearch
              // treeIcon
              style={{ height: 60, width: '100%' }}
              value={`${get(this.props.searchData, 'brand')}-${get(this.props.searchData, 'model')}`}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              defaultValue={'0-0'}
              switcherIcon={<Icon type="caret-down" />}
              dropdownClassName={'dropdown-cat'}
              treeNodeFilterProp="title"
              onSelect={(value, node, extra) => {
                const arr = value.split('-');

                this.props.onChange('brand', arr[0]);
                this.props.onChange('model', arr[1]);

                // this.handleSearch();
              }}
            >
              {
                this.state.brands.map((brand, index) => (
                  <TreeNode value={`${brand.id}-0`} title={brand.name} key={`cat-${index}`}>
                    {
                      brand.models && brand.models.map((model, idx) => (
                        <TreeNode value={`${brand.id}-${model.id}`} title={model.name} key={`cat-${index}-${idx}`} />
                      ))
                    }
                  </TreeNode>
                ))
              }
            </TreeSelect>
          </SearchCategory>

          <SearchInput>
            <Input
              customBootstrapClass="col-md-12"
              didCheckErrors={false}
              errors={[]}
              key="key"
              name="keywords"
              onChange={({ target }) => this.props.onChange(target.name, target.value)}
              onKeyUp={this.handleKeyUp}
              placeholder="I'm looking for..."
              type="text"
              value={get(this.props.searchData, 'keywords')}
              validations={{ required: true }}
              label=""
            />
          </SearchInput>

          <SearchLocation  className={'d-none d-md-block'}>
            <PlacesFieldCustom
              value={get(this.props.searchData, 'address')}
              onSelect={(addr) => {
                // const streetNumber = addr.street_number ? addr.street_number : '';
                // const route = addr.route ? addr.route : '';

                const { location } = this.state;
                location.full_address = addr.placesAddressTo;
                location.ward = addr.political;
                location.district = addr.administrative_area_level_2;
                location.province = addr.administrative_area_level_1;

                location.address = location.district ? `${location.district}, ${location.province}` : location.province;

                this.props.onChange('address', location.address);

                this.setState({
                  location,
                }, () => {
                  this.getLatLongFromAddress(location.address);
                });
              }}
              onChange={(addr) => {
                const { location } = this.state;
                location.address = addr;

                this.props.onChange('address', location.address);
                this.setState({
                  location,
                });
              }}
              placeholder={'Input location here...'}
            />
          </SearchLocation>

          <SearchLocationRadius  className={'d-none d-md-block'}>
            <TreeSelect
              treeIcon
              dropdownClassName={'dropdown-radius'}
              style={{ height: 60, width: '100%' }}
              value={get(this.props.searchData, 'radius')}
              // dropdownStyle={{ width: '120px' }}
              placeholder="Please select"
              defaultValue={'0'}
              allowClear={false}
              treeDefaultExpandAll={false}
              onSelect={(value, node, extra) => {
                this.props.onChange('radius', value);
              }}
              // dropdownMatchSelectWidth={false}
            >
              {
                radiusData.map((item, index) => (
                  <TreeNode icon={index !== 0 ? <Icon type="plus" style={{ fontSize: '14px' }} /> : ''} value={item.value} title={item.title} key={`radius-${index}`} />
                ))
              }
            </TreeSelect>
          </SearchLocationRadius>

          <SearchSubmit>
            <CommonButton
              type="submit"
              className={classNames('search-bar__submit-button', Classes.INTENT_PRIMARY)}
              onClick={this.handleSearch}
            >
              <i className="fa fa-search" />
            </CommonButton>
          </SearchSubmit>
        </div>
      </StyledComponent>
    );
  }
}

SearchBar.propTypes = {
  isSearchOnLoadPage: PropTypes.bool,
  filterData: PropTypes.object,
  brands: PropTypes.array,
  deals: PropTypes.object,
  searchData: PropTypes.object,
  getBrands: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearchDeals: PropTypes.func.isRequired,
  handleSearch: PropTypes.func,
  overrideSearch: PropTypes.func,
  handleGetBrands: PropTypes.func,
  keyForReload: PropTypes.string,
  location: PropTypes.object,
  redirect:PropTypes.func,
};

SearchBar.defaultProps = {
  isSearchOnLoadPage: false,
};

const mapStateToProps = selectSearchBarDomain();

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBrands,
      onChange,
      onSearchDeals,
    },
    dispatch
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchBar', reducer });
const withSaga = injectSaga({ key: 'searchBar', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(SearchBar);
