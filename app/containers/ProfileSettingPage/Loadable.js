/**
 *
 * Asynchronously loads the component for ProfileSettingPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
