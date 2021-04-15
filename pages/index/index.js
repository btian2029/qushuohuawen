// pages/index/index.js
//index.js
//获取应用实例
const app = getApp()
var dub_url = "/pages/dub/dub"
var followUp_url = "/pages/followUp/followUp"
var dialogueSimulation_url = "/pages/dialogueSimulation/dialogueSimulation"
var mockSpeech_url = "/pages/mockSpeech/mockSpeech"
Page({
//index.js  
//获取应用实例  
  data: {  
    Carousel:[
      {url:'/images/Carousel/Carousel_1.png'} ,  
      {url:'/images/Carousel/Carousel_2.png'} ,  
      {url:'/images/Carousel/Carousel_3.png'} ,   
    ],
    func:[
      {
        id:"1",
        name:"朗读者——课文跟读",
      },

      {
        id:"2",
        name:"声临其境——趣味配音",
      },

      {
        id:"3",
        name:"AI有约——对话模拟",
      },

      {
        id:"4",
        name:"开讲了——模拟演讲",
      }
    ],
    imgheights:[],
    current:0,
    //自定义tabbar
    // listInfo: [{
    //   text: '首页',
    //   imgUrl: '/images/icon/icon_shouye.png',
    //   curUrl: '/images/icon/icon_shouye.png',
    // },
    // {
    //   text: '圈子',
    //   imgUrl: '/images/icon/icon_quanzi.png',
    //   curUrl: '/images/icon/icon_quanzi.png',
    // },
    // {
    //   text: '我的',
    //   imgUrl: '/images/icon/icon_mine_unsel.png',
    //   curUrl: '/images/icon/icon_mine.png',
    // }]
  },  
  onLoad: function () {
    // app.editTabbar();  
  },

/**
 * 四个按钮功能
 *  
 */
  switch_function:function(e) {
    console.log(e)
    console.log("switch_funtion")
    var id = e.currentTarget.id
    if (id == "1"){
      wx.showToast({
        title: '功能还在开发中',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      // wx.navigateTo({
      //   url: followUp_url,
      // })
    }else if(id == "2"){
      wx.navigateTo({
        url: dub_url,
      })
    }else if(id == "3"){
      wx.navigateTo({
        url: dialogueSimulation_url,
      })
    }else if(id == "4"){
      wx.showToast({
        title: '功能还在开发中',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      // wx.navigateTo({
      //   url: mockSpeech_url,
      // })
    }

  },
  // chooseImg: function(e) {
  //   var that = this
  //   this.setData({
  //     curIdx: e.currentTarget.dataset.current
  //   })
  //   console.log("kk", e.currentTarget.dataset.current)
  //   if (e.currentTarget.dataset.current == 0) {
  //     wx.switchTab({
  //       url: '/pages/index/index',
  //     })
  //   } else if (e.currentTarget.dataset.current == 1) {
  //     wx.switchTab({
  //       url: '/pages/moments/moments',
  //     })
  //   } else if (e.currentTarget.dataset.current == 2) {
  //     wx.switchTab({
  //       url: '/pages/mine/mine',
  //     }) 
  //   }
  //   that.onShow();
  // },
  // onLoad: function(options) {
  //   var curIdx = 0
  //   this.setData({
  //     curIdx: curIdx,
  //   })

  // },
  // onShow: function() {
  //   this.onLoad();
  // },
  
  /**
   * 自定义toast
   *  
   */
  // toast提示按钮点击事件
  // toastClick:function(e){
  //   this.toastShow();//Toast弹窗
  // },
 
  // // 显示toast
  // toastShow: function (event) {
  //   console.log("触发了点击事件，弹出toast")
  //   status = false
  //   this.setData({ status: status })//setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
  // },
 
  // // 隐藏toast
  // toastHide: function (event) {
  //   console.log("触发bindchange，隐藏toast")
  //   status = true
  //   this.setData({ status: status })
  // },
  // data: {
  //   status: status//data里面的属性可以传递到视图
  // },

  imgload:function(e){
  console.log(wx.getSystemInfoSync().windowWidth)
  var imgheight = e.detail.height;
  var imgwidth = e.detail.width;
  var bl = imgheight / imgwidth;
  var sjgd = bl * (wx.getSystemInfoSync().windowWidth);
  var hs = this.data.imgheights;
  console.log(e);
  console.log(sjgd);
  hs[e.target.dataset.id] = sjgd;
  this.setData({imgheights:hs});
  },
  
  bindchange: function (e) {
  
  // console.log(e.detail.current)
  
  this.setData({ current: e.detail.current })
  
  },

})
 
