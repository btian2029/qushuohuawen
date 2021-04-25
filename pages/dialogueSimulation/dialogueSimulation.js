// pages/dialogueSimulation/dialogueSimulation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //热门搜索
    popular_search:[
      {name:'买菜'},
      {name:'点餐'},
      {name:'打招呼'},
      {name:'买菜'},
      {name:'点餐'},
      {name:'打招呼'}
    ],
    introduction:'这是一段介绍文字',
    //功能
    fuc:[
      { 
        id:1,
        name:'学习',
        introduction:'这是一段介绍文字',
      },{
        id:2,
        name:'工作',
        introduction:'这是一段介绍文字',
      },{
        id:3,
        name:'生活',
        introduction:'这是一段介绍文字',
      },
    ]
    
  },
  //返回
  back: function(e){
    console.log("back2index")
    wx.navigateBack({
      delta: 1,
    })
},
 //功能选择部分，四个功能
  dialogueSimulation:function(e){
    console.log(e.currentTarget)
    if(e.currentTarget.id ==1){
      console.log("学习")
      wx.navigateTo({
      url: '/pages/dialogueSimulation/sort/sort?type='+ '学习',
    })
    }if(e.currentTarget.id ==2){
      console.log("工作")
      wx.navigateTo({
      url: '/pages/dialogueSimulation/sort/sort?type='+ '工作',
    })
    }if(e.currentTarget.id ==3){
      console.log("生活")
      wx.navigateTo({
      url: '/pages/dialogueSimulation/sort/sort?type='+ '生活',
    })
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

  }
})