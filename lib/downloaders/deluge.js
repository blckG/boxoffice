import url from 'url';
import validUrl from 'valid-url';
import request from 'superagent';

export default class DelugeDownloader {
  constructor(address, password, config) {
    const parsedUrl = url.parse(address);
    if (!(parsedUrl.protocol && parsedUrl.host && parsedUrl.port)) {
      throw new Error('Missing or invalid Deluge server address. Expected something like http://localhost:8112 or http://192.168.1.15:8112');
    }
    this.baseUrl = url.resolve(address, '/json');
    this.password = password;
    this.counter = 0;

    this.config = config;

    this.agent = request.agent();
  }

  async auth() {
    const res = await this.requestBuilder('auth.login', this.password);

    return new Promise((resolve, reject) => {
      if (res.error) {
        return reject(res.error);
      }
      return resolve(res.result);
    });
  }

  async checkSession() {
    const res = await this.requestBuilder('auth.check_session');

    return new Promise((resolve, reject) => {
      if (res.error) {
        return reject(res.error);
      }
      return resolve(res.result);
    });
  }

  async addTorrent(uri, options) {
    const torrent = [{
      path: uri,
      options: {
        file_priorities: [],
        add_paused: false,
        compact_allocation: true,
        // label: 'movies',
        // download_location: dlPath,
        // move_completed: 1,
        // move_completed_path: path,
        max_connections: -1,
        max_download_speed: -1,
        max_upload_slots: -1,
        max_upload_speed: -1,
        prioritize_first_last_pieces: false,
        ...options
      }
    }];

    const authed = await this.checkSession();
    if (!authed) {
      await this.auth();
    }

    let res;

    if (validUrl.isWebUri(uri)) {
      res = await this.requestBuilder('web.download_torrent_from_url', uri);
      torrent[0].path = res.result;
    }

    res = await this.requestBuilder('web.add_torrents', torrent);

    return new Promise((resolve, reject) => {
      if (res.error) {
        return reject(res.error);
      }
      return resolve(res.result);
    });
  }

  async getActiveTorrents() {
    const keys = [
      'queue',
      'hash',
      'name',
      'total_wanted',
      'state',
      'progress',
      'num_seeds',
      'total_seeds',
      'num_peers',
      'total_peers',
      'download_payload_rate',
      'upload_payload_rate',
      'eta',
      'ratio',
      'distributed_copies',
      'is_auto_managed',
      'time_added',
      'tracker_host',
      'save_path',
      'total_done',
      'total_uploaded',
      'max_download_speed',
      'max_upload_speed',
      'seeds_peers_ratio'
    ];
    const authed = await this.checkSession();
    if (!authed) {
      await this.auth();
    }

    const res = await this.requestBuilder('web.update_ui', keys, {});
    return new Promise((resolve, reject) => {
      if (res.error) {
        return reject(res.error);
      }
      return resolve(res.result);
    });
  }

  /**
   * [requestBuilder Takes a method and any number of parameters for the method being called]
   * @param  {[String]}  method [The method name in string form. 'auth.login']
   * @param  {[Any]}  params [...params takes any number of arguments for the called method]
   * @return {Promise}        [Returns a Promise that resolves with the resulting JSON object from the Deluge api server]
   */
  async requestBuilder(method, ...params) {
    return new Promise((resolve, reject) => {
      const body = {
        id: this.counter++,
        method,
        params
      };
      this.agent.post(this.baseUrl)
        .send(body)
        .set('Accept', 'application/json')
        .buffer()
        .end((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(JSON.parse(res.text));
        });
    });
  }
}
