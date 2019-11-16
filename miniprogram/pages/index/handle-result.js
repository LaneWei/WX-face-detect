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

function getmessage(detect_result) {
  let msg = ''
  if (detect_result.gender == 0) {
    msg = msg + "女，"
    msg = msg + detect_result.expression + "岁，"

    if (detect_result.glass == 0) {
      msg = msg + "没带眼镜，"
    }
    else {
      msg = msg + "戴眼镜，"
    }

    if (detect_result.expression <= 20) {
      msg = msg + "表情平和，"
    } else if (detect_result.expression > 20 && detect_result.expression < 50) {
      msg = msg + "面带微笑，"
    } else {
      msg = msg + "笑容灿烂，"
    }

    if (detect_result.beauty >= 80) {
      msg = msg + "颜值已经突破了天际!"
    } else if (detect_result.beauty < 80 && detect_result.beauty >= 60) {
      msg = msg + "沉鱼落雁，闭月羞花"
    } else if (detect_result.beauty < 60 && detect_result.beauty >= 40) {
      msg = msg + "天生丽质"
    } else {
      if (detect_result.age <= 30) {
        msg = msg + "很有气质的女孩子"
        if (detect_result.expression >= 30) {
          msg = msg + "笑起来特别好看"
        }
      } else {
        msg = msg + "气质小女人"
      }
    }

  }
  else {
    msg = msg + "男，"
    msg = msg + detect_result.age + "岁，"
    if (detect_result.glass == 0) {
      msg = msg + "没戴眼镜，"
    } else {
      msg = msg + "戴眼镜，"
    }

    if (detect_result.expression <= 20) {
      msg = msg + "表情平和，"
    } else if (detect_result.expression > 20 && detect_result.expression < 50) {
      msg = msg + "面带微笑，"
    } else {
      msg = msg + "笑容灿烂，"
    }

    if (detect_result.beauty >= 80) {
      if (detect_result.age <= 35) {
        msg = msg + "陌上人如玉，公子世无双，真是潇洒美少年"
      } else {
        msg = msg + "帅哥老了也是风度翩翩的英俊大叔"
      }
    } else if (detect_result.beauty < 80 && detect_result.beauty >= 40) {
      if (detect_result.age <= 35) {
        msg = msg + "小伙子挺帅气的"
      } else {
        msg = msg + "看得出大叔也是有几分魅力，年轻时也是个帅小伙子"
      }
    } else {
      if (detect_result.age < 30) {
        msg = msg + "颜值正在发育中，以后可能会更好"
      } else {
        msg = msg + "岁月是把杀猪刀，多读书吧"
      }
    }
  }
  return msg
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

    msg = getmessage(detect_result)
  }
  // 检测失败
  else {
    msg = parseRetCode(retCode)
  }
  return msg
}
