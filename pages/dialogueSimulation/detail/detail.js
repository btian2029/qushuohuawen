// pages/dialogueSimulation/detail/detail.js
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show_select:options.show_select,
      topic:options.topic,
      talk_material:JSON.parse(options.talk_material),
      inform: JSON.parse(options.inform)
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