// pages/handlePatent/handlePatent.js
var peopleNum = '0'
var username='', userPhone='',companyName='',num='1';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageHeight: 500,
    typeSelNum: "0",      //专利类型 0--发明  1--新型 2-外观
    discountType: "0",    //减缓类型 0--无减缓  1--个人减缓 2--单位减缓
    domainData: [
      "人类生活必需品",
      "作业/运输",
      "化学/冶金",
      "纺织/造纸",
      "固定建筑",
      "物理",
      "电学",
      "机械工程/照明/加热/武器/爆破",
      "其他"
    ],
    patentPrice: [
      {
        servicePrice: 4500,
        fixedPrice: 50,
        officerPrice: 3400,
        typeName: '发明专利',
        typeCode:'YWLX01-04-01'

      },
      {
        servicePrice: 2100,
        fixedPrice: 205,
        officerPrice: 1100,
        typeName: '实用新型',
        typeCode: 'YWLX01-04-02'
      },
      {
        servicePrice: 600,
        fixedPrice: 205,
        officerPrice: 1100,
        typeName:'外观专利',
        typeCode: 'YWLX01-04-03'
      },
    ],
    index: 0,
    servicePrice: 0,
    officerPrice: 0,
    totalPrice: 0,
    reliefPrice: 0,
    userInfoHidden :true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        console.log(res.windowWidth)
        that.setData({
          imageHeight: windowWidth / 375.0 * 500.0
        })
      }
    })
    this.reloadPrice()
  },

  //刷新价格显示
  reloadPrice: function () {
    let dict = this.data.patentPrice
    let patentType = this.data.typeSelNum
    let discountType = this.data.discountType
    var officerPrice = 0
    var reliefPrice = 0
    switch (discountType) {
      case "0": {
        officerPrice = dict[patentType].fixedPrice + dict[patentType].officerPrice
        reliefPrice = 0
        break
      }
      case "1":
      case "2": {
        if (Number(peopleNum) > 1) {
          officerPrice = dict[patentType].fixedPrice +
            dict[patentType].officerPrice * 0.30
          reliefPrice = dict[patentType].officerPrice * 0.70
        }
        else {
          officerPrice = dict[patentType].fixedPrice + 
                        dict[patentType].officerPrice * 0.15
          reliefPrice = dict[patentType].officerPrice * 0.85
        }
        break
      }
      default:
        break

    }
    this.setData({
      servicePrice: dict[patentType].servicePrice,
      officerPrice: officerPrice,
      totalPrice: dict[patentType].servicePrice + officerPrice,
      reliefPrice: reliefPrice
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

  },
  applyForPatent: function (e) {
    this.setData({
      userInfoHidden: false
    })
  },
 closeClick:function (e) {
   this.setData({
     userInfoHidden: true
   })
  },
  typeClick: function (e) {
    console.log(e.currentTarget.dataset.type)
    this.setData({
      typeSelNum: e.currentTarget.dataset.type
    })
    this.reloadPrice()
  },
  discountClick: function (e) {
    console.log(e.currentTarget.dataset.type)
    this.setData({
      discountType: e.currentTarget.dataset.type
    })
    this.reloadPrice()
  },
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindInput:function(e){
    peopleNum = e.detail.value ? e.detail.value : '0'
    console.log(Number(peopleNum) )
  },
  hidden:function(e){
    this.setData({
      userInfoHidden:true
    })
  },
  usernameInput:function(e){
    username = e.detail.value
  },
  userphoneInput:function(e){
    userPhone = e.detail.value
  },
  companyNameInput:function(e){
    companyName = e.detail.value
  },
  numInput:function(e){
    num = e.detail.value
  },
  submit:function(e){
    console.log('提交')
    let that = this
    let reliefStr = '无减缓'
    this.setData({
      userInfoHidden: true
    })
    if ((/^1(3|4|5|7|8)\d{9}$/.test(userPhone)))
    {
      switch (that.data.discountType) {
        case "0": {
          reliefStr = "无减缓"
          break
        }
        case "1": {
          reliefStr = "个人减缓"
          break
        }
        case "2": {
          reliefStr = "单位减缓"
          break
        }
        default:
          break
      }
      wx.request({
        data: {
          businessName: that.data.patentPrice[that.data.typeSelNum].typeName,
          typeCode: that.data.patentPrice[that.data.typeSelNum].typeCode,
          businessDesc: '【领域】' + that.data.domainData[that.data.index] + '【减缓】' + reliefStr + '   【来源】小程序专利一键申请',
          price: that.data.totalPrice,
          usrPhone: userPhone,
          usrName: username,
          busiQuality: '1'
        },
        url: 'https://appweb.techhg.com/business/add',
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '提交成功',
          })
        }
      })
    }
    else
    {
      wx.showModal({
        title: '手机号格式不正确',
        content: '',
      })
      return;
    }
    
  }
})