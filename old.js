import Deluge from './downloaders/deluge';

const deluge = new Deluge('192.168.1.100:8112', 'deluge');

deluge.checkSession()
  .then(authed => {
    if (!authed) {
      deluge.auth().then(success => {
        if (success) {
          deluge.addTorrent('https://yts.ag/torrent/download/C4205F4B2B707CD3C8CFF6F1B2DAD41A0FCF0E3D')
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
