/**
*
* NoDataFound
*
*/

import React from 'react';
import { Card } from '@blueprintjs/core';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import icoZoom from 'images/icons/ic-zoom-in.svg';
import StyledWrapper from './styled/StyledWrapper';


class NoDataFound extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <StyledWrapper md={12}>
        <Card>
          <div className={'icon'}>
            <img src={icoZoom} alt={'No results found'} />
          </div>

          <div className={'message'}>
            <span>{this.props.text}</span>
          </div>
        </Card>
      </StyledWrapper>
    );
  }
}

NoDataFound.propTypes = {
  text: PropTypes.string,
};

NoDataFound.defaultProps = {
  text: 'No results found',
};

export default NoDataFound;
