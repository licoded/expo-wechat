import React, { Component } from "react";
const { width } = Dimensions.get("window");
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telephone: "19821258634",
      password: "licoded",
    };
  }

  login() {
    const { telephone, password } = this.state;
    const params = {
      nickname: telephone,
      telephone,
      password,
      sms_code: "",
    };
    console.log("login params", params);

    fetch("http://licoded.site:9300/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.pwdView}>
            <Image
              source={require("../../assets/images/ic_launcher.png")}
              style={{ width: 100, height: 100, marginBottom: 50 }}
            />
            <View style={styles.pwdContainer}>
              <Text style={{ fontSize: 16 }}>手机号：</Text>
              <TextInput
                value={this.state.telephone}
                onChangeText={(text) => {
                  this.setState({ inputUsername: text });
                }}
                style={styles.textInput}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.pwdDivider}></View>
            <View style={styles.pwdView}>
              <View style={styles.pwdContainer}>
                <Text style={{ fontSize: 16 }}>密码：</Text>
                <TextInput
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(text) => {
                    this.setState({ password: text });
                  }}
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={styles.pwdDivider}></View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.login()}
              >
                <View style={styles.loginBtn}>
                  <Text style={{ color: "#FFFFFF", fontSize: 16 }}>登录</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  pwdView: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
  },
  textInput: {
    flex: 1,
  },
  usernameText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  pwdContainer: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
  },
  pwdDivider: {
    width: width - 60,
    marginLeft: 30,
    marginRight: 30,
    height: 1,
    backgroundColor: "#00BC0C",
  },
  loginBtn: {
    width: width - 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    height: 50,
    borderRadius: 3,
    backgroundColor: "#00BC0C",
    justifyContent: "center",
    alignItems: "center",
  },
  changeAccount: {
    fontSize: 16,
    color: "#00BC0C",
    textAlign: "center",
    marginBottom: 20,
  },
});
