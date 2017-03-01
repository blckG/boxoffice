import React from 'react';
import {render} from 'react-dom';
import {Router, IndexRoute, Route, Redirect, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';

import {storeListners} from './lib/socket';
import configureStore from './store';

import Layout from './common/layout';
import Wanted from './pages/wanted/wanted';
import Settings from './pages/settings/settings';

const store = configureStore();
storeListners(store);
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Wanted}/>
        <Route path="/settings" component={Settings}/>
        <Redirect from="*" to="/"/>
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
