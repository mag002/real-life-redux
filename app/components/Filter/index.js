/**
 *
 * FilterTop
 *
 */

import React from 'react';
// import { Collapse } from 'reactstrap';
import Collapse from 'reactstrap/es/Collapse';
import PropTypes from 'prop-types';
import * as filterTypes from './constants';
import Select from 'react-select';
import StyledFilter from './styled/StyledFilter';
import FilterCollapse from './styled/FilterCollapse';
import FilterButton from './styled/FilterButton';
import FilterRange from './styled/FilterRange';
import icoTick from 'images/icons/tick.svg';
import makeAnimated from 'react-select/lib/animated';
// import { isEmpty, isEqual } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import queryString from 'query-string';

class FilterSidebar extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      collapseOpen: false,
      itemSelected: { id: 0, label: 'All' },
      options: [],
      options_from: [],
      options_to: [],
      itemSelectedFrom: {},
      itemSelectedTo: {},
      locationSearch: null,
    };

    this.handleToggleDropdown = this.handleToggleDropdown.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.options, this.state.options)) {
      this.setState({
        options: nextProps.options,
      });
    }

    if (!isEqual(nextProps.options_from, this.state.options_from)) {
      this.setState({
        options_from: nextProps.options_from,
        itemSelectedFrom: nextProps.options_from[0],
      });
    }

    if (!isEqual(nextProps.options_to, this.state.options_to)) {
      this.setState({
        options_to: nextProps.options_to,
        itemSelectedTo: nextProps.options_to[0],
      });
    }

    if (
      !isEmpty(nextProps.value) &&
      !isEqual(nextProps.value, this.state.value)
    ) {
      if (isEmpty(nextProps.value)) {
        this.setState({
          itemSelected: {},
          itemSelectedFrom: {},
          itemSelectedTo: {},
        });
      } else if (this.props.type !== filterTypes.RANGE) {
        let option = this.state.options.find(
          (el) => el.value === nextProps.value
        );
        if (option) {
          this.setState({
            itemSelected: option,
          });
        }
      }
    }

    if (!isEqual(nextProps.location.search, this.state.locationSearch)) {
      this.setState({
        locationSearch: nextProps.location.search,
      }, () => {
        if (!isEmpty(this.state.locationSearch)) {
          this.setState({
            itemSelected: { id: 0, label: 'All' },
            itemSelectedFrom: !isEmpty(this.state.options_from) ? this.state.options_from[0] : {},
            itemSelectedTo: !isEmpty(this.state.options_to) ? this.state.options_to[0] : {},
          });
        }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.type === filterTypes.RANGE) {
      if (
        !isEqual(nextProps.options_from, this.state.options_from) ||
        !isEqual(nextProps.options_to, this.state.options_to)
      ) {
        return true;
      }
      if (
        !isEqual(nextState.itemSelectedFrom, this.state.itemSelectedFrom) ||
        !isEqual(nextState.itemSelectedTo, this.state.itemSelectedTo)
      ) {
        return true;
      }
      return false;
    }

    return true;
  }

  handleToggleDropdown() {
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  }

  handleClickButton(item) {
    if (this.state.itemSelected && this.state.itemSelected.id === item.id) {
      this.setState({
        itemSelected: {},
      });
      if (this.props.onChange) {
        this.props.onChange(null);
      }
      return;
    }

    this.setState(
      {
        itemSelected: item,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(item);
        }
      }
    );
  }

  handleSelectItem(item, type = null) {
    switch (type) {
      case 'from':
        this.setState({
          itemSelectedFrom: item,
        }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state.itemSelectedFrom);
          }
        });
        break;

      case 'to':
        this.setState({
          itemSelectedTo: item,
        }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state.itemSelectedTo);
          }
        });
        break;

      default: {
        const itemSelected = (this.state.itemSelected && this.state.itemSelected.id === item.id) ? {
          id: 0,
          label: 'All',
        } : item;

        this.setState({
          itemSelected,
          collapseOpen: false,
        }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state.itemSelected);
          }
        });
      }
    }
  }

  renderContent() {
    switch (this.props.type) {
      case filterTypes.COLLAPSE:
        return (
          <FilterCollapse isOpen={this.state.collapseOpen}>
            <button
              onClick={this.handleToggleDropdown}
              className={'btn-toggle'}
            />
            <span className={'selected'}>{this.state.itemSelected ? this.state.itemSelected.label : ''}</span>
            <Collapse isOpen={this.state.collapseOpen}>
              <ul>
                {this.props.options.map((option, index) => (
                  <li key={index}>
                    <button
                      onClick={() => this.handleSelectItem(option)}
                      className={
                        this.state.itemSelected && this.state.itemSelected.id === option.id ? 'active' : ''
                      }
                    >
                      {option.label}
                      {this.state.itemSelected && this.state.itemSelected.id === option.id ? (
                        <i className="fa fa-times" aria-hidden="true" />
                      ) : (
                        ''
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </Collapse>
          </FilterCollapse>
        );

      case filterTypes.RANGE: {
        const customStyles = {
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected && '#bae7ff!important',
            paddingLeft: 25,
            color: 'black',
            backgroundImage: state.isSelected ? `url(${icoTick})` : '',
            backgroundSize: '12px',
            backgroundPosition: '5px center',
            transition: 'all 0.5s',
          }),
        };

        return (
          <FilterRange>
            <Select
              options={this.state.options_from}
              placeholder={this.state.placeholder_from || 'Min'}
              onChange={(item) => this.handleSelectItem(item, 'from')}
              menuContainerStyle={{ zIndex: 999 }}
              defaultValue={this.state.options_from[0]}
              styles={customStyles}
              components={makeAnimated}
              value={this.state.itemSelectedFrom}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,

                  primary: '#00c3c4',
                },
              })}
            />
            <span>to</span>
            <Select
              options={this.state.options_to}
              placeholder={this.state.placeholder_to || 'Max'}
              onChange={(item) => this.handleSelectItem(item, 'to')}
              menuContainerStyle={{ zIndex: 999 }}
              defaultValue={this.state.options_to[0]}
              styles={customStyles}
              value={this.state.itemSelectedTo}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,

                  primary: '#00c3c4',
                },
              })}
            />
          </FilterRange>
        );
      }

      case filterTypes.BUTTON:
        return (
          <FilterButton>
            {this.props.options.map((option, index) => (
              <button
                key={index}
                className={
                  this.state.itemSelected &&
                  option.id === this.state.itemSelected.id
                    ? 'active'
                    : ''
                }
                onClick={() => this.handleClickButton(option)}
              >
                <span>
                  {option.label}
                  {this.state.itemSelected && this.state.itemSelected.id === option.id ? (
                    <i className="fa fa-times" aria-hidden="true" />
                  ) : (
                    ''
                  )}
                </span>
              </button>
            ))}
          </FilterButton>
        );

      default:
    }

    return (
      <div>
        <h4>{this.props.label}</h4>
        {this.props.children}
      </div>
    );
  }

  render() {
    return (
      <StyledFilter>
        <div className={'title-filter'}>{this.props.label}</div>

        {this.renderContent()}
      </StyledFilter>
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

  // Only used for type RANGE
  options_from: PropTypes.array,
  options_to: PropTypes.array,
  placeholder_from: PropTypes.string,
  placeholder_to: PropTypes.string,
};

FilterSidebar.defaultProps = {
  // Only used for type RANGE
  options_from: [],
  options_to: [],
  placeholder_from: '',
  placeholder_to: '',
};

export default FilterSidebar;
