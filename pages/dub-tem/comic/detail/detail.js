// pages/dub/comic/mokey/detail.js

const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
// let initial_time = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200]
var app=new getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      record_permission: true,
      start_time:"",
      //最终上传数组
      record:[],
      remove_file:[],
      materialId:"",
      inform:"",
      //临时文件数组
      // formFile:[],
      //每句话视频播放时间
      initial:0,
      // 录制时间
      times: 0,
      tmpfile:'',
      // isSpeaking: false,//是否正在说话  
      // voices: [], //音频数组  
      // 默认按住录音
      record_name: "长按录音",
      start_time: "",
      // 录制最终时间
      speck_time: 0,
      //存储计时器
      setInter: '',
      num: 1,
      show: false,
      stop:true,
      current: 0,
      // 全部录音完成标志
      flag:0
    },

  
    //显示拼音
    showpinyin() {
      this.setData({
        show: !this.data.show
      })
    },

    //播放与否
    play(){
      this.setData({
        stop:!this.data.stop
      })
      console.log(this.data.stop)
      if(this.data.stop){
        this.videoContext.pause()
      }
      else{
        this.videoContext.play()
      }
    },

 
  
    //改编页码,播放同步设置
    swiperchange(event) {   
      var that = this.data   
      this.setData({
        current: event.detail.current
      })
      this.setData({
        initial: that.inform.time[that.current]
      })
      this.videoContext.seek(parseInt(that.initial))
      console.log('existing file',that.record,that.record[that.current])
      if(that.record[that.current] == undefined){
        this.setData({
          record_permission: true
        })
      if (that.current == 0 ){  
        if(that.remove_file[0] == undefined){
          wx.showToast({
            title: '请先上传后再录制下一句噢',
            icon:'none',
            duration:1000
          })
        }
      }else{
          if(that.remove_file[that.current] == undefined){
            wx.showToast({
              title: '请先上传后再录制下一句噢',
              icon:'none',
              duration:1000
            })
        } 
      }
      }
      // console.log(that.current)
      // console.log(that.initial)
    },

    //视频播放速度
    low_speed(){
      this.videoContext.playbackRate(0.8)
    },

    origin_speed(){
      this.videoContext.playbackRate(1.0)
    },
  
    fast_speed(){
      this.videoContext.playbackRate(1.5)
    },
    // finish:function(e) {
    //   var index = 0
    //   id = index +1
    //   console.log(id)
    //   while(id <=19){
    //     if (id <19) {
    //       wx.showToast({
    //         title: '对不起，请先完成测试',
    //         icon: 'none'
    //       })
    //     }
    //     if (id == 19) {
    //     this.setData({
    //       current: 20
    //     })
    //     console.log(e)
    //   }
    // }
    // },
  
    //完成事件
  
    // finish(event){
    //   this.setData({
    //     current: this.data.inform.sentenceTotal
    //   })
    // },
    //再练一遍
    again() {
      this.setData({
        current: 0
      })
    },
  
    //发布
    submit() {
      console.log('发布');
    },
  
    //分享
    share() {
      console.log('分享');
    },
  
    //查看配音内容
    look() {
      console.log('查看配音内容');
    },

    //手指按下  
  touchdown: function (e) {
    var that = this;
    console.log('手指按下')
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.record']) {
          if(that.data.record_permission){//将计时器赋值给setInter
          that.data.setInter = setInterval(
            function () {
              var speck_time = parseInt(that.data.speck_time + 1);
              that.setData({
                speck_time: parseInt(speck_time),
                record_name: "松开停止录制",
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
                that.stop();
                that.setData({
                  record_permission: false,
                })
                wx.showToast({
                  title: '录音最长60S哦！',
                  duration: 2000,
                  icon: "none"
                })
              }
            }, 1000);
        }else{
          wx.showToast({
            title: '已有录音，请清除后重试',
            duration:3000,
            icon:"none"
          })
        }
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
        record_permission: false,
        // isSpeaking: false,
        record_name: "长按开始录制",
        speck_time: "0"
      })
    } else {
      //清除计时器  即清除setInter
      clearInterval(that.data.setInter);
      // 获取到结束时间
      that.stop();
      if(that.data.record_permission){
        wx.showToast({
          title: '时间过短，请重新录制',
          duration: 2000,
          icon: "none"
        })
      }
      that.setData({
        // isSpeaking: false,
        record_name: "长按开始录制",
        speck_time: "0",
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
    if(this.data.record_permission == false){
    innerAudioContext.src = this.data.tmpfile
    innerAudioContext.play()
    }else{
      wx.showToast({
        title: '请录音后重试',
        icon:'none',
        duration:1000
      })
    }
  },
// 重新录制
btn_remove: function () {
  var that = this;
  //当不可录音的时候才可以使用，意思就是已经有录音了
  if(that.data.record_permission == false){ 
  if(that.data.record[that.data.current] !== undefined){
    // 删除文件操作
    let removeFile = new wx.BaaS.File()
    let file = that.data.remove_file[that.data.current]
    removeFile.delete(file).then()
    that.data.remove_file.splice(that.data.current,1)
    that.setData({
      remove_file:that.data.remove_file
    })
    that.data.record.splice(that.data.current,1)
    that.setData({
      record: that.data.record
    })
    console.log('remove',that.data.remove_file)
    console.log('record',that.data.record)
    this.setData({
      record_permission: true,
    })
    that.data.flag = that.data.flag - 1
    this.setData({
      flag:that.data.flag
    })
    wx.showToast({
      title: '清除成功',
      duration: 2000,
      icon:'none'
    })
  wx.stopVoice();
  }else if(that.data.record[that.data.current] == undefined){
    wx.showToast({
      title: '未录音，请录音后重试',
      duration: 3000,
      icon:'none'
    })
  }
}else{
  wx.showToast({
    title: '请先录制后再清除',
    icon:'none',
    duration:1000
  })
}
},
  //停止录音
  stop: function () {
    var that = this
    // var formFilePath =[];
    recorderManager.stop();   
    recorderManager.onStop((res) => {
      this.setData({
        tmpfile:res.tempFilePath
      })
      // that.data.formFile[that.data.current] = res.tempFilePath;
      // that.setData({
      //   formFile: that.data.formFile
      // })
      console.log('停止录音', res.tempFilePath)
      console.log('tempfile',that.data.tmpfile)
    })
  },

  // 保存录制
  btn_save: function () {
    var that = this;
    //当不可录音的时候才可以使用，意思就是已经有录音了
    if(that.data.record_permission == false){
    let tableName = 'cartoon_trace'
    let addRecord = new wx.BaaS.TableObject(tableName)
    let add_record = addRecord.create()
    
    // for(var index = 0;index<=that.data.current;index ++){
      let MyFile = new wx.BaaS.File();
      let temp = (that.data.tmpfile)
      console.log('tempfile',temp)
      let fileParams = {filePath: temp}
      if(that.data.record[that.data.current] == undefined){
      let uploadTask =  MyFile.upload(fileParams)
      // 文件成功上传的回调
      uploadTask.then(res=>{
        console.log('status',res.data)
        // 获得文件的id和path
        that.data.remove_file[that.data.current] = res.data.file.id
        this.setData({
          remove_file: that.data.remove_file
        })
        console.log('remove_file',that.data.remove_file)

        that.data.record[that.data.current] = res.data.path
        that.setData({
          record:that.data.record
        })
        console.log('record',that.data.record)
        // that.setData({
        //   start_time:res.data.created_at
        // })
        wx.showToast({
          title: '上传成功',
          icon: "none",
          duration: 2000
        })
        //录音是否完成的标志
        that.data.flag = that.data.flag + 1
        this.setData({
            flag:that.data.flag
         })
        if(that.data.flag == that.data.inform.sentenceTotal){
          //当全部录音完后上传至数据库
        let startTime = ((new Date()).toISOString()).toString()
        add_record.set('userId',app.globalData.userInfo.nickName)
        add_record.set('startTime',startTime)
        add_record.set('record',that.data.record)
        add_record.set('materialId',that.data.materialId)
        add_record.save().then(res => {
          console.log(res)
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
    setTimeout(()=> uploadTask.abort(), 600)
  }else{
    wx.showToast({
      title: '文件已上传',
      icon:'none',
      duration:1000
    })
  }
  // }
    
  }else{
    wx.showToast({
      title: '请先录制后上传',
      icon:'none',
      duration:1000
    })
  } 
  },
   

  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     var recordID = options.recordID;
     console.log(recordID);
     this.setData({
      materialId: recordID
    })
     let tableName = 'cartoon_material'
     // let recordID = '6065ddb38d089272ae62175a'
     
     let Product = new wx.BaaS.TableObject(tableName)
     
     Product.get(recordID).then(res => {
       console.log(res.data)
       this.setData({
         inform:res.data
       })
       // success
     }, err => {
       // err
     })
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (res) {
      this.videoContext = wx.createVideoContext('myVideo')
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