import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import toasts from './toasts';
import wanted from './wanted';
import settings from './settings';

const rootReducer = combineReducers({
  settings,
  wanted,
  toasts,
  routing
});

export default rootReducer;
