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
  addAccount: function(e) {
    var that = this;
    console.log("添加账号");
    var userInfo = wx.getStorageSync("userInfo");
    e.detail.value.status = 0;
    e.detail.value.wxUserId = userInfo.id
    e.detail.value.nickName = userInfo.nickName
    e.detail.value.avatarUrl = userInfo.avatarUrl
    console.log(e.detail.value);
    if (this.validForm(e)) {
      return;
    }
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
  validForm: function(e) {
    console.log("校验表单");
    var objForm = e.detail.value;
    var videoBool = false,
      userBool = false,
      pwdBool = false,
      endDateBool = false
    if (objForm.videoName.trim() == "") {
      videoBool = true;
    }
    if (objForm.user.trim() == "") {
      userBool = true;
    }
    if (objForm.pwd.trim() == "") {
      pwdBool = true;
    }
    if (objForm.endDate.trim() == "") {
      endDateBool = true;
    }
    this.setData({
      videoNameValid: videoBool,
      userValid: userBool,
      pwdValid: pwdBool,
      endDateValid: endDateBool
    });
    if (videoBool || userBool || pwdBool || endDateBool) {
      return true;
    }
    return false;
  },
  bindDateChange(e) {
    console.log(e);
    this.setData({
      endDate: e.detail.value
    })
  }
})