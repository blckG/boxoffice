import url from 'url';
import request from 'superagent';

export default class DelugeDownloader {
  constructor(address, password) {
    this.baseUrl = url.resolve(address, '/json');
    this.password = password;
    this.counter = 0;

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

  async addTorrentMagnet(uri, options) {
    options = {
      file_priorities: [],
      add_paused: false,
      compact_allocation: true,
      // download_location: dlPath,
      max_connections: -1,
      max_download_speed: -1,
      max_upload_slots: -1,
      max_upload_speed: -1,
      prioritize_first_last_pieces: false,
      ...options
    };
    const res = await this.requestBuilder('core.add_torrent_magnet', uri, options);
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
    const res = await this.requestBuilder('web.update_ui', keys, {});
    return new Promise((resolve, reject) => {
      if (res.error) {
        return reject(res.error);
      }
      return resolve(res.result);
    });
  }

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
