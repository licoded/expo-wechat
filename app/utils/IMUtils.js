import WebIM from 'easemob-websdk';

const IMErrMap = {
  'user not found': '找不到该用户!',
  'The user has logged in.': '重复登录!',
};
const IMErrHandler = (err) => {
  console.log(err);
  let processed_err = err;
  processed_err.message = IMErrMap[err.message] || processed_err.message;
  processed_err.message = 'IM: ' + processed_err.message;
  return Promise.reject(processed_err);
};

export function useIM() {
  WebIM.logger.setConsoleLogVisibility(false);

  const appKey = '1182250405193982#demo';
  // 初始化客户端。相关的参数配置，详见 API 参考中的 `Connection` 类。
  WebIM.conn = new WebIM.connection({
    //注意这里的 "K" 需大写。
    appKey,
  });

  // 添加回调函数。
  WebIM.conn.addEventHandler('connection&message', {
    onConnected: () => {
      console.log('Connect success !');
    },
    onDisconnected: () => {
      console.log('Logout success !');
    },
    onTextMessage: (message) => {
      console.log(message);
      console.log('Message from: ' + message.from + ' Message: ' + message.msg);
    },
    onError: (error) => {
      console.log('on error', error);
    },
  });
}

export function IMLogin(username, password) {
  return WebIM.conn.open({ user: username, pwd: password }).catch(IMErrHandler);
}

export function IMRegister(username, password) {
  return WebIM.conn
    .registerUser({ user: username, pwd: password })
    .catch(IMErrHandler);
}
