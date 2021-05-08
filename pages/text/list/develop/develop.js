// pages/develop/develop.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcImage:'https://cloud-minapp-38640.cloud.ifanrusercontent.com/1lMl7lqK1zumElZD.JPG',
    bookName:'',
    number:0,
  
    book:'',
    chapter:{},


  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    let tableName = 'text_material'
    let textObject = new wx.BaaS.TableObject(tableName)

    //let temp = new wx.BaaS.TableObject('text_material')
    var query = new wx.BaaS.Query()
   
   
    //发展汉语一共有多少篇文章
    query.contains('fromBook', '《发展汉语》')

    textObject.setQuery(query).count().then(num => { // find 方法返回值为一个 Promise
      console.log("一共有："+num)
       this.setData({
         number:num
       })

    },err => {
      // err
      console.log("失败")
    })

   

   
// 读取数字是为了在wxml中循环输出 name description
    textObject.setQuery(query).find().then(res => { // find 
       var list = res.data.objects
       var that = this
       that.setData({
         chapter:list,
       })
  console.log(this.data.chapter)
    },err => {
      // err
      console.log("失败")
    })

    // var textNumber;
    // for(var i = 1; i<=this.data.number; i++){
    //   textNumber = i;
    //   textObject.select('name').get(textNumber).then(name=>{
    //     console.log("书名是："+name)
    //   }, err=>{
    //     console.log("失败")
    //   })
    // }

    // textObject.select(['fromText','name']).get(['60434614f7035f7521b5fbb4']).then(res=>{
    //   console.log(JSON.stringify(res.data))
    //   this.setData({
    //    ch7:res.data
    //   })
    // },
    // err => {
    //   // err
    //   console.log("失败7")
    // }
    //   )
    //   textObject.select(['fromText','name']).get(['6041dfcf00950b13babd991d']).then(res=>{

    //     console.log(JSON.stringify(res.data))
    //     this.setData({
    //       ch1:res.data
    //     })
        
    //   },
    //   err => {
    //     // err
    //     console.log("失败1")
    //   }
    //     )

    //     textObject.select(['fromText','name']).get(['6041e9bb3648282c8507227d']).then(res=>{

    //       console.log(JSON.stringify(res.data))
    //       this.setData({
    //         ch2:res.data
    //       })
          
    //     },
    //     err => {
    //       // err
    //       console.log("失败2")
    //     }
    //       )
  
    //       textObject.select(['fromText','name']).get(['6041ed593648283a0c56b8fb']).then(res=>{

    //         console.log(JSON.stringify(res.data))
    //         this.setData({
    //           ch3:res.data
    //         })
            
    //       },
    //       err => {
    //         // err
    //         console.log("失败3")
    //       }
    //         )

    //         textObject.select(['fromText','name']).get(['6041ee7e00950b2e4f47509c']).then(res=>{

    //           console.log(JSON.stringify(res.data))
    //           this.setData({
    //             ch4:res.data
    //           })
              
    //         },
    //         err => {
    //           // err
    //           console.log("失败4")
    //         }
    //           )

    //           textObject.select(['fromText','name']).get(['603a6b83479d291d12648577']).then(res=>{

    //             console.log(JSON.stringify(res.data))
    //             this.setData({
    //               ch5:res.data
    //             })
                
    //           },
    //           err => {
    //             // err
    //             console.log("失败5")
    //           }
    //             )

    //             textObject.select(['fromText','name']).get(['603a0425ec05c53022dabf5c']).then(res=>{

    //               console.log(JSON.stringify(res.data))
    //               this.setData({
    //                 ch6:res.data
    //               })
                  
    //             },
    //             err => {
    //               // err
    //               console.log("失败6")
    //             }
    //               )
    // 获取fromText列并进行排序
    
    // bookName.setQuery(text).orderBy('fromText').find().then(temp=>{ // find 方法返回值为一个 Promise
      
    //   // for(var i=0;i<list.length;i++){
    //   //   console.log(list[i]);
    //   //  }
    //   bookName.setQuery(text).get('name').then(nm=> {
    //    console.log(nm)
    //  })

    
     
      // console.log("序号排列："+list)
      //  this.setData({
      //    number:num
      //  })


    // },err => {
    //   // err
    //   console.log("失败")
    // })


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


  readBass:function(){
    //bookName 是object
    

    
  },

  

  bindtapView:function(e){
    var i =e.currentTarget.id
     console.log(i)
    //  console.log(this.data.chapter[i])
      var dataList = JSON.stringify(this.data.chapter[i])
      // console.log(dataList)

    wx.navigateTo({
      url: 'chapter/chapter?dataList='+dataList
    })
  }

})

