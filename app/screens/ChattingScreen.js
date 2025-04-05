import React, { Component } from "react";
import Global from "../utils/Global";

import {
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from "react-native";
const {width} = Dimensions.get('window');
const MSG_LINE_MAX_COUNT = 15;

const mockMessages = [
  {
    msgType: "txt",
    to: "curUser",
    data: "hello",
  },
  {
    msgType: "txt",
    to: "anotherUser",
    data: "你好，终于成功啦!",
  },
  {
    msgType: "txt",
    to: "anotherUser",
    data: "感觉还不是很稳定",
  },
  {
    msgType: "txt",
    to: "anotherUser",
    data: "刚刚发送失败了\n不确定是前端还是后端BUG\n（倾向于后端BUG，因为后台有报",
  },
  {
    msgType: "txt",
    to: "anotherUser",
    data: "换行不存... 差评",
  },
  {
    msgType: "txt",
    to: "curUser",
    data: "I agree with you.",
  },
  {
    msgType: "txt",
    to: "curUser",
    data: "I want to find a fang-wechat Ul template to replace current one.",
  },
];

export default class ChattingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: "curUser",
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({messages: mockMessages});
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
      </View>
    );
  }

  renderItem = (item) => {
    let msgType = item.item.msgType;
    
    if (msgType == "txt") {
      // 文本消息
      if (item.item.to == this.state.username) {
        return this.renderReceivedTextMsg(item);
      } else {
        return this.renderSendTextMsg(item);
      }
    } else if (msgType == "img") {
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
    let contactAvatar = require("../../assets/images/avatar.png");
    return (
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <View style={listItemStyle.container}>
          <Image style={listItemStyle.avatar} source={contactAvatar} />
          <View style={listItemStyle.msgContainer}>
            <Text style={listItemStyle.msgText}>
              {item.item.data}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderSendTextMsg(item) {
    // 发送出去的文本消息
    let avatar = require("../../assets/images/avatar.png");
    // 发送出去的消息
    return (
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <View style={listItemStyle.containerSend}>
          <View style={listItemStyle.msgContainerSend}>
            <Text style={listItemStyle.msgText}>
              {item.item.data}
            </Text>
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
    flexDirection: "row",
    padding: 5,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  msgContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  msgContainerSend: {
    backgroundColor: "#9FE658",
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  msgText: {
    fontSize: 15,
    lineHeight: 24,
  },
  containerSend: {
    flex: 1,
    width: width,
    flexDirection: "row",
    padding: 5,
    justifyContent: "flex-end",
  },
  time: {
    backgroundColor: "#D4D4D4",
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 5,
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 11,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
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
