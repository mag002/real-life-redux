/**
*
* TablePropsDeal
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import StyledTable from './styled/StyledTable';
import moment from 'moment';
import { eDateFormat } from 'enums/EDateFormat';


class TablePropsDeal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let { deal } = this.props;

    return (
      <StyledTable striped className={this.props.className}>
        <tbody>
          <tr>
            <td>
              <div className={'props-title'}>Date Listed</div>
              <div className={'props-value'}>{moment(deal.last_push).format(eDateFormat.DATE_FORMAT)}</div>
            </td>
            <td>
              <div className={'props-title'}>Year</div>
              <div className={'props-value'}>{deal.established_year}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={'props-title'}>Brand</div>
              <div className={'props-value'}>{deal.brand ? deal.brand.name : ''}</div>
            </td>
            <td>
              <div className={'props-title'}>Color</div>
              <div className={'props-value'}>{deal.color}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={'props-title'}>Model</div>
              <div className={'props-value'}>{deal.model ? deal.model.name : ''}</div>
            </td>
            <td>
              <div className={'props-title'}>ODO (KMs)</div>
              <div className={'props-value'}>{deal.km_range ? `${deal.km_range} KMs` : ''}</div>
            </td>
          </tr>
        </tbody>
      </StyledTable>
    );
  }
}

TablePropsDeal.propTypes = {
  deal: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default TablePropsDeal;
