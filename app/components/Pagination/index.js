import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import { configuration } from '../../constants';

export const StyledPagination = styled.div`
  .pagination {
    justify-content: center;
  }

  .page-item {
    margin: 0 5px;
  
    a {
      border-radius: 50%;
      width: 30px;
      height: 30px;   
      vertical-align: middle;
      display: table-cell;
      color: #313131;
      text-align: center;
      font-size: 12px;
      
      &:active, &:focus {        
        text-decoration: none;
      }
    }
    
    &.direct {
      a {
        background: #ececec;
      }
    }
      
    &:not(.disabled) {
      a {      
        &:active, &:hover, &.active {        
          background: #cdcdcd !important;
        }
      }
    }
    
    &.disabled {
      a {
        cursor: not-allowed;
      }
    }
  }   
`;

class CommonPagination extends Component {

  render() {
    if (!this.props.totalItemsCount) {
      return '';
    }
    return (
      <StyledPagination className={this.props.className}>
        <Pagination
          activePage={this.props.activePage}
          itemsCountPerPage={this.props.itemsCountPerPage}
          totalItemsCount={this.props.totalItemsCount}
          pageRangeDisplayed={this.props.pageRangeDisplayed}
          onChange={this.props.onChange}
          itemClass="page-item"
          itemClassFirst="direct"
          itemClassPrev="direct"
          itemClassNext="direct"
          itemClassLast="direct"
          activeLinkClass="active"
        >
        </Pagination>
      </StyledPagination>
    );
  }
}

CommonPagination.propTypes = {
  activePage: PropTypes.number,
  itemsCountPerPage: PropTypes.number,
  totalItemsCount: PropTypes.number,
  pageRangeDisplayed: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

CommonPagination.defaultProps = {
  activePage: 1,
  itemsCountPerPage: configuration.paginate,
  totalItemsCount: 0,
  pageRangeDisplayed: 5,
};

export default CommonPagination;
