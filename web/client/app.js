import React from 'react';
import {render} from 'react-dom';
import {Router, IndexRoute, Route, Redirect, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';

import socketio from './lib/socket';
import configureStore from './store';

import Layout from './common/layout';
import Wanted from './pages/wanted/wanted';

const store = configureStore();
const io = socketio(store);
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Wanted}/>
        <Redirect from="*" to="/"/>
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
