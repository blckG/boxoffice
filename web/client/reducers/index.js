import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import toasts from './toasts';
import wanted from './wanted';

const rootReducer = combineReducers({
  wanted,
  toasts,
  routing
});

export default rootReducer;
