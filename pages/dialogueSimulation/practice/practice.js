// pages/dialogueSimulation/practice/practice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用于判断是模拟还是练习，也从上个材料返回
    show_select:'',
    //上个页面传回来的recordID
    materialId:'',
    //获得的音频材料数据
    inform:'',
    //数组长度
    recordA_length:'',
    recordB_length:'',
    sentenceTotal:'',
    //swiper_current
    current:0,
    // 展示A或Btxt,默认展示A
    show:true,
    // 句子index
    sentenceIndex:0,
    record_name:'长按录音'
  },

  //改编页码,播放同步设置
  swiperchange(event) {   
    var that = this
    that.setData({
      current: event.detail.current
    })
    that.setData({
      show:!that.data.show
    })
    that.setData({
      sentenceIndex: Math.floor(that.data.current/2)
    })
    if(that.data.show){
      console.log('对话A',that.data.inform.recordA_txt[that.data.sentenceIndex])
    }else{
      console.log('对话B',that.data.inform.recordB_txt[that.data.sentenceIndex])
    }

    // this.setData({
    //   initial: that.inform.time[that.current]
    // })
    // this.videoContext.seek(parseInt(that.initial))
    // console.log('existing file',that.record,that.record[that.current])
    // if(that.record[that.current] == undefined){
    //   this.setData({
    //     record_permission: true
    //   })
    // if (that.current == 0 ){  
    //   if(that.remove_file[0] == undefined){
    //     wx.showToast({
    //       title: '请先上传后再录制下一句噢',
    //       icon:'none',
    //       duration:1000
    //     })
    //   }
    // }else{
    //     if(that.remove_file[that.current] == undefined){
    //       wx.showToast({
    //         title: '请先上传后再录制下一句噢',
    //         icon:'none',
    //         duration:1000
    //       })
    //   } 
    // }
    // }
    // console.log(that.current)
    // console.log(that.initial)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var topic = options.topic;
    wx.setNavigationBarTitle({ title: topic })
    let show_select = options.show_select;
    let recordID  = options.recordID;
    that.setData({
      show_select: show_select
    })
    that.setData({
      materialId: recordID
    })
    console.log('show_select',that.data.show_select)
    console.log('materialIdthat',that.data.materialId)
    //查表
    let tableName = 'talk_material'
    let Product = new wx.BaaS.TableObject(tableName)
     Product.get(recordID).then(res => {
       // success
       console.log(res.data)
       this.setData({
         inform:res.data
       })
       var recordA_length = (that.data.inform.recordA_txt).length
       var recordB_length = (that.data.inform.recordB_txt).length
       that.setData({
         recordA_length: recordA_length
       })
       that.setData({
         recordB_length: recordB_length
       })
       that.setData({
        sentenceTotal: recordA_length + recordB_length
       })
       console.log('sentenceTotal',that.data.sentenceTotal)
       
     }, err => {
       // err
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