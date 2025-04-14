import React, {Component} from 'react';

import Global from '../utils/Global';

import {
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import ListItem from '../components/ListItem';
import ListItemDivider from '../components/ListItemDivider';

const {width} = Dimensions.get('window');

const userData = {
  avatarImg:require('../../assets/images/avatar.png'),
  username:'wei666',
  nickname:'weiyang'
}

export default class MeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData:{},
    };
  }

  componentDidMount(){
    this.setState({userData})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.divider}></View>
        <ScrollView style={styles.content}>
          <View style={{width: width, height: 20}}/>
          <TouchableHighlight underlayColor={Global.touchableHighlightColor} >
            <View style={styles.meInfoContainer}>
              <Image style={styles.meInfoAvatar} source={this.state.userData.avatarImg}/>
              <View style={styles.meInfoTextContainer}>
                <Text style={styles.meInfoNickName}>{this.state.userData.username}</Text>
                <Text style={styles.meInfoWeChatId}>{"昵称：" + this.state.userData.nickname}</Text>
              </View>
              <Image style={styles.meInfoQRCode} source={require('../../assets/images/ic_qr_code.png')}/>
            </View>
          </TouchableHighlight>
          <View/>
          <View style={{width: width, height: 20}}/>
          <ListItem icon={require('../../assets/images/ic_wallet.png')} text={"钱包"}/>
          <View style={{width: width, height: 20}}/>
          <ListItem icon={require('../../assets/images/ic_collect.png')} text={"收藏"} showDivider={true}/>
          <ListItemDivider/>
          <ListItem icon={require('../../assets/images/ic_gallery.png')} text={"相册"} showDivider={true} />
          <ListItemDivider/>
          <ListItem icon={require('../../assets/images/ic_kabao.png')} text={"卡包"} showDivider={true} />
          <ListItemDivider/>
          <ListItem icon={require('../../assets/images/ic_emoji.png')} text={"表情"}/>
          <View style={{width: width, height: 20}}/>
          <ListItem icon={require('../../assets/images/ic_settings.png')} text={"设置"} />
          <View style={{width: width, height: 20}}/>
        </ScrollView>
        <View style={styles.divider}></View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: '#D3D3D3'
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: 'column',
    backgroundColor: Global.pageBackgroundColor,
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
  meInfoContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
  },
  meInfoAvatar: {
    width: 60,
    height: 60,
  },
  meInfoTextContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  meInfoNickName: {
    color: '#000000',
    fontSize: 16,
  },
  meInfoWeChatId: {
    color: '#999999',
    fontSize: 14,
    marginTop: 5,
  },
  meInfoQRCode: {
    width: 25,
    height: 25,
  }
});