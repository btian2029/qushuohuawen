// pages/develop/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    dataList:{},
    list:[
      {
        id:"1",
        name:"《发展汉语》初级综合一",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/发展汉语初级综合1.jpg"
      },

      {
        id:"2",
        name:"《发展汉语》初级综合二",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/1lMl7lqK1zumElZD.JPG"
      
      },

      {
        id:"3",
        name:"《发展汉语》初级口语一",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/发展汉语初级口语1.jpg"
      
      },
      {
        id:"4",
        name:"《发展汉语》初级口语二",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/《发展汉语》初级口语2.jpg"
      
      },
      {
        id:"5",
        name:"《发展汉语》中级综合一",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/《发展汉语》中级综合1.jpg"
      
      },
      {
        id:"6",
        name:"《发展汉语》中级综合二",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/《发展汉语》中级综合2.jpg"
      
      },
       {
        id:"7",
        name:"《发展汉语》中级口语一",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/《发展汉语》中级口语1.jpg"
      
      },
      {
        id:"8",
        name:"《发展汉语》中级口语二",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/《发展汉语》中级口语2.jpg"
      
      },

      {
        id:"9",
        name:"《发展汉语》高级综合一",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/发展汉语高级综合1.jpg"
      
      },


       {
        id:"10",
        name:"《发展汉语》高级综合二",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/发展汉语高级综合2.jpg"
      
      },

      {
        id:"11",
        name:"《发展汉语》高级口语一",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/发展汉语高级口语1.jpg"
      
      },
      {
        id:"12",
        name:"《发展汉语》高级口语二",
        url:"https://cloud-minapp-38640.cloud.ifanrusercontent.com/《发展汉语》高级口语2 (1).jpg"
      },

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //读取发展汉语的所有课本
    this.setData({
      dataList:JSON.parse(options.dataList)
    })
    var list = this.data.dataList
    console.log(list)
   
//     var index={};
//     var list2 = [];
//   for(var i =0;i<list.length;i++){
//     var id =list[i].fromBook;//取出id
//     var token = fromBook+'total'; //声明某的对象的出现次数
//     if(index[fromBook]==undefined){//如果没有该对象属性，说明第一次
//         index[fromBook]=fromBook;
//         index[token]=1;//默认出现次数为1次
//         list2.push(list[i]);
//     }else{//出现多次
//         index[token]++;//数据
//     }
//    alert(JSON.stringify(index))
// }
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
  bindtapView:function(){
    wx.navigateTo({
      url: 'develop/develop'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})