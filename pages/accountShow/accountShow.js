// pages/accountShow/accountShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 授权检查
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo'])
          wx.reLaunch({
            url: '/pages/index/index'
          })
      }
    })
    var that = this;
    console.log("获取跳转来的参数");
    console.log(options);
    var detail = JSON.parse(options.detail)
    var userInfo = wx.getStorageSync("userInfo")
    console.log("使用账号获取缓存信息");
    console.log(userInfo);
    detail.wxUserId = userInfo.id
    detail.nickName = userInfo.nickName
    detail.avatarUrl = userInfo.avatarUrl

    wx.request({
      url: 'http://localhost:8080/account/use',
      data: detail,
      success(res) {
        console.log("获取账号信息");
        console.log(res);
        that.setData({
          accountInfo: res.data.data
        });
      }
    })
  },
  copyAccount(e) {
    console.log("copy账号");
    console.log(e);
    wx.setClipboardData({
      data: e.currentTarget.dataset.account,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log("copy结果")
            console.log(res)
          }
        })
      }
    })
  },
  copyPwd(e) {
    console.log("copy密码");
    console.log(e);
    wx.setClipboardData({
      data: e.currentTarget.dataset.pwd,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log("copy结果")
            console.log(res)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})