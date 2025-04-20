import {
  ChatClient,
  ChatOptions,
  ChatMessageChatType,
  ChatMessage,
} from 'react-native-chat-sdk';
import React from 'react';

const IMErrMsgMap = {
  'user not found': '找不到该用户!',
  'The user has logged in.': '重复登录!',
};
const IMErrDescMap = {
  'User does not exist': '找不到该用户!',
  'User authentication failed': '密码错误!',
  'The user is already logged in': '重复登录!',
  'Another user is already logged in': '已登录其他账号!',
};
const IMErrHandler = (err) => {
  console.log(err);
  let processed_err = err;
  if (!processed_err.message) {
    processed_err.message = IMErrDescMap[err.description];
  } else {
    processed_err.message = IMErrMsgMap[err.message] || processed_err.message;
  }
  processed_err.message = 'IM: ' + processed_err.message;
  return Promise.reject(processed_err);
};

export function useIM() {
  const [content, setContent] = React.useState('');
  const [logText, setWarnText] = React.useState('Show log area');
  const chatClient = ChatClient.getInstance();
  const chatManager = chatClient.chatManager;

  const appKey = '1182250405193982#demo';

  // Outputs console logs.
  React.useEffect(() => {
    logText.split('\n').forEach((value, index, array) => {
      if (index === 0) {
        console.log(value);
      }
    });
  }, [logText]);

  // Outputs UI logs.
  const rollLog = (text) => {
    setWarnText((preLogText) => {
      let newLogText = text;
      preLogText
        .split('\n')
        .filter((value, index, array) => {
          if (index > 8) {
            return false;
          }
          return true;
        })
        .forEach((value, index, array) => {
          newLogText += '\n' + value;
        });
      return newLogText;
    });
  };

  React.useEffect(() => {
    // Registers listeners for messaging.
    const setMessageListener = () => {
      let msgListener = {
        onMessagesReceived(messages) {
          for (let index = 0; index < messages.length; index++) {
            rollLog('received msgId: ' + messages[index].msgId);
          }
        },
        onCmdMessagesReceived: (messages) => {},
        onMessagesRead: (messages) => {},
        onGroupMessageRead: (groupMessageAcks) => {},
        onMessagesDelivered: (messages) => {},
        onMessagesRecalled: (messages) => {},
        onConversationsUpdate: () => {},
        onConversationRead: (from, to) => {},
      };

      chatManager.removeAllMessageListener();
      chatManager.addMessageListener(msgListener);
    };

    // Initializes the SDK.
    // Initializes any interface before calling it.
    const init = () => {
      let o = ChatOptions.withAppKey({
        autoLogin: false,
        appKey: appKey,
      });
      chatClient.removeAllConnectionListener();
      chatClient
        .init(o)
        .then(() => {
          rollLog('init success');
          let listener = {
            onTokenWillExpire() {
              rollLog('token expire.');
            },
            onTokenDidExpire() {
              rollLog('token did expire');
            },
            onConnected() {
              rollLog('onConnected');
              setMessageListener();
            },
            onDisconnected(errorCode) {
              rollLog('onDisconnected:' + errorCode);
            },
          };
          chatClient.addConnectionListener(listener);
        })
        .catch((error) => {
          rollLog(
            'init fail: ' +
              (error instanceof Object ? JSON.stringify(error) : error),
          );
        });
    };

    init();
  }, [chatClient, chatManager, appKey]);
}

export function IMLogin(username, password) {
  return ChatClient.getInstance().login(username, password).catch(IMErrHandler);
}

export function IMRegister(username, password) {
  return ChatClient.getInstance()
    .createAccount(username, password)
    .catch(IMErrHandler);
}
