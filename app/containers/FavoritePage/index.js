/**
 *
 * FavoritePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect/es';
import { compose, bindActionCreators } from 'redux';
import Pagination from 'components/Pagination';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectFavoriteDeal, { makeSelectData, makeSelectDealId } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadFavoriteDeals } from './actions';
import ProductRow from '../../components/ProductRow';
// import { Row } from 'reactstrap';
import Row from 'reactstrap/es/Row';
import { FAVORITE_PAGE} from './constants';
import { configuration } from '../../constants';
import { CommonToaster } from '../../components/CommonToaster';
import { Intent } from '@blueprintjs/core';
// import { isEmpty, isEqual } from 'lodash';
import isEqual from 'lodash/isEqual';
import NoDataFound from '../../components/NoDataFound';

export class FavoritePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // TODO HieNT complete this component
  constructor(props) {
    super(props);
    this.state = {
      data: {
        docs: [],
        total: 0,
      },
      dataPagination: {
        page: 1,
        paginate: configuration.paginate,
      },
    };

    this.renderData = this.renderData.bind(this);
    this.handleLoadFavoriteDeal = this.handleLoadFavoriteDeal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.handleLoadFavoriteDeal();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!isEqual(nextProps.data, this.state.data)) {
      this.setState({
        data: nextProps.data,
      });
    }

    if (!isEqual(nextProps.dealId, this.props.dealId)) {
      this.handleLoadFavoriteDeal();
    }
  }

  handleLoadFavoriteDeal() {
    this.props.loadFavoriteDeals(this.state.dataPagination, this.callbackError);
  }

  callbackError(error) {
    CommonToaster.show({
      message: error,
      intent: Intent.DANGER,
    });
  }

  handlePageChange(pageNumber) {
    const { dataPagination } = this.state;
    dataPagination.page = pageNumber;

    this.setState({ dataPagination }, () => {
      window.scrollTo(0, 0);
      this.handleLoadFavoriteDeal();
    });
  }

  renderData() {
    let { data } = this.state;
    if (data.docs && data.docs.length > 0) {
      return (data.docs.map((item) => (
        <ProductRow
          key={Math.random()}
          data={item.deal}
          listView
          gridView={false}
          showFavoriteButton
          showActionFavorite
          // handleRemoveFavorite={this.props.remove}
          callbackHandleFavoriteSuccess={this.handleLoadFavoriteDeal}
        />
      )));
    }
    return (<NoDataFound />);
  }

  render() {
    return (
      <div>
        <Row style={{ marginLeft: '-5px', marginRight: '-5px' }}>
          {this.renderData()}
        </Row>

        <Row className={'justify-content-center'}>
          <Pagination
            activePage={this.state.dataPagination.page}
            totalItemsCount={this.state.data.total}
            onChange={this.handlePageChange}
          />
        </Row>
      </div>
    );
  }
}

FavoritePage.propTypes = {
  loadFavoriteDeals: PropTypes.func.isRequired,
  // remove: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  favoritelist: makeSelectFavoriteDeal(),
  dealId: makeSelectDealId(),
  data: makeSelectData(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadFavoriteDeals,
      // remove,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: FAVORITE_PAGE, reducer });
const withSaga = injectSaga({ key: FAVORITE_PAGE, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FavoritePage);
