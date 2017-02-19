import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, IndexRoute, Route, Redirect, browserHistory} from 'react-router';

import Layout from './common/Layout';
import Wanted from './pages/wanted/WantedComponent';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Wanted} />
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
);

render(router, document.getElementById('app'));

// import React from 'react';
// import {render} from 'react-dom';
// import {Router, browserHistory} from 'react-router';
//
// import './app.scss';
//
// render(
//   <Provider store={store}>
//     <Router history={history} routes={routes} />
//   </Provider>,
//   document.getElementById('app')
// );
