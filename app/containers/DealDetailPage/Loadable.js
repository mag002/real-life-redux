/**
 *
 * Asynchronously loads the component for DealDetailPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
