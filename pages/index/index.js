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
    show:false,
    //今日是否打开，每日的日期和数据比对，如果有就返回true，这里修改了组件
    ornot:false,
    date:"",
    confirm_text:"打卡",
  },  
  onLoad: function () {
  },
  //日历开关
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  //日期获取
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  // 打卡
  onConfirm(event){
    if(!this.data.ornot){
      this.setData({
        date: this.formatDate(event.detail),
        ornot:true,
        confirm_text:"今日已打卡"
    });
    console.log(this.data.date)
    }
    else{
      wx.showToast({
        title: '今天已经打过卡了',
        icon:'none',
        duration:1000
      })
    }
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
    }

  },


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
 
