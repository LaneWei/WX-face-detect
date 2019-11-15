module.exports = function(path, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: path,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: res => {
        resolve(res)
      },
      fail: e => {
        reject(e)
      }
    })
  })
}