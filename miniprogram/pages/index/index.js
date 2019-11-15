//index.js
const app = getApp()
// 文件管理器，用于获取图片
const fsManager = wx.getFileSystemManager()
// 图片检测函数
const detectImg = require('./detect-face.js')

Page({
  data: {
    // 输出信息
    resultMsg: '',
    // 程序状态
    status: '',
    // 程序状态信息
    statusInfo: '',
    // 图片路径
    imgPath: '',
    
    testMsg: '',
  },

  setStatus: (status, msg) => {
    switch(status) {
      case 'upload':
        break
      case 'detect':
        break
      case 'success':
        break
      case 'fail':
        break
    }
  },

  // 从相册或相机选择图片
  chooseImg: function(){
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: res => resolve(res),
        fail: err => reject(err),
      })
    })
  },

  // 上传图片，调用腾讯云API获取结果
  uploadImg: function() {
    this.chooseImg().then(res => {
      const filePath = res.tempFilePaths[0]
      console.log('[uploadImg] 成功获取图片路径: ' + filePath)

      // 显示图片
      this.setData({
        imgPath: filePath,
      })

      // 调用检测API
      let base64Img = fsManager.readFileSync(filePath, 'base64')
      return detectImg(base64Img)
    }).then(reqRes => {
      let data = reqRes.data
      console.log(reqRes)
      console.log(data)
      this.setData({
        testMsg: data.msg
      })
      // 处理检测结果
    }).catch(err => {
      //console.error(err)
    })
  },
})
