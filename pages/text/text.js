// pages/part1_text/text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    func:[
      {
        id:"1",
        name:"《发展汉语》",
      },

      {
        id:"2",
        name:"《中文》",
      },
    ],
   
   list:[{}],
  },

  switch_function:function(e) {
    console.log(e)
    console.log("switch_funtion")
    var id = e.currentTarget.id

    if (id == "1"){
      let tableName = 'text_material'
      let textObject = new wx.BaaS.TableObject(tableName)
  
      //let temp = new wx.BaaS.TableObject('text_material')
      var query = new wx.BaaS.Query()
     
     
      //发展汉语一共有多少篇文章
      query.contains('fromBook', '发展汉语')
  
     
  // 读取数字是为了在wxml中循环输出 name description
      textObject.setQuery(query).find().then(res => { // find 方法返回值为一个 Promise
      
        // var that = this;
         var book = res.data.objects
  
         this.setData({
           list:book,
         })
    // console.log(this.data.list)
      },err => {
        // err
        console.log("失败")
      })
      console.log(this.data.list)
      var dataList = JSON.stringify(this.data.list)
      console.log(dataList)

      wx.navigateTo({
        url: 'list/list?dataList' + dataList
      })

    }
    else if(id == "2"){
      wx.navigateTo({
        url:'../speech/speech',
      })
      // wx.navigateTo({
      //   url: mockSpeech_url,
      // })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



 

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

  },
  goToDevelop(){
    wx.navigateTo({
      url: 'develop/develop'
    })
  },

  goToChinese(){
    wx.navigateTo({
      url: 'chinese/chinese'
    })
  }


})