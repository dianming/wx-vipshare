
const urls = require('../../utils/urls.js');

Page({
  data: { // 参与页面渲染的数据
    
  },
  onLoad() {
    // 授权检查
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo'])
          wx.reLaunch({
            url: '/pages/index/index'
          })
      }
    })
    // 页面渲染后 执行
    console.log("onLoad");
  },
  onReady() {
    console.log("onReady");
  },
  flushtest() {
    console.log("刷新数据");
  },
  addAccount(e) {
    var that = this;
    console.log("添加账号");
    var userInfo = wx.getStorageSync("userInfo");
    e.detail.value.status = 0;
    e.detail.value.wxUserId = userInfo.id
    e.detail.value.nickName = userInfo.nickName
    e.detail.value.avatarUrl = userInfo.avatarUrl
    console.log(e.detail.value);
    var result;
    wx.request({
      url: urls.accountAdd,
      data: e.detail.value,
      success(res) {
        console.log("添加完成");
        console.log(res);
        var resData = res.data;
        if (resData.code == "200") {
          wx.setStorageSync("userInfo", resData.data)
          wx.reLaunch({
            url: "/pages/accountList/accountList"
          });
        } else {
          that.setData({
            codeError: true
          })
        }
      }
    })

  },
  bindDateChange(e) {
    console.log(e);
    this.setData({
      endDate: e.detail.value
    })
  }
})