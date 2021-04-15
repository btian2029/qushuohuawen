// app.js
App({
  onLaunch:function () {
    // this.hidetabbar();
    // this.getSystemInfo();
  
    // 展示本地存储能力
    wx.BaaS = requirePlugin('sdkPlugin')
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment)
 
     wx.BaaS.init('b74475f7389a8d7ead6c')
     wx.BaaS.auth.loginWithWechat() // 静默登录
    // 登录
     wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // onShow: function () {

  // },
  // hidetabbar() {
  //   wx.hideTabBar({
  //     fail: function() {
  //       setTimeout(function() { // 做了个延时重试一次，作为保底。
  //         wx.hideTabBar()
  //       }, 500)
  //     }
  //   });
  // },
// getSystemInfo: function() {
//     let t = this;
//     wx.getSystemInfo({
//       success: function(res) {
//         t.globalData.systemInfo = res;
//       }
//     });
//   },
  globalData: {
    userInfo: null
  }
})
