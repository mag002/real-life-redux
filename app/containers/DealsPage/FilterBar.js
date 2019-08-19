import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilterTop from '../../components/FilterTop';
import * as filterTypes from '../../components/FilterTop/constants';
import { configuration } from '../../constants';
// import { isEmpty, isEqual } from 'lodash';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

export const StyledFilterBar = styled.div`
  padding-bottom: 10px ;
  position: absolute;
  width: 100%;
  bottom: 100%;
`;

/*  // TODO HungLM Fix hardcode province id */

export default class FilterBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      keywords: null,
      brandOptions: [
        {
          value: 0,
          label: 'All',
          id: 0,
        }],
      modelOptions: [
        {
          value: 0,
          label: 'All',
          id: 0,
        }],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.brands) && !isEqual(nextProps.brands, this.props.brands)) {
      let brandOptions = [];
      nextProps.brands.map((el) => {
        brandOptions.push({
          id: el.id,
          label: el.name,
          value: el.id,
        });
        return null;
      });
      this.setState({ brandOptions });
    }
  }

  render() {
    return (
      <StyledFilterBar
        className={'d-flex justify-content-between align-items-center'}
      >

        {/* <FilterTop*/}
        {/* label={'Location'}*/}
        {/* type={filterTypes.SELECT}*/}
        {/* options={[*/}
        {/* { id: 0, label: 'All', value: 0 },*/}
        {/* { id: 280, label: 'HCM', value: 280 },*/}
        {/* { id: 279, label: 'Ha Noi', value: 279 },*/}
        {/* ]}*/}
        {/* onChange={(option) => {*/}
        {/* this.props.handleSearch({ province: option ? option.value : null });*/}
        {/* }}*/}
        {/* />*/}

        <FilterTop
          label={'Brand'}
          type={filterTypes.SELECT}
          options={this.state.brandOptions}
          onChange={(option) => {
            this.props.handleSearch({
              brand: option ? option.id : 0,
              model: 0,
            });

            let brandSelected = this.props.brands.find((brand) => brand.id === option.id);
            if (brandSelected) {
              let modelOptions = [];
              brandSelected.models.map((model) => {
                modelOptions.push({
                  id: model.id,
                  label: model.name,
                  value: model.id,
                });
                return null;
              });
              modelOptions.unshift({
                value: 0,
                label: 'All',
                id: 0,
              });
              this.setState({ modelOptions });
            }
          }}
        />
        <FilterTop
          label={'Model'}
          type={filterTypes.SELECT}
          options={this.state.modelOptions}
          onChange={(option) => {
            this.props.handleSearch({ model: option ? option.value : 0 });
          }}
        />
        <FilterTop
          label={'Type'}
          type={filterTypes.SELECT}
          options={[
            { id: 0, label: 'All', value: 0 },
            { id: 1, label: 'Manual', value: configuration.motoTypes[0] },
            { id: 2, label: 'Automatic', value: configuration.motoTypes[2] },
            { id: 3, label: 'Semi-auto', value: configuration.motoTypes[1] },
          ]}
          onChange={(option) => {
            this.props.handleSearch({ type: option ? option.value : null });
          }}
        />

        <FilterTop
          hide
          type={filterTypes.INPUT}
          value={this.state.keywords}
          onChange={(evt) => {
            let data = evt.target.value;

            this.setState({
              keywords: data,
            }, () => {
              this.props.handleSearch({ keywords: data });
            });
          }}
        />

        {/* <SelectComponent*/}
        {/* handleClick={props.handleSort}*/}
        {/* items={[*/}
        {/* {*/}
        {/* key: '1',*/}
        {/* label: 'Newest',*/}
        {/* text: '',*/}
        {/* field: 'created_at',*/}
        {/* },*/}
        {/* {*/}
        {/* key: '2',*/}
        {/* label: 'Price',*/}
        {/* text: '',*/}
        {/* field: 'price',*/}
        {/* },*/}
        {/* ]}*/}
        {/* title="Sort by:"*/}
        {/* />*/}
      </StyledFilterBar>
    );
  }
}

FilterBar.propTypes = {
  handleSort: PropTypes.func,
  handleSearch: PropTypes.func,
  brands: PropTypes.array,
};
