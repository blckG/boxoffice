import io from 'socket.io-client';
import * as WantedActions from '../actions/wanted';

const socket = io('http://localhost:1337');

export default function (store) {
  const {dispatch, getState} = store;

  // poll the server for the list of wanted movies
  setInterval(() => {
    socket.emit('wanted:all', data => {
      dispatch(WantedActions.wanted(data));
    });
  }, 1000);

  return socket;
}
