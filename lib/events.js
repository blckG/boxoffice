import {EventEmitter} from 'events';
import schedule from 'node-schedule';
import _ from 'lodash';
import async from 'async';
import YifyProvider from './providers/yify';
import Deluge from './downloaders/deluge';
import {wanted} from './db';
import io from './socket';
let socket = io();

const deluge = new Deluge('http://192.168.1.100:8112', 'deluge');

const yify = new YifyProvider();

const emitter = new EventEmitter();

emitter.on('scan:full', () => {
  console.log('[EVENT]', 'Scanning for movies.');
  const wantedCollection = wanted.value();
  async.eachLimit(wantedCollection, 5, getMovie, () => {
    console.log('[EVENT]', 'Scanning complete.');
  });
});

emitter.on('scan:single', movie => {
  getMovie(movie);
});

function getMovie(movie, done) {
  // don't die if not called with done CB
  const noop = function () {};
  done = done || noop;

  if (movie.torrent) {
    return done();
  }

  yify.movieList({query_term: movie.title}).then(json => {
    if (json.status === 'ok') {
      const m = _.find(json.data.movies, {imdb_code: movie.imdbId});
      if (m) {
        const torrent = _.find(m.torrents, {quality: movie.quality});
        deluge.addTorrent(torrent.url)
          .then(() => {
            wanted.find({imdbId: movie.imdbId})
              .assign({torrent})
              .write();
              socket.emit('toaster:toast', `Snatched ${m.title_long}`, 'success');
          }).catch(() => {
            return console.log('[ERROR]', 'Problem adding torrent', torrent);
          });
        console.log(`[Found] ${m.title_long}`);
        return done();
      }
    }

    console.log(`[Not Found] ${movie.title}`);
    return done();
  }).catch(err => {
    console.log(err);
    return done();
  });
}

// full scan runs every hour, on the hour.
schedule.scheduleJob('0 * * * *', () => {
  emitter.emit('scan:full');
});

// runs every 5 seconds. pulls torrent status
// prunes our local db, if torrent has been removed from client
schedule.scheduleJob('*/5 * * * * *', () => {
  deluge.getActiveTorrents()
    .then(client => {
      const torrents = client.torrents;
      for (const hash in torrents) {
        wanted.find(m => {
          if (m.torrent) {
            return m.torrent.hash.toLowerCase() === hash.toLowerCase();
          }
          return false;
        }).assign({
          torrentStatus: torrents[hash]
        }).write();
      }
      // prune removed torrents
      wanted.remove(m => {
        if (m.torrent && m.torrentStatus) {
          return !(m.torrent.hash.toLowerCase() in torrents);
        }
        return false;
      }).write();
    }).catch(err => {
      console.log(err);
    });
});

export default emitter;
