// pages/comic/comic.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      movies_hot:"",
      //如果要传输数组字典等复杂类型，要先使用JSON.stringify()转换成字符串传递
      movies_new:"",
      type:"",
      active:0,
    },

    back: function(e){
        console.log("back2index")
        wx.navigateBack({
          delta: 1,
        })
    },
    
    performan:function(e){
      console.log(e.currentTarget.id)
      console.log("goto_performan")
      wx.navigateTo({
        url: 'monkey/monkey?recordID=' + e.currentTarget.id
        // url: 'monkey/monkey?info='+JSON.stringify(detail)
      })
    }, 
    
    gotosearch:function(){
      console.log("goto_search")
      wx.navigateTo({
        url: '../../search/search',
      })
    },

    /*
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 实例化查询对象
      var type = options.type;
      let tableName = 'cartoon_material'
      let query = new wx.BaaS.Query()
      // let query_new = new wx.BaaS.Query()
      query.contains('type',type)
      let movies = new wx.BaaS.TableObject(tableName)
      movies.setQuery(query).find().then(res => {
        // success
        console.log(res.data.objects)
        this.setData({
          movies_hot:res.data.objects
        })
      }, err => {
        // err
        console.log("find_err",err)
      })
      movies.setQuery(query).orderBy('-created_at').find().then(res => {
        //success
        console.log(res.data.objects)
        this.setData({
          movies_new:res.data.objects
        })
      }, err => {
        //err
        console.log("find_err",err)
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