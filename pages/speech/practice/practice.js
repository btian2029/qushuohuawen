// pages/speech/practice/practice.js
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:"",
    name:"",
    tip:false,
    level:"难"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    // console.log(JSON.parse(options.dataList))
   
  
    this.setData({
      dataList:JSON.parse(options.dataList)
    })
    console.log(this.data.dataList)
    console.log(this.data.dataList.topic)
    
  }, 
  showTips() {
    this.setData({
      tip: !this.data.tip,
     
    })


  },

  start: function () {

    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },

  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },

  //播放声音
  play: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.tempFilePath,
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  finish:function(){
    

    let tableName = 'speech_trace'
     

      
    wx.navigateTo({
      url: 'finish/finish',
    })
    this.createRecord();
  },

  createRecord(){

    console.log(this.tempFilePath)
    let record = this.tempFilePath;

    let object = new wx.BaaS.TableObject('speech_trace') 
    let speech = object.create() // 创建一条记录
    
    speech.set({record})

      .save()
      .then(() => {
        //...
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})