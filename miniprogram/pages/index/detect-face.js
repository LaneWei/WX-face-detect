// 图片检测应用信息
const detectFacePath = 'https://api.ai.qq.com/fcgi-bin/face/face_detectface'
const APPID = 2124019129
const APPKEY = 'Xnk9VwIT58Ymn7XB'
const md5 = require('./md5.js')
const postRequest = require('./post-request.js');

// 字符串URL编码
const urlEncode = str => {
  str = encodeURIComponent(str)
  str = str.replace(/%20/gi, '')
  str = str.replace(/(!)|(')|(\()|(\))|(\~)/gi, item => {
    return '%' + item.charCodeAt(0).toString(16).toLocaleUpperCase();
  })
  return str
}

// 计算API调用请求签名
function getReqSign(params, appKey=APPKEY) {
  let paramsKeys = Object.keys(params).sort()
  let str = ''
  var key, value

  for (let i in paramsKeys) {
    key = paramsKeys[i]
    value = params[key]
    if(value !== '') {
      str += key + '=' + urlEncode(value) + '&'
    }
  }
  str += 'app_key=' + appKey
  str = md5(str).toUpperCase()
  return str
}

// 随机生成字符串
function randomString(len=32) {
  len = len || 32
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  let maxPos = chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}

// 检测
module.exports = function(base64Img) {
  let cur_time = Math.floor(new Date().getTime() / 1000)
  // 调用图片检测参数
  let dataDict = {
    'app_id': APPID,
    'image': base64Img,
    'mode': 0,
    // 随机字符串
    'nonce_str': randomString(),
    // 时间戳
    'time_stamp': cur_time,
    'sign': '',
  }
  // 计算请求签名
  dataDict['sign'] = getReqSign(dataDict)
  console.log('[detectFace] dataDict: ', dataDict)

  return postRequest(detectFacePath, dataDict)
}