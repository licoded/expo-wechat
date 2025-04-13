import WebIM from 'easemob-websdk';

export function InitIM() {
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
