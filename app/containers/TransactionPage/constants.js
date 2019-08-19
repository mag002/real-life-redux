
export const ON_BEGIN_SUBMIT = 'app/containers/TransactionPage/ON_BEGIN_SUBMIT';
export const ON_SUBMIT_FAILED = 'app/containers/TransactionPage/ON_SUBMIT_FAILED';

export const GET_TRANSACTIONS = 'app/containers/TransactionPage/GET_TRANSACTIONS';
export const GET_TRANSACTIONS_SUCCESSFULLY = 'app/containers/TransactionPage/GET_TRANSACTIONS_SUCCESSFULLY';


export const ON_UPDATE_TRANSACTION = 'app/containers/TransactionPage/ON_UPDATE_TRANSACTION';
export const ON_UPDATE_TRANSACTION_SUCCESSFULLY = 'app/containers/TransactionPage/ON_UPDATE_TRANSACTION_SUCCESSFULLY';

export const TRANSACTION_PAGE = 'transactionPage';

export const ERROR_COMMON = '450';
export const ERROR_GET_TRANSACTIONS = '451';
export const ERROR_UPDATE_TRANSACTION = '452';

export const ERROR_MESSAGES = {
  [ERROR_COMMON]: 'Something error. Please try against.',
  [ERROR_GET_TRANSACTIONS]: 'Get transactions unsuccessfully',
  [ERROR_UPDATE_TRANSACTION]: 'Update transaction unsuccessfully',
};
