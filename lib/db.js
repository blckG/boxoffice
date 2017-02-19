import lowdb from 'lowdb';

const db = lowdb('db.json');

db.defaults({wanted: []}).write();

export const wanted = db.get('wanted');

export default db;
