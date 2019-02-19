//app.js
App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'http://192.168.31.214:8080/login/getOpenId',
          data: {
            code: res.code
          },
          success(res) {
            try {
              wx.setStorageSync("openId", res.data.data.openid)
            } catch (e) {}
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
              success: res => {
                res.userInfo.openId = wx.getStorageSync("openId")
                wx.setStorageSync("userInfo", res.userInfo);
                console.log(this.globalData.userInfo);
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            }),
            wx.request({
              url: 'http://192.168.31.214:8080/login/login',
              data: wx.getStorageSync("userInfo"),
              success(res) {
                try {
                  console.log("刷新 userInfo");
                  wx.setStorageSync("userInfo", res.data.data)
                  console.log(res.data.data);
                } catch (e) {}
              }
            })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})