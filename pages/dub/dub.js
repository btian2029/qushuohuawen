// pages/dub/dub.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    back: function(e){
        console.log("back2index")
        wx.navigateBack({
          delta: 1,
        })
    },

    dub: function(e){
        // console.log("comic")
        // console.log(e.currentTarget.id)
        if(e.currentTarget.id ==1){
          console.log("comic")
          wx.navigateTo({
          url: '/pages/dub-tem/comic/comic?type='+ 'comic',
        })
        }if(e.currentTarget.id ==2){
          console.log("news")
          wx.navigateTo({
          url: '/pages/dub-tem/comic/comic?type='+ 'news',
        })
        }if(e.currentTarget.id ==3){
          console.log("movies")
          wx.navigateTo({
          url: '/pages/dub-tem/comic/comic?type='+ 'movies',
        })
        }if(e.currentTarget.id ==4){
          console.log("colorfulCN")
          wx.navigateTo({
          url: '/pages/dub-tem/comic/comic?type='+ 'colorfulCN',
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