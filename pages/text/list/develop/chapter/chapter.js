// pages/chapter7/chapter7.js


const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
var app=new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    voices: [], //音频数组  
    // 默认按住录音
    recod_name: "长按录制",
    start_time: "",
    // 录制最终时间
    speck_time: 0,
    //存储计时器
    setInter: '',
    num: 1,
    show: false,
    chapter7:[

    ],
    chapter:{},
    
    current:0,
  
   record:[]

  },

  swiperchange(event) {
    var that = this;
    var current = this.data.current
    that.setData({
      current: event.detail.current
    })
    console.log(current)
  },

  finish(){

   this.createRecord();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      chapter:JSON.parse(options.dataList)
    })
    console.log(this.data.chapter)



     
  },

    //播放声音
    play: function () {
      var current = this.data.current
      var record = this.data.chapter.sentence_record
      // console.log(this.data.chapter.sentence_record)
      // console.log(current)
      innerAudioContext.autoplay = true
      innerAudioContext.src = record[current],
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    },
  


   
    /**
     * 长按录音开始
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
  touchdown: function (e) {
    var that = this;
    console.log('手指按下')
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.record']) {
          //将计时器赋值给setInter
          that.data.setInter = setInterval(
            function () {
              var speck_time = parseInt(that.data.speck_time + 1);
              that.setData({
                speck_time: parseInt(speck_time),
                recod_name: "松开停止",
                recod_color: "#fff"
              });
              var times = 0;
              times = speck_time / 60 * 100;
              console.log("time", times);
              that.setData({
                times: times
              })
 
              if (that.data.speck_time > 0 && that.data.speck_time <= 59) {
                that.start();
              } else {
                clearInterval(that.data.setInter);
                // 获取到结束时间
                that.stop();
                that.setData({
                  recuod_id: 2,
                })
                wx.showToast({
                  title: '录音最长60S哦！',
                  duration: 2000,
                  icon: "none"
                })
              }
            }, 1000);
        } else {
          return;
        }
      }
    })
  },
  //手指抬起  
  touchup: function () {
    var that = this;
    console.log("手指抬起", that.data.speck_time)
    clearInterval(that.data.setInter);
    // 获取到结束时间
    that.stop();

    if (that.data.speck_time > 3) {
      //清除计时器  即清除setInter
      clearInterval(that.data.setInter);
      // 获取到结束时间
      that.stop();
      that.setData({
        recuod_id: 2,
        // isSpeaking: false,
        recod_name: "长按录制",
        recod_color: "#333",
      })
    } else {
      //清除计时器  即清除setInter
      clearInterval(that.data.setInter);
      // 获取到结束时间
      that.stop();
      wx.showToast({
        title: '时间过短，请重新录制',
        duration: 2000,
        icon: "none"
      })
      that.setData({
        recuod_id: 1,
        // isSpeaking: false,
        recod_name: "长按录制",
        recod_color: "#333",
        speck_time: "0",
      })
    }
 
  },
 
  btn_show: function () {
    this.setData({
      recuod_id: 1,
      speck_time: 0
    })
    wx.stopVoice();
  },
  //开始录音的时候
  start: function () {
    const options = {
      duration: 60000, //指定录音的时长，单位 ms
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
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
  //播放声音
  btn_play: function () {
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = this.tempFilePath,
    //   innerAudioContext.onPlay(() => {
    //     console.log('开始播放')
    //   })
    // innerAudioContext.onError((res) => {
    //   console.log("播放失败",res.errMsg)
    //   console.log(res.errCode)
    // })
    innerAudioContext.src = this.tempFilePath,
      innerAudioContext.play()
 
  },
  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      this.data.formFile = res.tempFilePath;
      this.data.formFileID = 1;
      console.log('停止录音', res.tempFilePath)
      console.log('现在是第几句：',this.data.current)
      var index = "record[" + this.data.current + "].number";
      this.setData({
        [index]:res.tempFilePath
      })
      console.log(this.data.record)
      console.log(this.data.record.length)
      console.log(this.data.chapter.paragraph_total)
     
    })
  },

  createRecord(){
     let sentenceRecord = this.data.record
     if(sentenceRecord.length < this.data.chapter.paragraph_total){
      wx.showToast({ //文字提示框
        title: '请完成所有句子学习',
        icon:'none',
        duration: 2000
       })
     }
     else{
    let Object = new wx.BaaS.TableObject('text_trace') 
    let text = Object.create() // 创建一条记录
      let obj1 = {a:tempfile}
    text.set('sentenceRecord',[obj1])

      .save()
      .then(() => {
        //...
      })
      wx.navigateTo({
        url: 'finish/finish',
      })
    }
  },
  // 保存录制
  btn_save: function () {
    var that = this;
    wx.showToast({
      title: '保存成功',
      icon: "none",
      duration: 2000
    })
    console.log(that.data.list.filePath);
  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

  
})