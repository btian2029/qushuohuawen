// pages/dialogueSimulation/practice/practice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_select:'',
    materialId:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var topic = options.topic;
    wx.setNavigationBarTitle({ title: options.topic })
    let show_select = options.show_select;
    let recordID  = options.recordID;
    that.setData({
      show_select: show_select
    })
    that.setData({
      materialId: recordID
    })
    console.log(that.data.show_select)
    console.log(that.data.materialId)
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