import HomePage from 'containers/HomePage/Loadable';
import SearchPage from 'containers/SearchPage';
import DealDetailPage from 'containers/DealDetailPage';
import DealForm from 'containers/DealForm';

const pagesRoutes = [
  { path: '/search', name: 'SearchPage', component: SearchPage },
  { path: '/deal/create', name: 'DealForm', component: DealForm },
  { path: '/deal/update/:id', name: 'DealForm', component: DealForm },
  { path: '/:brand/:slug', name: 'DealDetail', component: DealDetailPage },
  { path: '/', name: 'HomePage', component: HomePage },
];

export default pagesRoutes;
