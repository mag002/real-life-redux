/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import indexRoutes from '../Routes';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ProtectedRoute from 'containers/ProtectedRoute';
import SecurePage from 'containers/SecurePage';
// import FavoritePage from 'containers/FavoritePage';
import GradientBackground from './styled/GradientBackground';
import history from 'utils/history';


export default function App() {
  history.listen((location, action) => {
    if (action === 'PUSH') {
      window.scrollTo(0, 0);
    }
  });

  return (
    <div className={'bg-white'}>
      <GradientBackground className={'d-flex flex-column'}>
        <Switch>
          {/* <ProtectedRoute exact path="/favorite" component={FavoritePage} />*/}
          {
            indexRoutes.map((prop, key) => (
              <Route path={prop.path} component={prop.component} key={key} />
            ))
          }
          <ProtectedRoute exact path="/:foo" component={SecurePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </GradientBackground>
    </div>
  );
}
