import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import { eTransactionType } from '../../enums/ETransactionType';
import FilterTop from 'components/FilterTop';
import { SELECT_WITH_ICON } from 'components/FilterTop/constants';
import Row from 'reactstrap/es/Row';
import Col from 'reactstrap/es/Col';
import icoBuy from 'images/icons/motorcycle.svg';
import icoSale from 'images/icons/bike.svg';

export const StyledFilterBar = styled.div`
  //padding: 0 5px 15px 5px;
  width: 100%;
  position: absolute;
  margin-bottom: 10px;
  bottom: 100%;
  z-index: 10;    
  display: flex;
  justify-content: flex-end;
`;

export const TransactionType = styled.div`
  width: 90px;
`;

let transTypeOptions = [
  { label: 'All', value: eTransactionType.ALL },
  { label: 'Buy', value: eTransactionType.BUYER },
  { label: 'Sell', value: eTransactionType.SELLER },
];

export default class FilterBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      transType: transTypeOptions[0],
    };


    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleTypeChange(option) {
    this.setState({
      transType: option,
    }, () => {
      this.props.handleChangeTransType(option.value);
    });
  }

  render() {
    return (
      <StyledFilterBar>
        <TransactionType>
          <FilterTop
            type={SELECT_WITH_ICON}
            options={transTypeOptions}
            onChange={this.handleTypeChange}
          />

          {/* <Select*/}
          {/* options={transTypeOptions}*/}
          {/* onChange={this.handleTypeChange}*/}
          {/* menuContainerStyle={{ zIndex: 999 }}*/}
          {/* value={this.state.transType}*/}
          {/* />*/}
        </TransactionType>
      </StyledFilterBar>
    );
  }
}

FilterBar.propTypes = {
  handleChangeTransType: PropTypes.func,
};
