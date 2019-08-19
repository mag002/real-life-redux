/**
 *
 * ProfileSettingPage
 *
 */

// import { find, isEmpty, orderBy } from 'lodash';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import React from 'react';
import saga from './saga';
import env from '../../env';
import { compose } from 'redux';
import reducer from './reducer';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Geocode from 'react-geocode';
import { connect } from 'react-redux';
// import { Col, Row } from 'reactstrap';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';
import { KEY_APP } from './constants';
import injectSaga from 'utils/injectSaga';
import { FormValidation } from 'calidation';
import StyledTitle from './styled/StyledTitle';
import injectReducer from 'utils/injectReducer';
import CommonInput from 'components/CommonInput';
import { Classes, Card } from '@blueprintjs/core';
import CommonButton from 'components/CommonButton';
import { createStructuredSelector } from 'reselect/es';
import makeSelectProfileSettingPage from './selectors';
import { isRequired, isEmail } from 'utils/formValidation';
import { convertListObjectToLookup } from 'utils/commonHelper';
import * as inputTypes from 'components/CommonInput/constants';
import { defaultAction, updateProfileSetting } from './actions';
import ErrorForm from '../../components/ErrorForm';
import StyledCard from './styled/StyledCard'
export class ProfileSettingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      email: '',
      name: '',
      address: '',
      province: '',
      county: '',
      locations: [],
      provincesOptions: [],
      countyOptions: [],
      provinceSelected: null,
      countySelected: null,
      location: {
        province: '',
        county: '',
        latitude: '',
        longitude: '',
      },
      errorMessages: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLatLongFromAddress = this.getLatLongFromAddress.bind(this);
    this.callbackError = this.callbackError.bind(this);
    this.handleResetState = this.handleResetState.bind(this);
    this.baseState = null;
  }

  componentDidMount() {
    this.props.onInitData();
  }

  componentWillReceiveProps(nextProps) {
    const self = this;
    if (nextProps.profileSettingPage && this.props.profileSettingPage !== nextProps.profileSettingPage) {
      const newState = {
        phone: nextProps.profileSettingPage.user.phone,
        email: nextProps.profileSettingPage.user.email ? nextProps.profileSettingPage.user.email : '',
        name: nextProps.profileSettingPage.user.name || nextProps.profileSettingPage.user.store_name,
        address: nextProps.profileSettingPage.user.address,
        province: nextProps.profileSettingPage.user.province_id,
        county: nextProps.profileSettingPage.user.county_id,
        locations: nextProps.profileSettingPage.locations,
        location: {
          latitude: nextProps.profileSettingPage.user.latitude || '',
          longitude: nextProps.profileSettingPage.user.longitude || '',
        },
      };
      this.setState(newState, () => {
        const provincesOptions = !isEmpty(this.props.profileSettingPage.locations) ? convertListObjectToLookup(this.props.profileSettingPage.locations, 'name', 'id') : [];
        const provinceItem = find(this.state.locations, { id: nextProps.profileSettingPage.user.province_id });
        const countyOptions = !isEmpty(provinceItem) && !isEmpty(provinceItem.counties) ? convertListObjectToLookup(provinceItem.counties, 'name', 'id') : [];
        const countySorted = orderBy(countyOptions, ['name'], ['asc']);
        const countyItem = find(countyOptions, { value: nextProps.profileSettingPage.user.county_id });
        let optionSelect = {
          provinceSelected: {
            value: provinceItem.id,
            label: provinceItem.name,
          },
          countySelected: {
            value: countyItem.value,
            label: countyItem.label,
          },
          countyOptions: countySorted,
          provincesOptions,
        };
        self.setState(optionSelect);
        self.baseState = { ...newState, ...optionSelect };
      });
      if (this.formContext) {
        this.formContext.setField(newState);
      }
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
        this.setState({
          location,
        });
      },
      (error) => {
        console.error('Error', error);
      },
    );
  }

  handleResetState() {
    this.setState(this.baseState);
    if (this.formContext) {
      this.formContext.setField(this.baseState);
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value, errorMessages: '' });
  }

  handleChangeSelectCity(evt) {
    this.setState({
      countySelected: null,
    });
    const target = {
      value: evt.value,
      name: 'province',
    };
    const provinceItem = find(this.state.locations, { id: evt.value });
    const countyOptions = !isEmpty(provinceItem.counties) ? convertListObjectToLookup(provinceItem.counties, 'name', 'id') : [];
    const countySorted = orderBy(countyOptions, ['name'], ['asc']);
    this.setState({
      provinceSelected: evt,
      countyOptions: countySorted,
    }, () => this.handleChange({ target }));
  }

  handleChangeSelectDistrict(evt) {
    const target = {
      value: evt.value,
      name: 'county',
    };

    this.setState({
      countySelected: evt,
    }, () => this.handleChange({ target }));
  }

  callbackError(errorObj) {
    this.setState({ errorMessages: errorObj.payload.error });
  }

  handleSubmit() {
    const data = {
      phone: this.state.phone,
      email: this.state.email,
      name: this.state.name,
      address: this.state.address,
      province_id: this.state.province,
      county_id: this.state.county,
      longitude: this.state.location.longitude,
      latitude: this.state.location.latitude,
    };
    this.props.onSubmit(data, this.callbackError);
  }

  render() {
    const formConfig = {
      name: {
        ...isRequired(),
      },
      address: {
        ...isRequired(),
      },
      email: {
        // ...isRequired(),
        ...isEmail(),
      },
    };
    const initialValues = {
      phone: this.state.phone,
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      province: this.state.province,
      county: this.state.county,
    };
    return (
      <StyledCard style={{ borderRadius: 0 }} className={'mb-3'}>
        <FormValidation
          onSubmit={({ isValid }) => {
            if (isValid) {
              this.handleSubmit();
            }
          }}
          config={formConfig}
          initialValues={initialValues}
        >
          {(ctx) => {
            this.formContext = ctx;
            const { fields, errors, submitted } = ctx;
            return (<div className={'mb-5'}>
              <StyledTitle>1. Personal Detail</StyledTitle>

              <Row style={{ paddingLeft: '20px' }}>
                <Col lg={7}>
                  <CommonInput
                    label={'Your Phone'}
                    name={'phone'}
                    onChange={this.handleChange}
                    type={'text'}
                    value={this.state.phone}
                    readOnly
                  />

                  <CommonInput
                    autoFocus
                    label={'Your Contact Name'}
                    name={'name'}
                    onChange={this.handleChange}
                    type={'text'}
                    value={fields.name}
                    errors={errors.name}
                    submitted={submitted}
                  />

                  <CommonInput
                    label={'Your Email'}
                    name={'email'}
                    onChange={this.handleChange}
                    type={'text'}
                    value={fields.email}
                    errors={errors.email}
                    submitted={submitted}
                  />
                </Col>
              </Row>

              <StyledTitle>2. Address</StyledTitle>

              <Row style={{ paddingLeft: '20px' }}>
                <Col lg={7}>
                  <CommonInput
                    name={'address'}
                    type={inputTypes.PLACE_AUTOCOMPLETE}
                    value={fields.address}
                    onSelect={(addr) => {
                      let { location, address } = this.state;
                      address = addr.placesAddressTo;
                      location.county = addr.administrative_area_level_2;
                      location.province = addr.administrative_area_level_1;
                      const provinceItem = find(this.state.locations, (item) => item.name.includes(location.province));
                      const countyOptions = !isEmpty(provinceItem) && !isEmpty(provinceItem.counties) ? convertListObjectToLookup(provinceItem.counties, 'name', 'id') : [];
                      const countySorted = orderBy(countyOptions, ['name'], ['asc']);
                      const countyItem = find(countyOptions, (item) => item.label.includes(location.county));
                      const prevProvince = this.state.province,
                        prevCounty = this.state.county;
                      this.setState({
                        provinceSelected: provinceItem ? {
                          value: provinceItem.id,
                          label: provinceItem.name,
                        } : null,
                        province: provinceItem ? provinceItem.id : prevProvince,
                        countySelected: countyItem ? {
                          value: countyItem.value,
                          label: countyItem.label,
                        } : null,
                        countyOptions: countySorted,
                        county: countyItem ? countyItem.value : prevCounty,
                      });
                      if (this.formContext) {
                        this.formContext.setField({
                          address: addr.placesAddressTo,
                        });
                      }
                      this.setState({
                        location,
                        address,
                      }, () => {
                        this.getLatLongFromAddress(address);
                      });
                    }}
                    onChange={(addr) => {
                      this.setState({
                        address: addr,
                      });
                      if (this.formContext) {
                        this.formContext.setField({
                          address: addr,
                        });
                      }
                    }}
                    label="Address"
                    searchOptions={false}
                  />

                  <Row>
                    <Col md={6}>
                      <CommonInput
                        type={inputTypes.SELECT}
                        name="province"
                        scrollMenuIntoView
                        clearable
                        isSearchable
                        label="City"
                        options={this.state.provincesOptions}
                        onChange={(evt) => this.handleChangeSelectCity(evt)}
                        value={this.state.provinceSelected}
                      />
                    </Col>
                    <Col md={6}>
                      <CommonInput
                        type={inputTypes.SELECT}
                        name="county"
                        isSearchable
                        scrollMenuIntoView
                        clearable
                        label="District"
                        value={this.state.countySelected}
                        options={this.state.countyOptions}
                        onChange={(evt) => this.handleChangeSelectDistrict(evt)}
                      />
                    </Col>
                  </Row>

                  <div className={'mt-4 ps-btn-group'}>

                    <CommonButton
                      className={classNames(Classes.LARGE,'cancel')}
                      onClick={this.handleResetState}
                    >Cancel</CommonButton>

                    <CommonButton
                      className={classNames(Classes.INTENT_PRIMARY, Classes.LARGE, 'ml-3','update')}
                      type="submit"
                    >Update Profile</CommonButton>
                  </div>
                </Col>
              </Row>

              <div className={'mt-4'}>
                <ErrorForm errorMessages={this.props.errorMessages} />
              </div>
            </div>);
          }}
        </FormValidation>
      </StyledCard>
    );
  }
}

ProfileSettingPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInitData: PropTypes.func.isRequired,
  profileSettingPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profileSettingPage: makeSelectProfileSettingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onInitData: (cbError) => dispatch(defaultAction(cbError)),
    onSubmit: (data, cbError, cbSuccess) => dispatch(updateProfileSetting(data, cbError, cbSuccess)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: KEY_APP, reducer });

const withSaga = injectSaga({ key: KEY_APP, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProfileSettingPage);
