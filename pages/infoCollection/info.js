// pages/infoCollection/info.js.js
Page({

  /**
   * Page initial data
   */
  
  data: {
    userNameInput:'',
    learningInput:'',
    
    countryList: ['中国','美国','英国','日本','韩国','巴西','马来西亚','新加坡','新西兰','泰国','印度尼西亚','埃及','尼日利亚','西班牙','法国','喀麦隆','蒙古','苏格兰','荷兰','葡萄牙','芬兰','俄罗斯','意大利','德国','巴基斯坦'],
    countryIndex: 25,
    
    firstLanguageList:['汉语','英语','德语','法语','俄语','西班牙语','日语','阿拉伯','朝鲜','葡萄牙语'],
    firstLanguageIndex:10,


     LFList:['汉藏语系','印欧语系','乌拉尔语系','阿尔泰语系','闪含语系','高加索诸语','达罗毗荼语系','澳泰语系','南亚语系','尼日尔-刚果语系','尼罗-撒哈拉语系','科伊桑语系','日本语系','朝鲜语系','其它'],
     LFIndex:15,

    ageList: ['10-18','19-30','31-50'],
    ageIndex:3,
 

    genderList:['男','女'],
    genderIndex:2,

    hskList:['一级','二级','三级','四级','五级','六级'],
    hskIndex:6,

    originList:['是','否'],
    originIndex:2,

    generationList:['一代','二代','三代','四代'],
    generationIndex:4,

    learnList:['是','否'],
    learnIndex:2,

    methodList:['自学','规范学习'],
    methodIndex:2,

/*********************************写入数据库 **************************/

   
    // 2级picker
   
  /**
   * Lifecycle function--Called when page load
   */
  },
  // 输入框事件
 
  countryInput:function(e){
   
    //console.log('picker发送选择改变，携带值为', this.data.countryList[e.detail.value])
    this.setData({
      country:e.detail.value
    }) 
    
  },
  languageInput:function(e){
    this.setData({
      language:e.detail.value
    })
  },

  languageFamilyInput:function(e){
    this.setData({
      languageFamily:e.detail.value
    })
  },
  userAgeInput:function(e){
    this.setData({
      userAge:e.detail.value
    })
  },

  genderInput:function(e){
    this.setData({
      gender:e.detail.value
    })
  },

  hskLevelInput:function(e){
    this.setData({
      hskLevel:e.detail.value
    })
  },

  originInput:function(e){
    this.setData({
      origin:e.detail.value
    })
  },

  generationInput:function(e){
    this.setData({
      generation:e.detail.value
    })
  },

  learnInput:function(e){
    this.setData({
      learn:e.detail.value
    })
  },
  methodInput:function(e){
    this.setData({
      method:e.detail.value
    })
  },

  userNameInput:function(e){
    this.setData({
      languageLearning:e.detail.value
    })
   // console.log('用户输入',e.detail.value)
  },
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  changeCountry(e){
    var index = this.data.index
   // console.log('picker发送选择改变，携带下标为', e.detail.value)
   // console.log('picker发送选择改变，携带值为', this.data.countryList[e.detail.value])
    this.setData({ countryIndex: e.detail.value});//如何在finishCollection中调用这个值
  },

  changeFirstLanguage(e){
    this.setData({ firstLanguageIndex: e.detail.value});
  },
  changeLF(e){
    this.setData({ LFIndex: e.detail.value});
  },

  changeAge(e){
    this.setData({ ageIndex: e.detail.value});
  },

  changeGender(e){
    this.setData({ genderIndex: e.detail.value});
  },

  changeHSK(e){
    this.setData({ hskIndex: e.detail.value});
  },

  changeMultiPicker(e) {
    this.setData({multiIndex: e.detail.value})
  },

  changeOrigin(e){
    this.setData({ originIndex: e.detail.value});
  },
  changeGeneration(e){
    this.setData({ generationIndex: e.detail.value});
  },
  changeLearn(e){
    this.setData({ learnIndex: e.detail.value});
  },

  changeMethod(e){
    this.setData({ methodIndex: e.detail.value});
  },

  createUser(e) {
    //对应每一列的名称
    //必填部分
    let country = this.data.countryList[this.data.countryIndex] // 缓存在 data 对象中的输入框输入的书名
    let language = this.data.firstLanguageList[this.data.firstLanguageIndex]
    let languageFamily = this.data.firstLanguageList[this.data.firstLanguageIndex]
     let age = this.data.ageList[this.data.ageIndex]
     let gender = this.data.genderList[this.data.genderIndex] 
     let hskLevel = this.data.hskList[this.data.hskIndex]
    // 非必填部分
     let chineseOrigin = this.data.originList[this.data.originIndex]
     let chineseOrigin_generation = this.data.generationList[this.data.generationIndex]
     let chineseLearning = this.data.learnList[this.data.learnIndex]
     let method = this.data.methodList[this.data.methodIndex]
     //用户输入部分
     let otherLanguage = this.data.languageLearning
   //  let otherLanguage = this.data.
    //实例化对应 tableName 的数据表对象
    let Infor = new wx.BaaS.TableObject('userInfor') 
    let user = Infor.create() // 创建一条记录
    
    user.set({country,language,languageFamily,age,gender,hskLevel,chineseOrigin,chineseOrigin_generation,chineseLearning,method,otherLanguage})

      .save()
      .then(() => {
        //...
      })
  },

  finishCollection:function(){
    //  if(this.data.country.length==0||!this.data.language||!this.data.languageFamily||!this.data.userAge||!this.data.gender||!sthis.data.hskLevel){
      // this.setData({
      //   infoMess:'温馨提示：信息填写不完善！',
      // })
      // var country = this.data.country
      // console.log(this.data.country)
      
      let guojia = this.data.countryList[this.data.countryIndex]
      //console.log('这是',guojia)
      
      let muyu = this.data.firstLanguageList[this.data.firstLanguageIndex]
      //console.log('这是',muyu)

      let yuzhong = this.data.LFList[this.data.LFIndex]
      //console.log('这是',yuzhong)

      let nianling = this.data.ageList[this.data.ageIndex]
     // console.log('这是',nianling)

      let xingbie = this.data.genderList[this.data.genderIndex]
      //console.log('这是',xingbie)

      let shuiping = this.data.hskList[this.data.hskIndex]
     // console.log('这是',shuiping)


    if(guojia==null||muyu == null||yuzhong == null||nianling == null||xingbie == null||shuiping == null){//如果是空则信息不完善
      wx.showToast({ //文字提示框
        title: '温馨提示：信息填写不完善！',
        icon:'none',
        duration: 2000
       })
    }else{//否则成功
     //数据进入数据库
     
    wx.showToast({ //文字提示框
      title: '成功',
      icon:'success',
      duration: 2000
     })
     //调用方法创建一条记录
      this.createUser()
      
      //进入主页 
      wx.switchTab({
        url: '../home/home',
      })

    }
  },

})