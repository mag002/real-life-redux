/**
*
* Breadcrumbs
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import breakpoint from 'styles/breakpoint';

const StyledBreadcrumbs = styled.div`
  margin-bottom: 20px;
  // min-height: 35px;
  display:flex;
  a, span {
    color: #000000;
    font-size: 14px;
  }
  span:last-child{
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    max-width:100%;
  }
  a, i.fa {
    margin-right: 15px;
  }
  
  i.fa {
    color: ${(props) => props.theme.grayColor};
  }
  
  a {
    &:hover {
      color: ${(props) => props.theme.primaryColor};
    }
    
    &:focus, &:active {
      text-decoration: none;
    }
  }
  @media (max-width:${breakpoint.md}){
    margin-top:20px;
  }
  @media (max-width:${breakpoint.xs}){
    span:last-child{
      max-width:150px;
    }
  }
`;


class Breadcrumbs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <StyledBreadcrumbs>
        {this.props.items.map((link, index) => {
          if (index === this.props.items.length - 1) {
            return <span key={index} >{link.name}</span>;
          }

          return (
            <span key={index}>
              <Link to={link.path}>{link.name}</Link>
              <i className="fa fa-angle-right" />
            </span>
          );
        })}
      </StyledBreadcrumbs>
    );
  }
}

Breadcrumbs.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Breadcrumbs;
