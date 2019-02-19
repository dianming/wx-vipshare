Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    that.refreshUserList();
  },
  //获取当前滑块的index
  bindchange: function(e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  addAccount: function(e) {
    var that = this;
    console.log("添加账号");
    var userInfo = wx.getStorageSync("userInfo");
    e.detail.value.wxUserId = userInfo.id
    e.detail.value.nickName = userInfo.nickName
    e.detail.value.avatarUrl = userInfo.avatarUrl
    wx.request({
      url: 'http://192.168.31.214:8080/account/addAccount',
      data: e.detail.value,
      success(res) {
        var resData = res.data;
        if (resData.code == "200") {
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
  del: function(e) {
    const that = this;
    var obj = e.target.dataset
    wx.request({
      url: 'http://192.168.31.214:8080/account/del',
      data: {
        wxUserId: obj.wxuserid,
        id: obj.id
      },
      success(res) {
        that.refreshUserList();
      }
    })
  },
  getAccountInfo: function(e) {
    var that = this;
    var obj = e.target.dataset;
    wx.request({
      url: 'http://192.168.31.214:8080/account/getInfo',
      data: {
        id: obj.id
      },
      success(res) {
        var data = res.data.data;
        that.setData({
          info: data,
          currentData: 0
        })
      }
    })
  },
  // 刷新账号管理数据
  refreshUserList: function() {
    var that = this;
    var userInfo = wx.getStorageSync("userInfo")
    wx.request({
      url: 'http://192.168.31.214:8080/account/getByList',
      data: {
        wxUserId: userInfo.id
      },
      success(res) {
        console.log(res);
        if (res.data.code == "200") {
          that.setData({
            userRows: res.data.data
          })
        }
      }
    })
  },
  bindDateChange(e) {
    console.log(e);
    // var obj = new Object();
    // obj = e.currentTarget.dataset.info;
    // obj.endDate = e.detail.value;
    this.setData({
      // info: obj
      endDate:e.detail.value
    })
  }
})