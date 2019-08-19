import env from 'env';
import React from 'react';
import classNames from 'classnames';
import Geocode from 'react-geocode';
// import { Col, Row } from 'reactstrap';
import Row from 'reactstrap/es/Row';
import Col from 'reactstrap/es/Col';
import * as PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import { FormValidation } from 'calidation';
import { eUserType } from 'enums/EUserType';
// import { isEmpty, find, orderBy, get } from 'lodash';
import find from 'lodash/find';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import CommonInput from 'components/CommonInput';
import CommonButton from 'components/CommonButton';
import UploadAvatar from 'components/UploadAvatar';
import { isRequired, isEmail } from 'utils/formValidation';
import SelectFullAddress from 'components/SelectFullAddress';
import { convertListObjectToLookup } from 'utils/commonHelper';
import { FormTitle, FormSubTitle } from './styled/StyledForm';
import ErrorForm from '../../components/ErrorForm';

export default class FormCompleteProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDistrict: null,
      selectedCity: null,
      location: {
        address: '',
        province: '',
        county: '',
        latitude: '',
        longitude: '',
      },
      districtOptions: [],
    };
    this.handleChangeSelectCity = this.handleChangeSelectCity.bind(this);
    this.getLatLongFromAddress = this.getLatLongFromAddress.bind(this);
    this.handleChangeSelectDistrict = this.handleChangeSelectDistrict.bind(this);
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
        }, () => {
          const targetLatitude = {
            value: lat.toString(),
            name: 'latitude',
          };
          const targetLongitude = {
            value: lng.toString(),
            name: 'longitude',
          };
          this.props.onChange({ target: targetLatitude });
          this.props.onChange({ target: targetLongitude });
        });
      },
      (error) => {
        console.error('Error', error);
      },
    );
  }

  handleChangeSelectCity(evt) {
    const target = {
      value: evt.value,
      name: 'province_id',
    };
    const provinceItem = find(this.props.locations, { id: evt.value });
    const countyOptions = !isEmpty(provinceItem.counties) ? convertListObjectToLookup(provinceItem.counties, 'name', 'id') : [];
    const countySorted = orderBy(countyOptions, ['name'], ['asc']);
    // this.setState((prevState) => {
    //   console.log(prevState);
    //   if (prevState.selectedCity.value !== target.value) { return { selectedDistrict: this.state.districtOptions[0] }; }
    //   return null;
    // });
    this.setState({
      selectedCity: evt,
      districtOptions: countySorted,
    }, () => {
      this.props.onChange({ target });
    });
  }

  handleChangeSelectDistrict(evt) {
    const target = {
      value: evt.value,
      name: 'county_id',
    };
    this.setState({
      selectedDistrict: evt,
    }, () => this.props.onChange({ target }));
  }

  render() {
    const formConfig = {
      name: {
        ...isRequired(),
      },
      email: {
        // ...isRequired(),
        ...isEmail(),
      },
      address: {
        ...isRequired(),
      },
      // city: {
      //   ...isRequired(),
      // },
      // district: {
      //   ...isRequired(),
      // },
    };
    return (
      <Row className="justify-content-center">
        <Col md={5}>
          <FormTitle>Complete Profile</FormTitle>
          <FormSubTitle>Please complete your profile in order to make
            transaction
            in Okxe</FormSubTitle>

          <Row>
            <Col>
              <FormValidation
                onSubmit={({ isValid }) => {
                  if (isValid) {
                    this.props.onSubmit();
                  }
                }}
                config={formConfig}
              >
                {(ctx) => {
                  this.formContext = ctx;
                  const { fields, errors, submitted } = ctx;
                  return (<div>
                    <UploadAvatar
                      onDrop={(data) => {
                        let target = {
                          name: 'avatar',
                          value: data,
                        };
                        this.props.onChange({ target });
                        this.props.uploadAvatar(data);
                      }}
                      showText
                    />

                    <CommonInput
                      label={'Your Phone'}
                      name={'your_phone'}
                      value={this.props.phoneNumber || 'No phone'}
                      readOnly
                    />

                    {
                      this.props.userType === eUserType.BUYER ?
                        <CommonInput
                          autoFocus
                          label={'Contact Name'}
                          name={'name'}
                          onChange={this.props.onChange}
                          type={'text'}
                          value={get(this.props.modifiedData, 'name')}
                          errors={errors.name}
                          submitted={submitted}
                          autoComplete="off"
                        /> :
                        <CommonInput
                          autoFocus
                          label={'Store Name'}
                          name={'name'}
                          onChange={this.props.onChange}
                          type={'text'}
                          value={get(this.props.modifiedData, 'name')}
                          errors={errors.name}
                          submitted={submitted}
                          autoComplete="off"
                        />
                    }

                    <CommonInput
                      label={'Enter your email'}
                      name={'email'}
                      onChange={this.props.onChange}
                      type={'text'}
                      value={get(this.props.modifiedData, 'email')}
                      errors={errors.email}
                      submitted={submitted}
                      autoComplete="off"
                    />

                    <SelectFullAddress
                      contextForm={this.formContext}
                      errors={errors}
                      fields={fields}
                      submitted={submitted}
                      cityOptions={this.props.cityOptions}
                      districtOptions={this.state.districtOptions}
                      location={this.state.location}
                      selectedDistrict={this.state.selectedDistrict}
                      selectedCity={this.state.selectedCity}
                      handleChangeSelectDistrict={this.handleChangeSelectDistrict}
                      handleChangeSelectCity={this.handleChangeSelectCity}
                      onChange={(addr) => {
                        const { location } = this.state;
                        location.address = addr;
                        this.setState({
                          location,
                        });
                      }}
                      onSelect={(addr) => {
                        let self = this;
                        const { location } = this.state;
                        location.address = addr.placesAddressTo;
                        location.ward = addr.political;
                        location.district = addr.administrative_area_level_2;
                        location.province = addr.administrative_area_level_1;
                        const provinceItem = find(this.props.locations, (item) => item.name.includes(location.province));
                        const countyOptions = !isEmpty(provinceItem) && !isEmpty(provinceItem.counties) ? convertListObjectToLookup(provinceItem.counties, 'name', 'id') : [];
                        const countySorted = orderBy(countyOptions, ['name'], ['asc']);
                        const countyItem = find(countyOptions, (item) => item.label.includes(location.district));
                        const prevProvince = this.state.location.province;
                        const prevCounty = this.state.location.county;
                        this.setState({
                          selectedCity: provinceItem ? {
                            value: provinceItem.id,
                            label: provinceItem.name,
                          } : null,
                          province: provinceItem ? provinceItem.id : prevProvince,
                          selectedDistrict: countyItem ? {
                            value: countyItem.value,
                            label: countyItem.label,
                          } : null,
                          districtOptions: countySorted,
                          county: countyItem ? countyItem.value : prevCounty,
                        }, () => {
                          const targetProvince = {
                            value: provinceItem.id,
                            name: 'province_id',
                          };
                          self.props.onChange({ target: targetProvince });
                          const targetCounty = {
                            value: countyItem.value,
                            name: 'county_id',
                          };
                          self.props.onChange({ target: targetCounty });
                        });
                        const target = {
                          value: addr.placesAddressTo,
                          name: 'address',
                        };
                        this.props.onChange({ target });
                        this.setState({
                          location,
                        }, () => {
                          this.getLatLongFromAddress(location.address);
                        });
                      }}
                    />

                    <CommonButton
                      className={classNames(Classes.FILL,
                        Classes.INTENT_PRIMARY, Classes.LARGE)}
                      type="submit"
                    >Complete</CommonButton>
                  </div>);
                }}
              </FormValidation>

              <div className={'mt-4'}>
                <ErrorForm errorMessages={this.props.errorMessages} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

FormCompleteProfile.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  modifiedData: PropTypes.object,
  cityOptions: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  errorMessages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  phoneNumber: PropTypes.string,
  userType: PropTypes.string,
};
FormCompleteProfile.defaultProps = {
  cityOptions: [],
  userType: eUserType.BUYER,
  locations: [],
};
