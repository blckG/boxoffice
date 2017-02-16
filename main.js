import async from 'async';
import YifyProvider from './lib/providers/yify';

const yify = new YifyProvider();

const movies = [
  'John Wick',
  'John Wick chapter 2',
  'wondor woman',
  'kill command',
  'X-Men: Apocalypse',
  'max steel',
  'the accountant',
  'interstellar'
];

function getMovie(movie, done) {
  yify.movieList({query_term: movie}).then(data => {
    if (data.data.movie_count > 0) {
      console.log(data.data.movies[0].title_long);
    } else {
      console.log(`${movie} not found`);
    }
    done();
  }).catch(err => {
    console.log(err);
    done();
  });
}

async.eachLimit(movies, 5, getMovie, () => {
  console.log('all done');
});
