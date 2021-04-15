// pages/dub/comic/monkeyKing/monkeyKing.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      info:"",
    },
  
    jump() {
      // console.log(e.currentTarget.id)
      console.log("goto_performan")
      wx.navigateTo({
        url:"../detail/detail?recordID=" + this.data.info.id
      })
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var recordID = options.recordID;
 	    console.log(recordID);
      let tableName = 'cartoon_material'
      // let recordID = '6065ddb38d089272ae62175a'
      
      let Product = new wx.BaaS.TableObject(tableName)
      
      Product.get(recordID).then(res => {
        console.log(res.data)
        this.setData({
          info:res.data
        })
        // success
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