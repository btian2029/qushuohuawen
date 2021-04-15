// pages/dialogueSimulation/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    talk:'',
    num:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
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