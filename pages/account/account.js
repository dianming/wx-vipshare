Page({
  data: { // 参与页面渲染的数据
    logs: [],
    urlimg: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKrOicBUen9JgkvfeBVTGy6H4nZXj6DaQZfRa59vqx8mA9dUdqd7zqE2e6p4Ifg4v1YHIMVWEvenUA/132"
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
    console.log("添加账号");
    var userInfo = wx.getStorageSync("userInfo");
    e.detail.value.status = 0;
    e.detail.value.wxUserId = userInfo.id
    e.detail.value.nickName = userInfo.nickName
    e.detail.value.avatarUrl = userInfo.avatarUrl
    console.log(e.detail.value);
    var result;
    wx.request({
      url: 'http://192.168.31.214:8080/account/add',
      data: e.detail.value,
      success(res) {
        console.log("添加完成");
        console.log(res);
        wx.navigateTo({
          url: "/pages/accountList/accountList"
        });
      }
    })
  },
  bindDateChange(e) {
    console.log(e);
    this.setData({
      startDate: e.detail.value
    })
  }
})