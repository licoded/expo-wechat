import React, { Component } from "react";
import { Button, PixelRatio, StyleSheet, TextInput, View } from "react-native";
import WebIM from "easemob-websdk";
import Global from "../utils/Global";

export default class ChatBottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: "",
    };
  }
  sendMsg() {
    const peerId = Global.sendToUserId;
    const peerMessage = this.state.inputMsg;
    let option = {
      chatType: "singleChat", // 会话类型，设置为单聊。
      type: "txt", // 消息类型。
      to: peerId, // 消息接收方（用户 ID)。
      msg: peerMessage, // 消息内容。
    };
    let msg = WebIM.message.create(option);
    WebIM.conn
      .send(msg)
      .then((res) => {
        this.state.inputMsg = "";
        console.log("send private text success", res);
        console.log("Message send to: " + peerId + " Message: " + peerMessage);
        this.props.updateView();
      })
      .catch(() => {
        console.log("send private text fail");
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.inputMsg}
          onChangeText={(text) => {
            this.setState({ inputMsg: text });
          }}
          onSubmitEditing={() => this.sendMsg()} // 监听回车事件
          style={styles.input}
        />
        <View style={{ marginLeft: 10 }}>
          <Button
            color={"#49BC1C"}
            title={"发送"}
            onPress={() => this.sendMsg()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    padding: 5,
  },
  recorder: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: "#6E7377",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
