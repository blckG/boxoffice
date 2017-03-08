import io from 'socket.io-client';
import * as WantedActions from '../actions/wanted';
import {toast} from '../actions/toaster';

const socket = io();

export function storeListners(store) {
  const {dispatch, getState} = store;

  socket.on('toaster:toast', (message, type, delay) => {
  dispatch(toast(message, type, delay));
  });

  return socket;
}

export function getAllWanted(cb) {
  socket.emit('wanted:all', data => {
    if (data) {
      return cb(null, data);
    }
    return cb('error: no data');
  });
}

export default socket;
