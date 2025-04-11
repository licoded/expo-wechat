// ImagePickerProvider.js
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { post } from '../utils/AxiosUtil';

/**
 * @component ImagePickerProvider
 * @description 图片选择器组件，支持选择及上传图片，并通过 render props 提供相关方法
 *
 * @param {Object} props - 组件属性
 * @param {boolean} props.allowsEditing - 是否允许编辑图片，默认为true
 * @param {boolean} props.allowsMultipleSelection - 是否允许多选图片，默认为false
 * @param {number} props.selectionLimit - 多选时的图片数量限制，设置为0表示系统支持的最大选择限制，默认为1
 * @param {Function} props.beforeUpload - 上传前的处理函数，返回处理后的图片数组或者假值(取消上传)
 * @param {boolean} props.autoUpload - 是否自动上传图片，默认为true
 * @param {string} props.uploadUrl - 图片上传的接口地址
 * @param {Function} props.onSuccess - 上传成功后的回调函数，参数为上传结果数组
 *
 * @returns {React.ReactNode} - 返回一个包含相关方法的组件
 * @method selectImages - 选择图片
 * @method uploadImages - 上传图片
 * @method clearImages - 清空图片
 * @property selectedImages - 已选择的图片
 */
export class ImagePickerProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImages: [],
    };
  }

  selectImages = async () => {
    const {
      allowsEditing = true,
      allowsMultipleSelection = false,
      selectionLimit = 1,
      beforeUpload,
      autoUpload = true,
      uploadUrl,
      onSuccess,
    } = this.props;

    // 选择图片
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing,
      allowsMultipleSelection,
      selectionLimit,
    });

    if (result.canceled) return;

    let selectedAssets = result.assets || [];

    // 上传前处理：如果beforeUpload返回假值，则不继续上传
    if (beforeUpload && typeof beforeUpload === 'function') {
      const processedAssets = await beforeUpload(selectedAssets);
      if (!processedAssets) return;
      selectedAssets = processedAssets;
    }

    // 更新值
    this.setState({ selectedImages: selectedAssets });

    // 自动上传
    if (autoUpload && uploadUrl) {
      this.uploadImages(selectedAssets, uploadUrl, onSuccess);
    }
  };

  // 上传方法
  uploadImages = async (
    images = this.state.selectedImages,
    url = this.props.uploadUrl,
    callback = this.props.onSuccess,
  ) => {
    if (!url || images.length === 0) return;

    const uploadPromises = images.map(async (image) => {
      const formData = new FormData();
      formData.append('file', image.file);

      try {
        const data = await post(url, formData);
        // TODO: 上传头像接口并未返回上传后的路径或文件名，沿用kamaChat中的拼接方式
        return data || '/static/avatars/' + image.fileName;
      } catch (error) {
        console.error('上传图片失败:', error);
      }
    });

    const results = await Promise.all(uploadPromises);
    console.log('uploadImages Promise.all results', results);

    if (callback && typeof callback === 'function') {
      callback(results);
    }

    return results;
  };

  clearImages = () => {
    this.setState({ selectedImages: [] });
  };

  render() {
    return this.props.children({
      selectImages: this.selectImages,
      uploadImages: this.uploadImages,
      clearImages: this.clearImages,
      selectedImages: this.state.selectedImages,
    });
  }
}
