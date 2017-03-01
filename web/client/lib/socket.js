import io from 'socket.io-client';
import * as WantedActions from '../actions/wanted';

const socket = io('http://localhost:1337');

export function storeListners(store) {
  const {dispatch, getState} = store;

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
