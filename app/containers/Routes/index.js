import AuthPages from '../Pages/AuthPages';
import Pages from '../Pages/Pages';
import UserPages from '../Pages/UserPages';

const indexRoutes = [
  { path: '/auth', name: 'Auth', component: AuthPages },
  { path: '/auth/:anything', name: 'Auth', component: AuthPages },

  { path: '/user', name: 'User', component: UserPages },
  { path: '/user/:anything', name: 'User', component: UserPages },

  { path: '/', name: 'Page', component: Pages },
  { path: '/:anything', name: 'Page', component: Pages },
];

export default indexRoutes;
