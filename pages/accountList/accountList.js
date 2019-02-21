// pages/account/accountList.js

const urls = require('../../utils/urls.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var userInfo = wx.getStorageSync("userInfo")
    if (userInfo == null || userInfo.vip != 1) {
      that.toIndex();
    }
    // 授权检查
    wx.getSetting({
      success: (res) => {
        console.log("授权---" + res.authSetting['scope.userInfo']);
        if (!res.authSetting['scope.userInfo']) {
          that.toIndex();
        }
      }
    })
    this.refreshList(userInfo);
    wx.getLocation({
      type: 'wgs84',
      success(res) {}
    })

  },
  refreshList: function(userInfo) {
    var that = this;
    wx.request({
      url: urls.accountListGetList,
      data: {
        id: userInfo.id
      },
      success(res) {
        console.log("列表");
        var result = res.data.data;
        that.setData({
          listData: result
        })
      }
    })
  },
  toIndex: function() {
    wx.clearStorageSync();
    wx.reLaunch({
      url: '/pages/index/index'
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
    wx.showNavigationBarLoading()
    var userInfo = wx.getStorageSync("userInfo")
    this.refreshList(userInfo)
    wx.hideNavigationBarLoading()

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

  },
  getAccount(e) {
    var that = this;
    var accountId = e.currentTarget.dataset.id;
    console.log("获取位置信息才可继续");

    //判断是否获得了用户地理位置授权
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          that.openConfirm()
        }
      }
    })

    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log("位置信息");
        console.log(res);
        res.accountId = accountId
        wx.navigateTo({
          url: '/pages/accountShow/accountShow?detail=' + JSON.stringify(res)
        })
      }
    })

  },
  openConfirm: function() {
    wx.showModal({
      content: '检测到您没打开定位权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function(res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (res) => {}
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },

})