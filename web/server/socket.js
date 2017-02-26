import socketio from 'socket.io';
import {wanted} from '../../lib/db';

module.exports = function (server) {
  const io = socketio(server);

  io.on('connection', socket => {
    console.log(`New socket: ${socket.id}`);

    // response to requests for all wanted movies
    socket.on('wanted:all', callback => {
      callback(wanted.value());
    });
  });

  return io;
};
