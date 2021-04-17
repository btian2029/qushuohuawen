// pages/dialogueSimulation/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //接收数组 
    talk:'',
    // 材料数量
    num:'',
    //是否弹出遮罩层
    show:false,
    //音频片段id
    id:'',
    // 用于给下一个页面传输标题
    topic:'',
  },
  //关闭弹出层
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
    this.setData({
      show:true
    })
    console.log(e.currentTarget)
    console.log(this.data.topic)
    console.log("switch")
  },

   //popup 之后的选择，模拟或者练习
  practice:function(e){
    var that = this;
    console.log("选取id",e.currentTarget)
    console.log("练习片段id",that.data.id)
    console.log(typeof(that.data.showmodel))
    wx.navigateTo({
      url: '../practice/practice?recordID=' + that.data.id + '&show_select=' + e.currentTarget.id + '&topic=' + that.data.topic
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    //修改导航栏标题
    wx.setNavigationBarTitle({ title: options.type })
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
      console.log("find_err")
    })
    // 查询数量
    talk.setQuery(query).count().then(num => {
      // success
      console.log(num) // 10
      this.setData({
        num:num
      })
    }, err => {
      // err
      console.log("num_err")
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