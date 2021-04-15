// pages/template/tabbar/tabbar.js
// pages/template/template.js
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
    // 底部导航
    chooseImg: function (e) {
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
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      this.onLoad();
    },
  })
  