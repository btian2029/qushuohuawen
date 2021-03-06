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
      // 录制最终时间
      speck_time: 0,
      //存储计时器
      setInter: '',
      num: 1,
      show: false,
      stop:true,
      current: 0,
      // 全部录音完成标志
      flag:0,
      //上传后数据id
      newDataId:"",
      curTime:0,
      level:[
        {
          designation:"配音王者",
          encouragement:"角色因你而活，你为角色而生"
        },
        {
          designation:"配音宗师",
          encouragement:"声音洪亮、情绪饱满，你就是为配音量身定做"
        },
        {
          designation:"配音达人",
          encouragement:"以声为剑，骑马仗剑走天涯"
        },
        {
          designation:"配音新星",
          encouragement:"坚持热爱，成为称霸配音界的闪亮明星！"
        }
      ],
      curLevel:[],
      ondisplay:false,
      score_detail:""
    },

    //关闭popup
    onClose() {
      this.setData({ show: false });
    },
    //显示拼音
    showpinyin() {
      this.setData({
        show: !this.data.show
      })
    },

    timeUpdate: function (e) {
      //实时播放进度 秒数
        var currentTime = parseInt(e.detail.currentTime)
        this.setData({
          curTime: currentTime
        })
        console.log("视频播放到第" + this.data.curTime + "秒")//查看正在播放时间，以秒为单位
    },

    //播放与否，循环播放
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
      console.log("current",that.current)
      //最后一页不管
      if(that.current < that.inform.sentenceTotal){
        this.setData({
        initial: that.inform.time[that.current]
      })
      //找到电影播放位置
      this.videoContext.seek(parseInt(that.initial))
      console.log('existing file',that.record,that.record[that.current])
      if(that.record[that.current] == undefined){
        this.setData({
          record_permission: true
        })
      }else if(that.record[that.current] !== undefined){
        this.setData({
          record_permission: false
        }) 
      }
    }
      console.log("record_permission",that.record_permission)
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
    //计算评分    
    calculate:function(){
      //语音
      var voice = Math.floor(Math.random() * (100 - 60)) + 60
      // 音量
      var volume = Math.floor(Math.random() * (100 - 60)) + 60
      //流畅度
      var fluency = Math.floor(Math.random() * (100 - 60)) + 60
      // 准确度
      var accurancy = Math.floor(Math.random() * (100 - 60)) + 60
      // 清晰度
      var definition = Math.floor(Math.random() * (100 - 60)) + 60
      // 语调、句调
      var intonation = Math.floor(Math.random() * (100 - 60)) + 60
      // 重音
      var stress = Math.floor(Math.random() * (100 - 60)) + 60
      // 节奏停顿
      var pause = Math.floor(Math.random() * (100 - 60)) + 60

       var grade = Math.ceil(0.15*voice + 0.1*volume + 0.15*fluency + 0.15*accurancy + 0.15*definition + 0.1*intonation + 0.1*stress +0.1*pause)
       var json = {
        voice:voice,
        volume:volume,
        fluency:fluency,
        accurancy: accurancy,
        definition:definition,
        intonation: intonation,
        stress:stress,
        pause:pause,
        grade:grade
        }
        this.setData({
          score_detail:json
        })
        console.log(this.data.score_detail)
      if(grade > 60 && grade < 70){
        this.setData({
          curLevel: this.data.level[3]
        })
      }if(grade >= 70 && grade < 80){
        this.setData({
          curLevel: this.data.level[2]
        })
      }if(grade >= 80 && grade < 90){
        this.setData({
          curLevel: this.data.level[1]
        })
      }if(grade >= 90 && grade <= 100){
        this.setData({
          curLevel: this.data.level[0]
        })
      }
      console.log(this.data.curLevel)
    },
  //完成事件
    finish(event){
      this.calculate();
      this.setData({
        current: this.data.inform.sentenceTotal
      })
    },
    //再练一遍
    again() {
      this.setData({
        current: 0
      })
      this.setData({
        flag: 0
      })
      this.setData({
        record_permission: true
      })
      this.data.remove_file.splice(0,this.data.remove_file.length - 1)
      this.data.record.splice(0,this.data.record.length - 1)
      this.setData({
        remove_file:this.data.remove_file
      })
      this.setData({
        record:this.data.record
      })
      console.log("remove_file",this.data.remove_file)
      console.log("record",this.data.record)
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
      this.setData({ ondisplay: true });
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
    //停止录音
  // stop: function () {
  //   var that = this
  //   // var formFilePath =[];
  //   recorderManager.stop();   
  //   recorderManager.onStop((res) => {
  //     that.setData({
  //       tmpfile:res.tempFilePath
  //     })
      // that.data.formFile[that.data.current] = res.tempFilePath;
      // that.setData({
      //   formFile: that.data.formFile
      // })
      // console.log('停止录音', res.tempFilePath)
      // console.log('tempfile',that.data.tmpfile)
  //   })
  // },
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
        record_name: "长按开始录制",
        speck_time: "0"
      })
      let tableName = 'cartoon_trace'
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
              that.setData({
                newDataId: res.data.id
              })
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
        record_name: "长按开始录制",
        speck_time: "0",
      }) 
    })  
    }
 
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
    innerAudioContext.src = this.data.record[this.data.current]
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
  let tableName = 'cartoon_trace'
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
    if (that.data.flag == that.data.inform.sentenceTotal){
      let recordID = this.data.newDataId;
      let Product = new wx.BaaS.TableObject(tableName)
      Product.delete(recordID).then(res => {
      // success
      console.log(res)
    }, err => {
    // err
      console.log(err)
    })
    }
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
    //  while(!this.data.stop){
    //   if(this.data.current+1 < this.data.inform.sentenceTotal){
    //     if(this.data.curTime == this.data.inform.time[this.data.current + 1]){
    //       this.videoContext.seek(parseInt(this.data.initial))
    //     }
    //   }
    // }

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