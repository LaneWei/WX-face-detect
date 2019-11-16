//index.js
const app = getApp()
// 文件管理器，用于获取图片
const fsManager = wx.getFileSystemManager()
// 图片检测函数
const detectFace = require('./detect-face.js')
// 检测结果处理函数
const handleResult = require('./handle-result.js')
// vant组件
import Toast from '../../vant-weapp/toast/toast'

const loadToastSelector = '#loading-toast'
const failToastSelector = '#fail-toast'

Page({
  data: {
    // 检测结果信息
    resultMsg: '',
    // 程序状态
    status: '',
    // 程序状态信息
    statusInfo: '',
    // 图片路径
    imgPath: 'https://img.yzcdn.cn/vant/cat.jpeg',
    
    testMsg: '',
  },

  setStatus: function(status, msg) {
    switch(status) {
      case 'detect':
        Toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          message: msg,
          loadingType: 'spinner',
          selector: loadToastSelector
        });
        this.setData({
          status: 'detect',
        })
        break
      case 'success':
        Toast.clear()
        this.setData({
          status: 'success',
          resultMsg: msg
        })
        break
      case 'fail':
        Toast.clear()
        Toast.fail({
          message: msg,
          duration: 3000,
          selector: '#fail-toast'
        })
        this.setData({
          status: 'fail',
          statusInfo: msg
        })
        break
      case 'error':
        Toast.clear()
        Toast.fail({
          message: msg,
          duration: 3000,
          selector: '#fail-toast'
        })
        this.setData({
          status: 'error',
          statusInfo: msg
        })
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

  // 清除之前的输出
  resetStatus: function() {
    Toast.clear()
    this.setData({
      status: '',
      resultMsg: '',
      imgPath: '',
      statusInfo: ''
    })
  },

  // 展示图片
  displayImg: function(path) {
    this.setData({
      imgPath: path,
    })
  },

  // 上传图片，调用腾讯云API获取结果
  uploadImg: function() {
    this.chooseImg().then(res => {
      const filePath = res.tempFilePaths[0]
      const base64Img = fsManager.readFileSync(filePath, 'base64')
      console.log('[uploadImg] 成功获取图片路径: ' + filePath)

      // 显示图片
      this.resetStatus()
      this.displayImg(filePath)

      // 调用检测API
      this.setStatus('detect', '图片检测中')
      return detectFace(base64Img)
    }).then(reqRes => {
      // 处理检测结果
      const data = reqRes.data
      const msg = handleResult(data)
      if(data.ret === 0) {
        console.log('[uploagImg] 检测结果: ', data.data.face_list)
        this.setStatus('success', msg) 
      }
      else {
        console.log('[uploagImg] 检测返回码: ', data.ret)
        this.setStatus('fail', msg)
      }
    }).catch(err => {
      console.error(err)
    })
  },
})
