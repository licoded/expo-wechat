const AVATAR_BASEURL = "http://licoded.site:9300";

/**
 *
 * @param {string} relativePath
 * @returns {string}
 */
export function getAvatorUrl(relativePath) {
  return `${AVATAR_BASEURL}${relativePath}`;
}
