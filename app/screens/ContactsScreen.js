import React, { Component } from "react";
import Global from "../utils/Global";
import {
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { post } from "../utils/AxiosUtil";

const { width } = Dimensions.get("window");

const mockContactList = [
  {
    pinyin: "LiSi",
    name: "李四",
    nick: "李四",
  },
  {
    pinyin: "LiSi",
    name: "张三",
    nick: "张三",
  },
];

export default class ContactsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: [],
    };
  }

  UNSAFE_componentWillMount() {
    const params = { owner_id: Global.userId };
    post("/contact/getUserList", params).then((contactData) => {
      this.setState({ contactData });
    });
  }

  render() {
    var listData = [];
    var contacts = this.state.contactData;
    var index = 0;
    for (var i = 0; i < contacts.length; i++) {
      var pinyin = contacts[i].pinyin || contacts[i].user_name;
      var firstLetter = pinyin.substring(0, 1);
      if (firstLetter < "A" || firstLetter > "Z") {
        firstLetter = "#";
      }
      let icon = require("../../assets/images/avatar.png");
      if (contacts[i].avatar) {
        icon = `https://licoded.site:9301/api${contacts[i].avatar}`;
      }
      listData.push({
        key: index++,
        icon: icon,
        title: contacts[i].user_name,
        nick: contacts[i].user_name,
        pinyin: pinyin.toUpperCase(),
        firstLetter: firstLetter,
        sectionStart: false,
      });
    }
    // 按拼音排序
    listData.sort(function (a, b) {
      if (a.pinyin === undefined || b.pinyin === undefined) {
        return 1;
      }
      if (a.pinyin > b.pinyin) {
        return 1;
      }
      if (a.pinyin < b.pinyin) {
        return -1;
      }
      return 0;
    });
    // 根据首字母分区
    for (var i = 0; i < listData.length; i++) {
      var obj = listData[i];
      if (obj.pinyin === undefined) {
        continue;
      }
      if (i > 0 && i < listData.length) {
        var preObj = listData[i - 1];
        if (preObj.pinyin === undefined && obj.pinyin !== undefined) {
          obj.sectionStart = true;
        } else if (
          preObj.pinyin !== undefined &&
          obj.pinyin !== undefined &&
          preObj.firstLetter !== obj.firstLetter
        ) {
          obj.sectionStart = true;
        }
      }
    }
    this.listData = listData;
    return (
      <View style={styles.container}>
        {/* <TitleBar nav={this.props.navigation} /> */}
        <View style={styles.divider}></View>
        <View style={styles.content}>
          <FlatList
            data={listData}
            renderItem={this._renderItem}
            getItemLayout={this._getItemLayout}
          />
        </View>
        <View style={styles.divider}></View>
      </View>
    );
  }

  _getItemLayout = (data, index) => {
    let len = data.sectionStart ? 58 : 51;
    let dividerHeight = 1 / PixelRatio.get();
    return {
      length: len,
      offset: (len + dividerHeight) * index,
      index,
    };
  };

  onListItemClick(item) {
    console.log("TODO: 跳转到聊天页");
  }

  _renderItem = (item) => {
    var section = [];
    if (item.item.sectionStart) {
      section.push(
        <Text key={"section" + item.item.key} style={listItemStyle.sectionView}>
          {item.item.firstLetter}
        </Text>
      );
    }
    return (
      <View>
        {section}
        <TouchableHighlight
          underlayColor={Global.touchableHighlightColor}
          onPress={() => {
            this.onListItemClick(item);
          }}
        >
          <View style={listItemStyle.container} key={"item" + item.item.key}>
            <Image style={listItemStyle.image} source={item.item.icon} />
            <Text style={listItemStyle.itemText}>{item.item.title}</Text>
            <Text style={listItemStyle.subText}>
              {item.item.nick ? "" : "(" + item.item.nick + ")"}
            </Text>
          </View>
        </TouchableHighlight>
        <View
          style={{
            width: width,
            height: 1 / PixelRatio.get(),
            backgroundColor: Global.dividerColor,
          }}
        />
      </View>
    );
  };
}

const listItemStyle = StyleSheet.create({
  container: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    width: 35,
    height: 35,
  },
  itemText: {
    fontSize: 15,
    color: "#000000",
  },
  subText: {
    fontSize: 15,
    color: "#999999",
  },
  sectionView: {
    width: width,
    backgroundColor: "rgba(0, 0, 0, 0)",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    color: "#999999",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: "#D3D3D3",
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: "row",
    backgroundColor: Global.pageBackgroundColor,
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
});
