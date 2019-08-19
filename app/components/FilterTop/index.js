/**
 *
 * FilterTop
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as filterTypes from './constants';
import Select from 'react-select';
import FilterSelect from './styled/FilterSelect';
import FilterInput from './styled/FilterInput';
import FilterSelectWithIcon from './styled/FilterSelectWithIcon';
import { InputGroup, FormGroup } from '@blueprintjs/core';
// import { isEqual, isEmpty } from 'lodash';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';


class FilterSidebar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      itemSelected: {},
      options: [],
    };

    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.options, this.state.options)) {
      this.setState({
        options: nextProps.options,
        itemSelected: isEmpty(nextProps.options) ? {} : nextProps.options[0],
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.type === filterTypes.SELECT) {
      if (!isEqual(nextProps.options, this.state.options)) {
        return true;
      }
      if (!isEqual(nextState.itemSelected, this.state.itemSelected)) {
        return true;
      }
      return false;
    }

    return true;
  }

  handleSelectItem(item) {
    this.setState({
      itemSelected: item,
    });

    if (this.props.onChange) {
      this.props.onChange(item);
    }
  }

  render() {
    switch (this.props.type) {
      case filterTypes.SELECT:
        return (
          <FilterSelect>
            <FormGroup
              label={this.props.label}
              labelFor={this.props.name}
              className={this.props.className}
            >
              <Select
                name={this.props.name}
                options={this.state.options}
                placeholder={this.props.placeholder}
                onChange={this.handleSelectItem}
                menuContainerStyle={{ zIndex: 999 }}
                value={this.state.itemSelected}
              />
            </FormGroup>
          </FilterSelect>
        );

      case filterTypes.INPUT:
        return (
          <FilterInput className={`${this.props.hide?'d-none d-md-block':''}`}>
            <InputGroup
              placeholder={this.props.placeholder || 'Search'}
              value={this.props.value}
              onChange={this.props.onChange}
              className={this.props.className}
            />
            <i className="fa fa-search" />
          </FilterInput>
        );

      case filterTypes.SELECT_WITH_ICON: {
        const customStyles = {
          // option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
          //   ...styles,
          //   paddingLeft: 30,
          //   backgroundImage: `url(${data.icon})`,
          //   backgroundSize: '18px',
          //   backgroundPosition: '5px center',
          //   width: '100%',
          // }),

          singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => ({
            ...styles,
            // paddingLeft: 30,
            // backgroundImage: `url(${data.icon})`,
            // backgroundSize: '18px',
            // backgroundPosition: '5px center',
            width: '100%',
            textAlign: 'right',
          }),
        };

        return (
          <FilterSelectWithIcon>
            <Select
              className={this.props.className}
              name={this.props.name}
              options={this.state.options}
              placeholder={this.props.placeholder}
              onChange={this.handleSelectItem}
              menuContainerStyle={{ zIndex: 999 }}
              value={this.state.itemSelected}
              styles={customStyles}
            />
          </FilterSelectWithIcon>
        ); }

      default:
    }

    return (
      <div>
        <h4>{this.props.label}</h4>
        {this.props.children}
      </div>
    );
  }
}

FilterSidebar.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.any,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

FilterSidebar.defaultProps = {
  options: [],
};

export default FilterSidebar;
