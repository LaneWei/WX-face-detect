function getAgeText(age) {
  return "age: " + age
}

function getBeautyText(beauty) {
  return "beauty: " + beauty
}

function getGlassText(glass) {
  return "glass: " + glass
}

function getGenderText(gender) {
  return "gender: " + gender
}

function getExpressionText(expression) {
  return "expression: " + expression
}

function getExtText(info) {
  return "info: " + info
}

// 常见错误
const retCodeToMsg = {
  9: '服务器繁忙',
  16396: '图片格式错误',
  16397: '图片体积过大',
  16402: '人脸检测失败',
  16404: '人脸检测失败',
  16415: '图片为空'
}
function parseRetCode(retCode) {
  if(retCode < 0) {
    return '系统异常'
  }
  else if(retCode in retCodeToMsg) {
    return retCodeToMsg[retCode]
  }
  else {
    return '小程序异常'
  }
}

module.exports = function(data) {
  const retCode = data.ret
  let msg = ''

  // 检测成功
  if (data.ret === 0) {
    // 处理检测结果，只处理第一个人的结果
    const detect_result = data.data.face_list[0]
    // 年龄
    const age = detect_result.age
    // 魅力
    const beauty = detect_result.beauty
    // 微笑
    const expression = detect_result.expression
    // 性别（0-女，100-男）
    const gender = detect_result.gender
    // 眼镜
    const glass = detect_result.glass

    msg += getAgeText(age) + ", "
    msg += getBeautyText(beauty) + ", "
    msg += getExpressionText(expression) + ", "
    msg += getGenderText(gender) + ", "
    msg += getGlassText(glass) 
  }
  // 检测失败
  else {
    msg = parseRetCode(retCode)
  }
  return msg
}
