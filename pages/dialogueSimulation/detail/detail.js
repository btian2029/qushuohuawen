// pages/dialogueSimulation/detail/detail.js
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record_name:'长按录音',
    show_select:'',
    topic:'',
    talk_material:'',
    inform:'',
    // 完成句子数，初始设定为2
    done_record:2,
    // 总句数
    sentenceTotal:'',
    //折叠面板
    showIndex:65535,
    // 录音数组
    record:[],
    record_temp:[],
    tmpfile:'',
    current:0,
    //评测数组
    evaluating:[],
    index:0,
    start_time: "",
    // 录制最终时间
    times:0,
    speck_time: 0,
    //存储计时器
    setInter: '',
    finish:false,

  },

  finish(){
    this.setData({
      finish:true
    })
  },
  //关闭弹出层
  onClose() {
    this.setData({ finish: false });
  },

  //popup 之后的选择，模拟或者练习
  practice:function(e){
    innerAudioContext.stop()
    var that = this;
    console.log("选取id",e.currentTarget)
    if(e.currentTarget.id == 1){
      wx.navigateBack({
        delta: 1,
      })
    }
    if(e.currentTarget.id == 2){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

  // 折叠面板
  panel: function (e) {
    this.setData({
      index:e.currentTarget.dataset.index
    })
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 65535
      })
    }
    if (this.data.record_temp[e.currentTarget.dataset.index] !== undefined){
    var completion = Math.floor(Math.random() * (100 - 60)) + 60
    var fluency = Math.floor(Math.random() * (100 - 60)) + 60
    var accurancy = Math.floor(Math.random() * (100 - 60)) + 60
    var intonation = Math.floor(Math.random() * (100 - 60)) + 60
    var json = {
      completion: completion, 
      fluency:fluency,
      accurancy: accurancy,
      intonation: intonation
      }
    this.data.evaluating[this.data.index] = json
    // console.log(this.data.record_temp[this.data.index] !== undefined)
    
    this.setData({
      evaluating: this.data.evaluating,
    })
    
  }
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
  //播放标准音
  btn_play:function(e){
    var index = e.currentTarget.dataset.index
    innerAudioContext.stop()
    console.log(e.currentTarget)
    innerAudioContext.src = this.data.inform.splice_record_source[index]
    innerAudioContext.play()
    innerAudioContext.onPlay((res)=>{
      console.log("正在播放",res)
    })
  },
  // 播放用户录音
  play_myown:function(e){
    var index = e.currentTarget.dataset.index
    innerAudioContext.stop()
    console.log(e.currentTarget)
    innerAudioContext.src = this.data.record_temp[index]
    innerAudioContext.play()
    innerAudioContext.onPlay((res)=>{
      console.log("正在播放",innerAudioContext.src)
    })
  },

  //手指按下  
  touchdown: function (e) {
    var that = this;
    innerAudioContext.stop()
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
                record_name: "停止录制",
              });
              wx.showToast({
                title: '正在录制',
                icon:'none',
                duration: 2000
              })
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
                recorderManager.stop();   
                recorderManager.onStop((res) => {
                  that.setData({
                    tmpfile:res.tempFilePath
                  })
                
                that.setData({
                  record_permission: false,
                })
                wx.showToast({
                  title: '录音最长60S哦！',
                  duration: 2000,
                  icon: "none"
                })
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
    recorderManager.stop();   
    recorderManager.onStop((res) => {
      that.setData({
          tmpfile:res.tempFilePath
      })
    })
    if (that.data.speck_time > 3) {
      //清除计时器  即清除setInter
      clearInterval(that.data.setInter);
      // 获取到结束时间
      recorderManager.stop();   
      recorderManager.onStop((res) => {
        that.setData({
          tmpfile:res.tempFilePath
        })
      
      that.setData({
        record_permission: false,
        // isSpeaking: false,
        record_name: "长按录音",
        speck_time: "0"
      })
      let tableName = 'talk_trace'
      let addRecord = new wx.BaaS.TableObject(tableName)
      let add_record = addRecord.create()
      let MyFile = new wx.BaaS.File();
      console.log('tempfile',that.data.tmpfile)
      let fileParams = {filePath: that.data.tmpfile}
      if(that.data.record[that.data.current] == undefined){
      let uploadTask =  MyFile.upload(fileParams)
          // 文件成功上传的回调
      uploadTask.then(res=>{
          console.log('status',res.data)
            // 获得文件的id和path
          // that.data.remove_file[that.data.current] = res.data.file.id
          // this.setData({
          //   remove_file: that.data.remove_file
          // })
          // console.log('remove_file',that.data.remove_file)
    
          that.data.record[that.data.current] = res.data.path
          if(this.data.show_select == 1){that.data.record_temp[that.data.done_record - 2] = res.data.path}
          if(this.data.show_select == 2)
          {that.data.record_temp[that.data.done_record - 1] = res.data.path}
          that.setData({
            record:that.data.record
          })
          that.setData({
            record_temp:that.data.record_temp
          })
          console.log('record',that.data.record)
          console.log('record_temp',that.data.record_temp )
          // that.setData({
          //   start_time:res.data.created_at
          // })
          wx.showToast({
            title: '上传成功',
            icon: "none",
            duration: 2000
          })
          that.setData({
            current: that.data.current + 1
          }) 
          //输出下一句,保证done_record坐标在角色B上\
          console.log(that.data.done_record + 1)
          console.log(that.data.inform.record_order[that.data.done_record + 1 ])
          if (that.data.inform.record_order[that.data.done_record + 1 ] == "A"){
            if(that.data.show_select = 2){
              that.data.done_record = that.data.done_record + 3 
            }
            if(that.data.show_select = 1){
                that.data.done_record = that.data.done_record + 1
            }         
          }else{
              that.data.done_record = that.data.done_record + 2
          }
            
          that.setData({
            done_record:that.data.done_record
          })
          wx.pageScrollTo({
            scrollTop:200,
            duration: 100,
          })
          if(that.data.done_record>that.data.sentenceTotal || that.data.done_record==that.data.sentenceTotal){
            //当全部录音完后上传至数据库
            let startTime = ((new Date()).toISOString()).toString()
            // add_record.set('userId',app.globalData.userInfo.nickName)
            add_record.set('startTime',startTime)
            add_record.set('record',that.data.record)
            add_record.set('materialId',that.data.inform.id)
            if(that.data.show_select == 1){
              add_record.set('record_character', that.data.inform.character_name[0])
            }else if(that.data.show_select == 2){
              add_record.set('record_character', that.data.inform.character_name[1])
            }
            add_record.save().then(res => {
              console.log(res)
              // that.setData({
              //   newDataId: res.data.id
              // })
            }).catch(err=>{
              console.log(err)
            })
          }
        }, err =>{
          console.log('err',err)
          wx.showToast({
            title: '上传失败，请稍后重试',
            icon: "none",
            duration: 2000
          })
        })
        uploadTask.onProgressUpdate(e => {
          console.log('process',e)
        })
    
        // 600 毫秒后中断上传
        // setTimeout(()=> uploadTask.abort(), 600)
      }else{
        wx.showToast({
          title: '文件已上传',
          icon:'none',
          duration:1000
        })
      }
    })
    } else {
      //清除计时器  即清除setInter
      clearInterval(that.data.setInter);
      // 获取到结束时间
      recorderManager.stop();   
      recorderManager.onStop((res) => {
      that.setData({
          tmpfile:res.tempFilePath
      })
    
      if(that.data.record_permission){
        wx.showToast({
          title: '时间过短，请重新录制',
          duration: 2000,
          icon: "none"
        })
      }
      that.setData({
        // isSpeaking: false,
        record_name: "长按录音",
        speck_time: "0",
      }) 
    })  
    }
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show_select:options.show_select,
      topic:options.topic,
      talk_material:JSON.parse(options.talk_material),
      inform: JSON.parse(options.inform),
      sentenceTotal:options.sentenceTotal
    })
    wx.setNavigationBarTitle({ title: this.data.topic })
    console.log(this.data.talk_material)
    console.log(this.data.inform)

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