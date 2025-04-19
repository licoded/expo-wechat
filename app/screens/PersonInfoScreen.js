import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { getAvatorUrl } from '../utils/StaticUtil';
import { post } from '../utils/AxiosUtil';
import Global from '../utils/Global';
import { ImagePickerProvider } from '../components/ImagePickerProvider';
import { LocalStorage } from '../utils/Storage';

const { width } = Dimensions.get('window');

const userData = {
  avatarImg: getAvatorUrl('/static/avatars/42663693.png'),
  nickname: 'licoded',
  wechatId: 'U2025040881646893574',
};

export default class PersonInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
    };
  }

  componentDidMount() {
    // this.setState({ userData });
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    LocalStorage.get('userData').then((raw_userData) => {
      const { avatar, nickname, uuid } = raw_userData;
      const userData = {
        avatarImg: getAvatorUrl(avatar),
        nickname,
        wechatId: uuid,
      };
      this.setState({ userData });
    });
  }

  updateUserInfo(img) {
    console.log(img);
    const baseParams = { uuid: Global.userId };
    const params = {
      avatar: `/static/avatars/${img.fileName}`,
      ...baseParams,
    };
    const p = post('/user/updateUserInfo', params);
    p.then((res) => {
      console.log(res);
      this.fetchUserInfo();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 静态标题栏 */}
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>个人信息</Text>
        </View>

        {/* 静态内容列表 */}
        <View style={styles.list}>
          {/* 头像 */}
          <View style={styles.listItem}>
            <Text style={styles.listItemLeftText}>头像</Text>
            <View style={styles.rightContainer}>
              <ImagePickerProvider
                allowsEditing={false}
                uploadUrl="/message/uploadAvatar"
                beforeUpload={([img]) => this.updateUserInfo(img)}
              >
                {({ selectImages }) => (
                  <TouchableOpacity onPress={selectImages}>
                    <Image
                      style={[styles.listItemRight, styles.avatarImg]}
                      source={this.state.userData.avatarImg}
                    />
                  </TouchableOpacity>
                )}
              </ImagePickerProvider>
            </View>
          </View>

          <View style={styles.divider} />

          {/* 昵称 */}
          <View style={styles.listItem}>
            <Text style={styles.listItemLeftText}>
              {this.state.userData.nickname}
            </Text>
            <View style={styles.rightContainer}>
              <Text>用户昵称</Text>
            </View>
            <Image
              source={require('../../assets/images/ic_right_arrow.png')}
              style={styles.rightArrow}
            />
          </View>

          <View style={styles.divider} />

          {/* 微信号 */}
          <View style={styles.listItem}>
            <Text style={styles.listItemLeftText}>微信号</Text>
            <View style={styles.rightContainer}>
              <Text>{this.state.userData.wechatId}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* 二维码名片 */}
          <View style={styles.listItem}>
            <Text style={styles.listItemLeftText}>二维码名片</Text>
            <View style={styles.rightContainer}>
              <Image
                style={[styles.listItemRight, styles.qrcodeImg]}
                source={require('../../assets/images/ic_qr_code.png')}
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* 更多 */}
          <View style={styles.listItem}>
            <Text style={styles.listItemLeftText}>更多</Text>
          </View>

          {/* 间距 */}
          <View style={{ height: 20, width: width }} />

          {/* 我的地址 */}
          <View style={styles.listItem}>
            <Text style={styles.listItemLeftText}>我的地址</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  titleBar: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 15,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: '#fff',
  },
  listItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  listItemLeftText: {
    color: '#000000',
    fontSize: 16,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  listItemRight: {
    alignItems: 'flex-end',
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  qrcodeImg: {
    width: 25,
    height: 25,
  },
  rightArrow: {
    width: 8,
    height: 14,
    marginLeft: 10,
  },
});
