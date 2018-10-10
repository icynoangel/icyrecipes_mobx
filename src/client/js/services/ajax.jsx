import * as request from 'superagent';
import {map} from 'lodash';
import config from './../config/config';

const DATA_TYPE_JSON = 'json';

class Ajax {
  static post(url, data, headers) {
    return new Promise((resolve, reject) => {
      let postRequest = request
        .post(url)
        .set('Content-Type', 'application/json')
        .accept(DATA_TYPE_JSON);

      if (headers !== undefined) {
        map(headers, (value, key) => {
          postRequest.set(key, value);
        });
      }

      postRequest
        .send(data)
        .timeout(config.requestsTimeout)
        .end((error, response) => {
          if (error) {
            return reject(error);
          }
          return resolve(response.body);
        });
    });
  }

  static get(url, headers) {
    return new Promise((resolve, reject) => {
      let getRequest = request
        .get(url)
        .set('Content-Type', 'application/json')
        .accept(DATA_TYPE_JSON);

      if (headers !== undefined) {
        map(headers, (value, key) => {
          getRequest.set(key, value);
        });
      }

      getRequest.timeout(config.requestsTimeout).end((error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.body);
      });
    });
  }

  static del(url, headers) {
    return new Promise((resolve, reject) => {
      let delRequest = request.del(url).set('Content-Type', 'application/json');

      if (headers !== undefined) {
        map(headers, (value, key) => {
          delRequest.set(key, value);
        });
      }

      delRequest.timeout(config.requestsTimeout).end((error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.body);
      });
    });
  }

  static put(url, data, headers) {
    return new Promise((resolve, reject) => {
      let putRequest = request
        .put(url)
        .set('Content-Type', 'application/json')
        .accept(DATA_TYPE_JSON);

      if (headers !== undefined) {
        map(headers, (value, key) => {
          putRequest.set(key, value);
        });
      }

      putRequest
        .send(data)
        .timeout(config.requestsTimeout)
        .end((error, response) => {
          if (error) {
            return reject(error);
          }
          return resolve(response.body);
        });
    });
  }
}

export default Ajax;
