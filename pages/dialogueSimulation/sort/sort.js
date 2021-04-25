// pages/dialogueSimulation/sort/sort.js
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //接收数组 
    talk:'',
    // 材料数量
    num:'',
    //音频片段id
    id:'',
    // 用于给下一个页面传输标题
    topic:'',
    show:'',
    curMaterial:'',
    txt_index:''
  },

  showPopup(e) {
    var that = this;
    var index = e.currentTarget.dataset.index
    var material = that.data.talk[index]
    var num = (material.record_txt).length
    this.setData({ show: true });
    console.log("当前材料",material)
    var json = [];
    var array = {};
    for(var i = 0; i < num; i++){
      array['record_txt'] = material.record_txt[i];
      array['record_order'] = material.record_order[i];
      if( material.record_order[i] == 'A'){
        array['record_character'] = material.character_name[0]
      }
      else if( material.record_order[i] == 'B'){
        array['record_character'] = material.character_name[1]
      }
      json.push(array)
        array = {};
      }
    that.setData({
      curMaterial:json,
    })
    console.log(that.data.curMaterial)

  },

  onClose() {
    this.setData({ show: false });
  },

  // 这个是选择某一个材料
  sort:function(e){
    this.setData({
      id:e.currentTarget.id
    })
    this.setData({
      topic:e.currentTarget.dataset.topic
    })
    console.log(e.currentTarget)
    console.log(this.data.topic)
    console.log("switch")
    wx.navigateTo({
      url: '/pages/dialogueSimulation/practice/practice?recordID=' + this.data.id + '&topic=' + this.data.topic,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    innerAudioContext.stop()
    var type = options.type;
    //修改导航栏标题
    wx.setNavigationBarTitle({ title: type })
    // 获取数据部分
    let tableName = 'talk_material'
    let query = new wx.BaaS.Query()
    query.contains('type',type)
    let talk = new wx.BaaS.TableObject(tableName)
    talk.setQuery(query).find().then(res => {
      // success
      console.log(res.data.objects)
      this.setData({
        talk:res.data.objects
      })
    }, err => {
      // err
      console.log("find_err",err)
    })
    // // 查询数量
    // talk.setQuery(query).count().then(num => {
    //   // success
    //   console.log(num)
    //   this.setData({
    //     num:num
    //   })
    // }, err => {
    //   // err
    //   console.log("num_err",err)
    // })
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