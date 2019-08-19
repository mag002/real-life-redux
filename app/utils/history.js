import createHistory from 'history/createBrowserHistory';
const history = createHistory();

/**
 * Helper to handle navigation from sagas.
 * @param  {String} location The path to navigate
 */
export function forwardTo(location) {
  history.push(location);
}


export default history;
