// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
   // motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  // 事件处理函数
 bindViewTap () {
    wx.switchTab({
      url: '../index/index'
    })
  }, 
 /* tip:function(){
    wx.showModal({
      title: '提示',
            content: '授权成功',
            showCancel: false, //是否显示取消按钮-----》false去掉取消按钮
            cancelText: "否", //默认是“取消”
            cancelColor: 'skyblue', //取消文字的颜色
            confirmText: "是", //默认是“确定”
            confirmColor: 'skyblue', //确定文字的颜色
      success: function (res) {
        if (res.confirm) {
         console.log(userInfo)
       }
      }
    })
  },*/
  onLoad() {
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
  
  getUserInfo(e) {
  
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })},
    
      createUser(e) { 
        let wechatId = userInfo.openId
        let Users = new wx.BaaS.TableObject('userInfor') //实例化对应 tableName 的数据表对象
        let user = Users.create() // 创建一条记录
        book.set({wechatId})
          .save()
          .then(() => {
            //...
          })
        
    },
  
  
  createUser(e) { 
    let wechatId = userInfo.openId
    let Users = new wx.BaaS.TableObject('userInfor') //实例化对应 tableName 的数据表对象
    let user = Users.create() // 创建一条记录
    book.set({wechatId})
      .save()
      .then(() => {
        //...
      })
    }
  })
  