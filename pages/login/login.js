// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
   // motto: 'Hello World',
   
   userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')

  },
  // 事件处理函数

  //按钮进行页面跳转
 bindViewTap () {
  app.globalData.userInfo = this.data.userInfo
  console.log(app.globalData.userInfo)
    wx.switchTab({
      url: '../index/index',
    })
  }, 
  Allow(){
    wx.navigateTo({
      url: '../infoCollection/info'
    })
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
      console.log("hasUserInfo:"+this.data.hasUserInfo)
    }
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    console.log(this.data.userInfo)
    

  }

  //   bindGetUserInfo: function (e) {
  //     if (e.detail.userInfo) {
  //         //用户按了允许授权按钮
  //         var that = this;
  //         //插入登录的用户的相关信息到数据库
  //         wx.request({
  //             url: app.globalData.urlPath + 'user/add',
  //             data: {
  //                 openid: getApp().globalData.openid,
  //                 nickName: e.detail.userInfo.nickName,
  //                 avatarUrl: e.detail.userInfo.avatarUrl,
  //                 province:e.detail.userInfo.province,
  //                 city: e.detail.userInfo.city
  //             },
  //             header: {
  //                 'content-type': 'application/json'
  //             },
  //             success: function (res) {
  //                 //从数据库获取用户信息
  //                 that.queryUsreInfo();
  //                 console.log("插入小程序登录用户信息成功！");
  //             }
  //         });
  //         //授权成功后，跳转进入小程序首页
  //         wx.navigateTo({
  //             url: '/pages/infoCollection/info'  
  //         })
          
  //     } else {
  //         //用户按了拒绝按钮
  //         wx.showModal({
  //             title:'警告',
  //             content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
  //             showCancel:false,
  //             confirmText:'返回授权',
  //             success:function(res){
  //                 if (res.confirm) {
  //                     console.log('用户点击了“返回授权”')
  //                 } 
  //             }
  //         })
  //     }
  // },
    
  
  //   queryUsreInfo: function () {
  //     wx.request({
  //         url: app.globalData.urlPath + 'user/userInfo',
  //         data: {
  //             openid: app.globalData.openid
  //         },
  //         header: {
  //             'content-type': 'application/json'
  //         },
  //         success: function (res) {
  //             console.log(res.data);
  //             getApp().globalData.userInfo = res.data;
  //         }
  //     });
  // },

  })
  
