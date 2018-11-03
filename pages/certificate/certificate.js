import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
const wxUploadFile = promisify(wx.uploadFile)

Page({
  data: {
    images: []
  },

  onLoad(options) {
    $init(this)
  },

  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下1张照片
        this.data.images = images.length <= 5 ? images : images.slice(0, 5)
        $digest(this)
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],//当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  submitForm(e) {
    const arr = []
    for (let path of this.data.images) {
      console.log(path)
      wx.cloud.uploadFile({
        cloudPath: 'upload/22.jpg',
        filePath: path, // 小程序临时文件路径
      }).then(res => {
        // get resource ID
        console.log(res)
        arr.push(res.fileID)
      }).catch(error => {
        // handle error
        console.log(error)
      })
    }
  }
})