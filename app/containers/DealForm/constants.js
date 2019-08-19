export const ON_BEGIN_SUBMIT = 'app/containers/TransactionPage/ON_BEGIN_SUBMIT';
export const ON_SUBMIT_FAILED = 'app/containers/TransactionPage/ON_SUBMIT_FAILED';

export const ON_SUBMIT = 'app/DealForm/ON_SUBMIT';
export const ON_SUBMIT_SUCCESSFULLY = 'app/DealForm/ON_SUBMIT_SUCCESSFULLY';

export const GET_BRANDS = 'app/components/DealForm/GET_BRANDS';
export const GET_BRANDS_SUCCESSFULLY = 'app/components/DealForm/GET_BRANDS_SUCCESSFULLY';

export const GET_DEAL = 'app/components/DealForm/GET_DEAL';
export const GET_DEAL_SUCCESSFULLY = 'app/components/DealForm/GET_DEAL_SUCCESSFULLY';

export const ON_UPLOAD_IMAGE = 'app/DealForm/ON_UPLOAD_IMAGE';
export const ON_UPLOAD_IMAGE_SUCCESSFULLY = 'app/DealForm/ON_UPLOAD_IMAGE_SUCCESSFULLY';

export const DEAL_FORM = 'dealForm';

export const ERROR_COMMON = '400';
export const ERROR_SUBMIT_FAIL = '422';
export const ERROR_UPLOAD_IMG_FAIL = '423';

export const ERROR_MESSAGES = {
  [ERROR_COMMON]: 'Something error. Please try against.',
  [ERROR_SUBMIT_FAIL]: 'Create/Update deal unsuccessfully',
  [ERROR_UPLOAD_IMG_FAIL]: 'Images are not uploaded successfully. Please try again.',
};
