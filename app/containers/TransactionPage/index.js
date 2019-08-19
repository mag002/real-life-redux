import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { getTransactions, onUpdateTransaction } from './actions';
import saga from './saga';
import injectSaga from 'utils/injectSaga';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import makeSelectTransactionPage from './selectors';
import reducer from './reducer';
// import { isEqual } from 'lodash';
import isEqual from 'lodash/isEqual';
// import { Row } from 'reactstrap';
import Row from 'reactstrap/es/Row';
import { ERROR_MESSAGES, TRANSACTION_PAGE } from './constants';
import { configuration } from '../../constants';
import { StyledTransactionsPage } from './styled/StyledTransactionsPage';
import AlertPopup from 'components/AlertPopup';
import { Intent } from '@blueprintjs/core';
import { CommonToaster } from 'components/CommonToaster';
import ProductRow from 'components/ProductRow';
import Pagination from 'components/Pagination';
import { eTransactionType } from 'enums/ETransactionType';
import FilterBar from './FilterBar';
import { eTransactionStatus, eTransactionStatusActionText } from '../../enums/ETransactionStatus';
import { DAEMON } from '../../utils/constants';
import NoDataFound from '../../components/NoDataFound';

export class TransactionPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      transactionId: null,
      transactionStatus: null,
      dataPagination: {
        page: 1,
        paginate: configuration.paginate,
      },
      transactionType: eTransactionType.ALL,
    };

    this.handleGetTransactions = this.handleGetTransactions.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleConfirmUpdate = this.handleConfirmUpdate.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeTransType = this.handleChangeTransType.bind(this);
  }

  componentDidMount() {
    this.handleGetTransactions();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorCode && !isEqual(nextProps.errorCode, this.props.errorCode)) {
      CommonToaster.show({
        message: ERROR_MESSAGES[nextProps.errorCode],
        intent: Intent.DANGER,
      });
      this.handleGetTransactions();
    }

    if (nextProps.transaction && !isEqual(nextProps.transaction, this.props.transaction)) {
      CommonToaster.show({
        message: 'Update transaction successfully.',
        intent: Intent.SUCCESS,
      });
      this.handleGetTransactions();
    }
  }

  handleGetTransactions() {
    let { dataPagination, transactionType } = this.state;

    this.props.getTransactions({
      ...dataPagination,
      type: transactionType,
    });
  }

  handlePageChange(pageNumber) {
    const { dataPagination } = this.state;
    dataPagination.page = pageNumber;

    this.setState({ dataPagination }, () => {
      window.scrollTo(0, 0);
      this.handleGetTransactions();
    });
  }

  handleConfirmUpdate(transactionId, status) {
    this.setState({
      isAlertPopupOpen: true,
      transactionId,
      transactionStatus: status,
    });
  }

  handleUpdate() {
    this.setState({
      isAlertPopupOpen: false,
    }, () => {
      this.props.onUpdateTransaction(this.state.transactionId, {
        status: this.state.transactionStatus,
      });
    });
  }

  handleChangeTransType(type) {
    this.setState({
      transactionType: type,
    }, () => {
      this.handleGetTransactions();
    });
  }

  render() {
    const { isAlertPopupOpen } = this.state;
    const { transactions } = this.props;

    let rows = (<NoDataFound />);

    if (transactions.docs && transactions.docs.length > 0) {
      rows = transactions.docs.map((trans) => (<ProductRow
        
        key={Math.random()}
        data={trans.deal}
        transactionId={trans.id}
        showTransactionStatus
        showActionSeller={eTransactionStatus.WAITING_CONFIRM === trans.status && this.state.transactionType === eTransactionType.SELLER}
        showActionBuyer={eTransactionStatus.WAITING_CONFIRM === trans.status && this.state.transactionType === eTransactionType.BUYER}
        seller={trans.seller}
        showSeller={this.state.transactionType === eTransactionType.BUYER}
        buyer={trans.buyer}
        showBuyer={this.state.transactionType === eTransactionType.SELLER}
        transactionStatus={trans.status}
        handleUpdateTransactionStatus={this.handleConfirmUpdate}
      />));
    }

    return (
      <StyledTransactionsPage>
        <FilterBar
          handleChangeTransType={this.handleChangeTransType}
        />

        <Row style={{ marginRight: '-5px', marginLeft: '-5px' }}>
          {rows}
        </Row>

        <Row className={'justify-content-center'}>
          <Pagination
            activePage={this.state.dataPagination.page}
            totalItemsCount={this.props.transactions.total}
            onChange={this.handlePageChange}
          />
        </Row>
        <AlertPopup
          title={'Confirm'}
          content={(<div
            style={{ margin: '2rem' }}
          >{`Do you want to ${eTransactionStatusActionText[this.state.transactionStatus]} this transaction ?`}</div>)}
          isOpen={isAlertPopupOpen}
          handleConfirm={this.handleUpdate}
        />
      </StyledTransactionsPage>
    );
  }
}

TransactionPage.propTypes = {
  errorCode: PropTypes.string,
  transaction: PropTypes.object,
  transactions: PropTypes.object,
  getTransactions: PropTypes.func,
  onUpdateTransaction: PropTypes.func,
};

const mapStateToProps = makeSelectTransactionPage();

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTransactions,
      onUpdateTransaction,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: TRANSACTION_PAGE, reducer });
const withSaga = injectSaga({ key: TRANSACTION_PAGE, saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionPage);
