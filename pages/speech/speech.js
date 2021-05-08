// pages/speech/speech.js
Page({

  /**
   * 页面的初始数据
   */
   
  data: {
    active: 0,
    number:0,
    list:[{}],
  },
  onChange(event) {
    wx.showToast({
      title: event.detail.name,
      icon: 'none',
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let tableName = 'speech_material'
    let textObject = new wx.BaaS.TableObject(tableName)

    //let temp = new wx.BaaS.TableObject('text_material')
    var query = new wx.BaaS.Query()
  
   
    //发展汉语一共有多少篇文章
    query.contains('type', '生活')

   
// 读取数字是为了在wxml中循环输出 name description
    textObject.setQuery(query).find().then(res => { // find 方法返回值为一个 Promise
    
      // var that = this;
       var list = res.data.objects

       this.setData({
         list:list,
       })
  console.log(list)
    },err => {
      // err
      console.log("失败")
    })
  

   

    // 界面

  //  textObject.select(['topic','description']).get(['6050750e3a85a9495dcaf391']).then(res=>{
  //     console.log(JSON.stringify(res.data))
  //     this.setData({
  //      speech1:res.data
  //     })
  //   },
  //   err => {
  //     // err
  //     console.log("失败")
  //   })

  //   textObject.select(['topic','description']).get(['605073f8aa588860576385f7']).then(res=>{
  //     console.log(JSON.stringify(res.data))
  //     this.setData({
  //      speech1:res.data
  //     })
  //   },
  //   err => {
  //     // err
  //     console.log("失败")
  //   })
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

  practice:function(e){
    var i =e.currentTarget.id
  //  console.log(i)
  //  console.log(this.data.list[i])
    var dataList = JSON.stringify(this.data.list[i])
  
    
    console.log(dataList)
    wx.navigateTo({
      url: 'practice/practice?dataList=' +dataList
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})