// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listInfo: [{
            text: '首页',
            imgUrl: '/images/icon/icon_shouye.png',
            curUrl: '/images/icon/icon_shouye.png',
          },
          {
            text: '圈子',
            imgUrl: '/images/icon/icon_quanzi.png',
            curUrl: '/images/icon/icon_quanzi.png',
          },
          {
            text: '我的',
            imgUrl: '/images/icon/icon_mine_unsel.png',
            curUrl: '/images/icon/icon_mine.png',
          }]
    },
    chooseImg: function(e) {
        var that = this
        this.setData({
          curIdx: e.currentTarget.dataset.current
        })
        console.log("kk", e.currentTarget.dataset.current)
        if (e.currentTarget.dataset.current == 0) {
          wx.switchTab({
            url: '/pages/index/index',
          })
        } else if (e.currentTarget.dataset.current == 1) {
          wx.switchTab({
            url: '/pages/moments/moments',
          })
        } else if (e.currentTarget.dataset.current == 2) {
          wx.switchTab({
            url: '/pages/mine/mine',
          }) 
        }
        that.onShow();
      },
      onLoad: function(options) {
        var curIdx = 0
        this.setData({
          curIdx: curIdx,
        })
    
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
        this.onLoad();
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