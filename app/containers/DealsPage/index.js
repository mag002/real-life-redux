import React from 'react';
import reducer from './reducer';
import { getMyDeals, onDeleteDeal, onUpdateDeal, getBrands } from './actions';
import saga from './saga';
import makeSelectDealsPage from './selectors';
import PropTypes from 'prop-types';
// import { Row } from 'reactstrap';
import Row from 'reactstrap/es/Row';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import { isEqual, isEmpty } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { DEALS_PAGE, ON_UPDATE_DEAL, ON_DELETE_DEAL, ON_UPDATE_DEAL_SUCCESSFULLY, ON_DELETE_DEAL_SUCCESSFULLY } from './constants';
import { StyledDealsPage } from './styled/StyledDealsPage';
import Pagination from 'components/Pagination';
import FilterBar from './FilterBar';
import AlertPopup from 'components/AlertPopup';
import { Intent } from '@blueprintjs/core';
import { CommonToaster } from 'components/CommonToaster';
import ProductRow from 'components/ProductRow';
import NoDataFound from '../../components/NoDataFound';
import { DAEMON } from '../../utils/constants';
import { configuration } from '../../constants';

export class DealsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      deals: {
        docs: [],
        total: 0,
      },
      dataPagination: {
        page: 1,
        paginate: configuration.paginate,
      },
      alertData: {
        title: 'Warning',
        content: 'Do you want to delete this post?',
      },
      isAlertPopupOpen: false,
      dealId: null,
      status: null,
      model_id: null,
      brand_id: null,
      activeAction: null,
      brands: [],
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleGetDeals = this.handleGetDeals.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleConfirmUpdate = this.handleConfirmUpdate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleGetDeals();
    this.props.getBrands();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.deals && !isEqual(nextProps.deals, this.state.deals)) {
      this.setState({
        deals: nextProps.deals,
      });
    }

    if (!isEmpty(nextProps.brands) && !isEqual(nextProps.brands, this.state.brands)) {
      this.setState({
        brands: nextProps.brands,
      });
    }

    // if (nextProps.actionType === GET_MY_DEALS_SUCCESSFULLY) {
    //   this.setState({
    //     deals: nextProps.deals,
    //   });
    // }

    if (nextProps.actionType === ON_DELETE_DEAL_SUCCESSFULLY) {
      if (nextProps.actionSuccess) {
        CommonToaster.show({
          message: 'Your ad was successfully removed',
          intent: Intent.SUCCESS,
        });
      } else {
        CommonToaster.show({
          message: 'Delete deal unsuccessfully',
          intent: Intent.DANGER,
        });
      }
      this.handleGetDeals();
    } else if (nextProps.actionType === ON_UPDATE_DEAL_SUCCESSFULLY) {
      if (nextProps.actionSuccess) {
        CommonToaster.show({
          message: 'Update deal successfully',
          intent: Intent.SUCCESS,
        });
      } else {
        CommonToaster.show({
          message: 'Update deal unsuccessfully',
          intent: Intent.DANGER,
        });
      }
      this.handleGetDeals();
    }
  }

  handlePageChange(pageNumber) {
    const { dataPagination } = this.state;
    dataPagination.page = pageNumber;

    this.setState({ dataPagination }, () => {
      window.scrollTo(0, 0);
      this.handleGetDeals();
    });
  }

  handleGetDeals() {
    this.props.getMyDeals(this.state.dataPagination);
  }

  handleFilter(data) {
    const { dataPagination } = this.state;
    dataPagination.order_by = data.field;

    this.setState({ dataPagination }, () => {
      this.handleGetDeals();
    });
  }

  handleSearch(params) {
    let dataFilter = {
      ...this.state.dataPagination,
    };

    Object.keys(params).map((key) => {
      dataFilter[key] = params[key];
      return key;
    });

    this.setState({
      dataPagination: dataFilter,
    }, () => {
      this.handleGetDeals();
    });
  }

  handleConfirmDelete(dealId) {
    this.setState({
      activeAction: ON_DELETE_DEAL,
      isAlertPopupOpen: true,
      dealId,
      alertData: {
        title: 'Warning',
        content: 'Do you want to delete this post?',
      },
    });
  }

  handleDelete() {
    this.setState({
      isAlertPopupOpen: false,
    }, () => {
      this.props.onDeleteDeal(this.state.dealId);
    });
  }

  handleConfirmUpdate(dealId, data) {
    console.log('data', data);
    this.setState({
      activeAction: ON_UPDATE_DEAL,
      isAlertPopupOpen: true,
      dealId,
      status: data.nextStatus,
      model_id: data.model_id,
      brand_id: data.brand_id,
      alertData: {
        title: 'Warning',
        content: 'Do you want to update this post?',
      },
    });
  }

  handleUpdate() {
    this.setState({
      isAlertPopupOpen: false,
    }, () => {
      this.props.onUpdateDeal(this.state.dealId, {
        status: this.state.status,
        model_id: this.state.model_id,
        brand_id: this.state.brand_id,
      });
    });
  }

  render() {
    const { deals, alertData, isAlertPopupOpen, activeAction } = this.state;

    let rows = (<NoDataFound />);

    if (deals.docs && deals.docs.length > 0) {
      rows = deals.docs.map((deal) => (<ProductRow
        key={deal.id}
        data={deal}
        handleDelete={(dealId) => {
          this.handleConfirmDelete(dealId);
        }}
        handleChangeStatus={(dealId, data) => {
          this.handleConfirmUpdate(dealId, data);
        }}
        showAction
        showStatus
        link={`/deal/update/${deal.id}`}
      />));
    }

    return (
      <StyledDealsPage>
        <FilterBar
          handleSort={this.handleFilter}
          handleSearch={this.handleSearch}
          brands={this.state.brands}
        />

        <Row
          className={'justify-content-center'}
          style={{ marginLeft: '-5px', marginRight: '-5px' }}
        >
          {rows}
        </Row>

        <Row className={'justify-content-center'}>
          <Pagination
            activePage={this.state.dataPagination.page}
            totalItemsCount={this.state.deals.total}
            onChange={this.handlePageChange}
          />
        </Row>

        <AlertPopup
          title={alertData.title}
          content={(<div style={{ margin: '2rem' }}>{alertData.content}</div>)}
          isOpen={isAlertPopupOpen}
          handleConfirm={activeAction === ON_UPDATE_DEAL ? this.handleUpdate : this.handleDelete}
        />
      </StyledDealsPage>
    );
  }
}

DealsPage.propTypes = {
  actionType: PropTypes.string,
  actionSuccess: PropTypes.bool,
  deals: PropTypes.object,
  getMyDeals: PropTypes.func,
  onDeleteDeal: PropTypes.func,
  onUpdateDeal: PropTypes.func,
};

const mapStateToProps = makeSelectDealsPage();

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMyDeals,
      onDeleteDeal,
      onUpdateDeal,
      getBrands,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: DEALS_PAGE, reducer });
const withSaga = injectSaga({ key: DEALS_PAGE, saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DealsPage);
