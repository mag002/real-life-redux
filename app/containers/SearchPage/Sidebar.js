import React from 'react';
import PropTypes from 'prop-types';
import FilterSidebar from 'components/Filter';
import * as filterTypes from 'components/Filter/constants';
import StyledSidebar from './styled/StyledSidebar';
import { configuration } from '../../constants';
// import { isEmpty, isEqual } from 'lodash';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import minPrice from './filter-data/minPrice.json';
import maxPrice from './filter-data/maxPrice.json';
import minKm from './filter-data/minKm.json';
import maxKm from './filter-data/maxKm.json';
import minYear from './filter-data/minYear.json';
import maxYear from './filter-data/maxYear.json';
import userType from './filter-data/userType.json';

/*  // TODO HungLM Fix hardcode province id */

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandOptions: [],
      modelOptions: [],
      filterData: {
        userType: null,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.brands) && !isEqual(nextProps.brands, this.props.brands)) {
      let brandOptions = [];
      nextProps.brands.map((el) => {
        // if (el.id) {
        brandOptions.push({
          id: el.id,
          label: el.name,
        });
        // }
        return null;
      });

      // brandOptions.unshift({
      //   id: 0,
      //   label: 'All',
      // });

      this.setState({ brandOptions });
    }

    if (!isEmpty(nextProps.filterData) && !isEqual(nextProps.filterData, this.props.filterData)) {
      let newFilterData = Object.assign(this.state.filterData, nextProps.filterData);
      this.setState({
        filterData: newFilterData,
      });
    }
  }

  render() {
    return (
      <StyledSidebar className={`sidebar ${this.props.className}`}>

        <FilterSidebar
          label={'Brand'}
          type={filterTypes.COLLAPSE}
          options={this.state.brandOptions}
          location={this.props.location}
          onChange={(option) => {
            this.props.onChange({
              brand: option ? option.id : 0,
              model: 0,
            });

            let brandSelected = this.props.brands.find((brand) => option && brand.id === option.id);
            if (brandSelected) {
              let modelOptions = [];
              if (brandSelected.models) {
                brandSelected.models.map((model) => {
                  modelOptions.push({
                    id: model.id,
                    label: model.name,
                  });
                  return null;
                });

                modelOptions.unshift({
                  id: 0,
                  label: 'All',
                });
              }

              this.setState({ modelOptions });
            }
          }}
        />

        <FilterSidebar
          label={'Model'}
          type={filterTypes.COLLAPSE}
          location={this.props.location}
          options={this.state.modelOptions}
          onChange={(option) => {
            this.props.onChange({ model: option ? option.id : 0 });
          }}
        />

        <FilterSidebar
          label={'Location'}
          type={filterTypes.BUTTON}
          options={[
            { id: 280, label: 'HCM' },
            { id: 279, label: 'Ha Noi' },
          ]}
          onChange={(option) => {
            this.props.onChange({ province: option ? option.id : null });
          }}
          location={this.props.location}
        />

        <FilterSidebar
          label={'Type'}
          type={filterTypes.BUTTON}
          location={this.props.location}
          options={[
            { id: 1, label: 'Manual', value: configuration.motoTypes[1] },
            { id: 2, label: 'Automatic', value: configuration.motoTypes[2] },
          ]}
          onChange={(option) => {
            this.props.onChange({ type: option ? option.value : null });
          }}
        />

        <FilterSidebar
          label={'Seller'}
          type={filterTypes.BUTTON}
          location={this.props.location}
          options={userType}
          onChange={(option) => {
            this.props.onChange({ userType: option ? option.value : null });
          }}
          value={this.props.filterData.userType || null}
        />

        <FilterSidebar
          label={'Year'}
          type={filterTypes.RANGE}
          location={this.props.location}
          options_from={minYear}
          options_to={maxYear}
          onChange={(option) => {
            this.props.onChange({ [option.name]: option.value });
          }}
        />

        <FilterSidebar
          label={'ODO (KMs)'}
          location={this.props.location}
          type={filterTypes.RANGE}
          options_from={minKm}
          options_to={maxKm}
          onChange={(option) => {
            this.props.onChange({ [option.name]: option.value });
          }}
        />

        <FilterSidebar
          label={'Price'}
          location={this.props.location}
          type={filterTypes.RANGE}
          options_from={minPrice}
          options_to={maxPrice}
          onChange={(option) => {
            this.props.onChange({ [option.name]: option.value });
          }}
        />
      </StyledSidebar>
    );
  }
}

Sidebar.propTypes = {
  brands: PropTypes.array,
  onChange: PropTypes.func,
  filterData: PropTypes.object,
  location: PropTypes.object,
};

export default Sidebar;
