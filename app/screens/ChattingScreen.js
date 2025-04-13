import React, { Component } from 'react';
import Global from '../utils/Global';

import {
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ChatBottomBar from '../components/ChatBottomBar';
import WebIM from 'easemob-websdk';
const { width } = Dimensions.get('window');

const mockMessages = [
  {
    msgType: 'txt',
    to: 'curUser',
    data: 'hello',
  },
  {
    msgType: 'txt',
    to: 'anotherUser',
    data: '你好，终于成功啦!',
  },
  {
    msgType: 'txt',
    to: 'anotherUser',
    data: '感觉还不是很稳定',
  },
  {
    msgType: 'txt',
    to: 'anotherUser',
    data: '刚刚发送失败了\n不确定是前端还是后端BUG\n（倾向于后端BUG，因为后台有报',
  },
  {
    msgType: 'txt',
    to: 'anotherUser',
    data: '换行不存... 差评',
  },
  {
    msgType: 'txt',
    to: 'curUser',
    data: 'I agree with you.',
  },
  {
    msgType: 'txt',
    to: 'curUser',
    data: 'I want to find a fang-wechat Ul template to replace current one.',
  },
];

export default class ChattingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: Global.userId,
    };
  }

  async IMLogin() {
    const username = 'U2025040597576428365';
    const password = 'licoded';
    const res = await WebIM.conn
      .open({ user: username, pwd: password })
      .catch((e) => {
        console.log(`Login failed`);
      });
    console.log(`Login Success`, res);
  }

  async UNSAFE_componentWillMount() {
    await this.IMLogin();
    this.refreshMsgs();
  }

  refreshMsgs() {
    let options = {
      // 对方的用户 ID 或者群组 ID 或聊天室 ID。
      targetId: Global.sendToUserId,
      // 每页期望获取的消息条数。取值范围为 [1,50]，默认值为 20。
      pageSize: 50,
      // 查询的起始消息 ID。若该参数设置为 `-1`、`null` 或空字符串，从最新消息开始。
      cursor: -1,
      // 会话类型：（默认） `singleChat`：单聊；`groupChat`：群聊；`chatRoom`：聊天室
      chatType: 'singleChat',
      // 消息搜索方向：（默认）`up`：按服务器收到消息的时间的逆序获取；`down`：按服务器收到消息的时间的正序获取。
      searchDirection: 'down',
    };
    console.log('refreshMsgs...');

    const _this = this;
    WebIM.conn
      .getHistoryMessages(options)
      .then((res) => {
        // 成功获取历史消息。
        console.log('historyMsgs', res);
        const messages = res.messages.map(({ type, ...others }) => ({
          msgType: type,
          ...others,
        }));
        _this.setState({ messages });
        console.log('setState', messages);
      })
      .catch((e) => {
        // 获取失败。
        console.log('historyMsgs ERR', e);
      });
  }

  _keyExtractor = (item, index) => index;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <FlatList
            data={this.state.messages}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.bottomBar}>
          <ChatBottomBar updateView={() => this.refreshMsgs()} />
        </View>
      </View>
    );
  }

  renderItem = (item) => {
    let msgType = item.item.msgType;

    if (msgType === 'txt') {
      // 文本消息
      if (item.item.to === this.state.userId) {
        return this.renderReceivedTextMsg(item);
      } else {
        return this.renderSendTextMsg(item);
      }
    } else if (msgType === 'img') {
      // 图片消息
      //   if (item.item.to == this.username) {
      //     return this.renderReceivedImgMsg(item);
      //   } else {
      //     return this.renderSendImgMsg(item);
      //   }
    }
  };

  renderReceivedTextMsg(item) {
    // 接收的文本消息
    let contactAvatar = require('../../assets/images/avatar.png');
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View style={listItemStyle.container}>
          <Image style={listItemStyle.avatar} source={contactAvatar} />
          <View style={listItemStyle.msgContainer}>
            <Text style={listItemStyle.msgText}>{item.item.msg}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderSendTextMsg(item) {
    // 发送出去的文本消息
    let avatar = require('../../assets/images/avatar.png');
    // 发送出去的消息
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View style={listItemStyle.containerSend}>
          <View style={listItemStyle.msgContainerSend}>
            <Text style={listItemStyle.msgText}>{item.item.msg}</Text>
          </View>
          <Image style={listItemStyle.avatar} source={avatar} />
        </View>
      </View>
    );
  }
}

const listItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    padding: 5,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  msgContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  msgContainerSend: {
    backgroundColor: '#9FE658',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  msgText: {
    fontSize: 15,
    lineHeight: 24,
  },
  containerSend: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-end',
  },
  time: {
    backgroundColor: '#D4D4D4',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 5,
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 11,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: Global.pageBackgroundColor,
  },
  bottomBar: {
    height: 50,
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: Global.dividerColor,
  },
});
