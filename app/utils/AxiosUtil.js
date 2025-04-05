import axios from "axios";

axios.defaults.baseURL = "/api";

/**
 *
 * @param {string} url
 * @param {object?} params
 * @returns {Promise}
 */
export function get(url, params) {
  return Promise.resolve(
    axios.get(url, {
      params: params,
    })
  );
}

/**
 *
 * @param {string} url
 * @param {object} params
 * @returns {Promise}
 */
export function post(url, params) {
  return Promise.resolve(axios.post(url, params));
}
