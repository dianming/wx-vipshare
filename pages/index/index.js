//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log("获取userInfo index页面")
    // var authUserInfoBoolean;
    // wx.getSetting({
    //   success: res => {
    //     console.log(res.authSetting);
    //     authUserInfoBoolean = res.authSetting['scope.userInfo']        
    //   }
    // })
    // console.log("userInfo授权状态" + authUserInfoBoolean);
    // if (!authUserInfoBoolean) {
    //   return;
    // };
    if(e.detail.userInfo == undefined){
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
      url: 'http://localhost:8080/login/login',
      data: e.detail.userInfo,
      success(res) {
        try {
          console.log("授权返回");
          console.log(res.data.data);
          wx.setStorageSync("userInfo", res.data.data)
        } catch (e) {}
      }
    })
  },
  reqCheckSign: function(e) {
    console.log(e.detail.value.signtext);
    wx.navigateTo({
      url: "/pages/account/account?id=1"
    });
  }
})