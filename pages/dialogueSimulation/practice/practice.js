// pages/dialogueSimulation/practice/practice.js
const innerAudioContext = wx.createInnerAudioContext()
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
    // 获得的标题
    topic:'',
    //数组长度
    sentenceTotal:'',
    //swiper_current
    // 展示A或Btxt,默认展示A
    //是否弹出遮罩层
    show:false,
    talk_material:""
  },
  choose_role(){
    this.setData({
      show:true
    })
  },
  //关闭弹出层
  onClose() {
    this.setData({ show: false });
  },
  //popup 之后的选择，模拟或者练习
  practice:function(e){
    innerAudioContext.stop()
    var that = this;
    console.log("选取id",e.currentTarget)
    console.log("练习片段id",that.data.materialId)
    console.log(that.data.topic)
    wx.navigateTo({
      url: '../detail/detail?inform=' + JSON.stringify(that.data.inform) + '&show_select=' + e.currentTarget.id + '&topic=' + that.data.topic + '&talk_material=' + JSON.stringify(this.data.talk_material)
    })
  },
  //播放每个片段的录音
  btn_play:function(e){
    var index = e.currentTarget.dataset.index
    innerAudioContext.stop()
    console.log(e.currentTarget)
    innerAudioContext.src = this.data.inform.splice_record_source[index]
    innerAudioContext.play()
    innerAudioContext.onPlay((res)=>{
      console.log("正在播放")
    })
  },
  // 播放整段录音
  playWholeRecord:function(){
    innerAudioContext.stop()
    innerAudioContext.src = this.data.inform.record_source
    console.log( innerAudioContext.src)
    innerAudioContext.play()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var topic = options.topic;
    wx.setNavigationBarTitle({ title: topic })
    let recordID  = options.recordID;
    that.setData({
      materialId: recordID,
      topic:topic
    })
    console.log('materialId',that.data.materialId)
    //查表
    let tableName = 'talk_material'
    let Product = new wx.BaaS.TableObject(tableName)
     Product.get(recordID).then(res => {
       // success
       console.log(res.data)
       this.setData({
         inform:res.data
       })
       var record_length = (that.data.inform.record_txt).length
       that.setData({
        sentenceTotal: record_length
       })
       console.log('sentenceTotal',that.data.sentenceTotal)
       var json = [];
       var array = {};
      for(var i = 0; i < record_length; i++){
        array['record_txt'] = res.data.record_txt[i];
        array['record_order'] = res.data.record_order[i];
        array['record_source']  = res.data.splice_record_source[i];
        json.push(array)
        array = {};
      }
      that.setData({
        talk_material:json
      })
      console.log(that.data.talk_material)
     }, err => {
       // err
       console.log("err",err)
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