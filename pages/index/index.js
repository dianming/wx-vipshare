//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    isVip: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    console.log("onLoad");
    console.log(wx.getStorageSync("userInfo"));
    var userInfoCache = wx.getStorageSync("userInfo")
    var vip = userInfoCache.vip == 1 ? true : false;
    if (vip) {
      wx.reLaunch({
        url: "/pages/accountList/accountList"
      })
    }
  },
  getUserInfo: function(e) {
    console.log("获取userInfo index页面")

    if (e.detail.userInfo == undefined) {
      return;
    }
    // 全局缓存
    app.globalData.userInfo = e.detail.userInfo
    // 局部
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    e.detail.userInfo.openId = wx.getStorageSync("openId")
    // 请求
    wx.request({
      url: 'http://192.168.31.214:8080/login/login',
      data: e.detail.userInfo,
      success(res) {
        try {
          console.log("授权返回");
          console.log(res.data.data);
          wx.setStorageSync("userInfo", res.data.data)
          var vip = res.data.data.vip == 1;
          if (vip) {
            wx.reLaunch({
              url: "/pages/accountList/accountList"
            })
          }
          this.setData({
            userInfo: userInfoCache,
            hasUserInfo: false,
            isVip: vip
          })
        } catch (e) {}
      }
    })

  },
  reqCheckSign: function(e) {
    console.log(e.detail.value.signtext);
    var userInfoCache = wx.getStorageSync("userInfo")
    wx.request({
      url: 'http://192.168.31.214:8080/login/sign',
      data: {
        id:userInfoCache.id,
        code:e.detail.value.signtext
      },
      success(res) {
        if(res != null && res.data.code == "200"){
          wx.reLaunch({
            url: "/pages/accountList/accountList"
          });
        }
        
      }
    })

  }
})