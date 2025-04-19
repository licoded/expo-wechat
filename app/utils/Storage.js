import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalStorage = {
  /**
   * 设置永久缓存
   * @param {string} key
   * @param {any} val
   * @returns {Promise<void>}
   */
  set(key, val) {
    return AsyncStorage.setItem(key, JSON.stringify(val));
  },

  /**
   * 获取永久缓存
   * @param {string} key
   * @returns any
   */
  get(key) {
    return AsyncStorage.getItem(key).then((json) => {
      return json != null ? JSON.parse(json) : null;
    });
  },
  /**
   * 移除永久缓存
   * @param {string} key
   */
  remove(key) {
    return AsyncStorage.removeItem(key);
  },
  /**
   * 移除全部永久缓存
   */
  clear() {
    return AsyncStorage.clear();
  },
};
