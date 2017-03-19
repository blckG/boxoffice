const qs = require('querystring');

/**
 * creates magnet uris
 * @param  {string} hash     torrent hash
 * @param  {string} name     torrent name
 * @param  {array} trackers array of trackers to use for the magnet link (ex. 'udp://tracker.openbittorrent.com:80')
 * @return {string}          returns a magnet uri
 */
module.exports = function (hash, name, trackers) {
  const encodedName = qs.escape(name);
  return `magnet:?xt=urn:btih:${hash}&dn=${encodedName}&tr=${trackers.join('&tr=')}`;
};
