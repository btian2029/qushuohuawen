// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        level:[
        {
            level_name:"新生入学",
        },
        {
            level_name:"好学份子", 
        },
    ],
        curlevel:1,
        percentage:50,
        image:"/images/Carousel/Carousel_2.png",
        func:[
            {
              id:"1",
              src:"/images/icon/icon_mine.png",
              name:"我的档案",
              url:"/pages/logs/logs"
            },
      
            {
              id:"2",
              src:"/images/icon/icon_mine.png",
              name:"我的跟读",
              url:"/pages/logs/logs"
            },
      
            {
              id:"3",
              src:"/images/icon/icon_mine.png",
              name:"我的配音",
              url:"/pages/logs/logs"
            },
      
            {
              id:"4",
              src:"/images/icon/icon_mine.png",
              name:"我的对话",
              url:"/pages/logs/logs"
            },
            
            {
                id:"5",
                src:"/images/icon/icon_mine.png",
                name:"我的演讲",
                url:"/pages/logs/logs"
            },
        
            {
                id:"6",
                src:"/images/icon/icon_mine.png",
                name:"我的收藏",
                url:"/pages/logs/logs"
            },
        
            {
                id:"7",
                src:"/images/icon/icon_mine.png",
                name:"我的成长",
                url:"/pages/logs/logs"
            },

            {
                id:"8",
                src:"/images/icon/icon_mine.png",
                name:"意见反馈",
                url:"/pages/logs/logs"
            }
          ],
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