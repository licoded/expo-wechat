const AVATAR_BASEURL = "https://licoded.site:9301/api";

/**
 *
 * @param {string} relativePath
 * @returns {string}
 */
export function getAvatorUrl(relativePath) {
  return `${AVATAR_BASEURL}${relativePath}`;
}
