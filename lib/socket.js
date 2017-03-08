import socketio from 'socket.io';
import {wanted} from './db';

let io = null;

module.exports = function (server) {
  if (!io) {
    io = socketio(server);

    io.on('connection', socket => {
      console.log(`New socket: ${socket.id}`);

      // response to requests for all wanted movies
      socket.on('wanted:all', callback => {
        callback(wanted.value());
      });
    });
  }

  return io;
};
