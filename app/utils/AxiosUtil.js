import axios from "axios";

axios.defaults.baseURL = "https://licoded.site:9301/api";

axios.interceptors.response.use(({ data: resp, config }) => {
  const { code, data } = resp;
  const logMsg = `响应 ${config.method.toLocaleUpperCase()} ${config.url}\n`;
  if (code === 200) {
    console.log(logMsg, data);
    return Promise.resolve(data);
  } else {
    console.log(logMsg, resp);
    return Promise.reject(resp);
  }
});

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
