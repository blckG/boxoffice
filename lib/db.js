import lowdb from 'lowdb';

const db = lowdb('db.json');

db.defaults({wanted: []}).write();
db.defaults({
  settings: {
    torrentClientAddress: '',
    dlPath: '',
    moviesPath: '',
    completedPath: ''
  }
}).write();

export const wanted = db.get('wanted');
export const settings = db.get('settings');

export default db;
