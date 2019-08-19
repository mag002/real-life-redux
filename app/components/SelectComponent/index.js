import * as React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  .sort {
    cursor: pointer;
  } 
  i {
    color: #d8d8d8;
    padding: 0 5px 0 5px;
  }
`;

class SelectComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: null,
      label: null,
      text: null,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { items } = this.props;
    if (items && items.length > 0) {
      this.setState({
        ...items[0],
      });
    }
  }

  itemRenderer(item, { handleClick }) {
    return (
      <MenuItem
        key={item.key}
        // label={item.label}
        text={item.label}
        onClick={handleClick}
        icon="sort"
        shouldDimdissPopover
      />
    );
  }

  handleSelect(item) {
    this.setState({
      ...item,
    });
    this.props.handleClick(item);
  }

  render() {
    return (
      <StyledSelect
        items={this.props.items}
        filterable={false}
        itemRenderer={this.itemRenderer}
        onItemSelect={this.handleSelect}
      >
        <span>{this.props.title}</span> <span className={'sort'}>{this.state.label} <i className="fas fa-caret-down" /></span>
      </StyledSelect>
    );
  }
}

SelectComponent.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired
  ).isRequired,
};

export default SelectComponent;
