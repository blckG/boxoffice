import Deluge from './downloaders/deluge';

const deluge = new Deluge('http://192.168.1.100:8112/', 'deluge');

deluge.checkSession()
  .then(authed => {
    if (!authed) {
      deluge.auth().then(success => {
        if (success) {
          deluge.getActiveTorrents('magnet:?xt=urn:btih:ccfa6a813321a33f0e6db0add7c1b3e1a961b86b&dn=La.La.Land.2016.DVDScr.XVID.AC3.HQ.Hive-CM8&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969')
          .then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          });
        }
      });
    }
  })
  .catch(err => {
    console.log('err', err);
  });

// import async from 'async';
// import YifyProvider from './providers/yify';
//
// const yify = new YifyProvider();
//
// const movies = [
//   'John Wick',
//   'John Wick chapter 2',
//   'wondor woman',
//   'kill command',
//   'X-Men: Apocalypse',
//   'max steel',
//   'the accountant',
//   'interstellar'
// ];
//
// function getMovie(movie, done) {
//   yify.movieList({query_term: movie}).then(data => {
//     if (data.data.movie_count > 0) {
//       console.log(data.data.movies[0].title_long);
//     } else {
//       console.log(`[Not Found] ${movie}`);
//     }
//     done();
//   }).catch(err => {
//     console.log(err);
//     done();
//   });
// }
//
// async.eachLimit(movies, 5, getMovie, () => {
//   console.log('all done');
// });
