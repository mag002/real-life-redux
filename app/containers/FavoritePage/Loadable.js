/**
 *
 * Asynchronously loads the component for FavoritePage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
