/**
 *
 * SelectFullAddress
 *
 */

import React from 'react';
import CommonInput from 'components/CommonInput';
import * as inputTypes from '../CommonInput/constants';
// import { Row, Col } from 'reactstrap';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';
import * as PropTypes from 'prop-types';


class SelectFullAddress extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <CommonInput
          name={'address'}
          type={inputTypes.PLACE_AUTOCOMPLETE}
          value={this.props.location.address}
          onSelect={this.props.onSelect}
          onChange={this.props.onChange}
          label="Address"
          errors={this.props.errors.address}
          submitted={this.props.submitted}
        />
        <Row>
          <Col md={6}>
            <CommonInput
              type={inputTypes.SELECT}
              name="city"
              scrollMenuIntoView
              menuContainerStyle={{ zIndex: 999 }}
              clearable
              isSearchable
              label="City"
              value={this.props.selectedCity}
              options={this.props.cityOptions}
              onChange={(evt) => this.props.handleChangeSelectCity(evt)}
              errors={this.props.errors.city}
              submitted={this.props.submitted}
            />
          </Col>
          <Col md={6}>
            <CommonInput
              type={inputTypes.SELECT}
              name="district"
              isSearchable
              scrollMenuIntoView
              menuContainerStyle={{ zIndex: 999 }}
              clearable
              label="District"
              value={this.props.selectedDistrict}
              options={this.props.districtOptions}
              onChange={(evt) => this.props.handleChangeSelectDistrict(evt)}
              errors={this.props.errors.district}
              submitted={this.props.submitted}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

SelectFullAddress.propTypes = {
  districtOptions: PropTypes.array.isRequired,
  cityOptions: PropTypes.array,
  location: PropTypes.object,
  selectedDistrict: PropTypes.object,
  selectedCity: PropTypes.object,
  handleChangeSelectCity: PropTypes.func,
  handleChangeSelectDistrict: PropTypes.func,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
};

export default SelectFullAddress;
