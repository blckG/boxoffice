import request from 'superagent';
import endpoints from './endpoints';

export default class YifyProvider {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
}

Object.keys(endpoints.methods).forEach(namespace => {
  Object.keys(endpoints.methods[namespace]).forEach(method => {
    YifyProvider.prototype[namespace + method] = function (params) {
      const endpoint = endpoints.methods[namespace][method];
      const url = endpoints.base_url + endpoint.resource;
      return new Promise((resolve, reject) => {
        request(endpoint.method.toUpperCase(), url)
          .set('Accept', 'application/json')
          .query(params)
          .end((err, res) => {
            if (err) {
              return reject(err);
            }
            return resolve(res.body);
          });
      });
    };
  });
});
