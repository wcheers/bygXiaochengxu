// pages/submitOrder/submitOrder.js
var errandTitle = '',
  userName = '',
  userPhone = '',
  errandPrice = '',
  errandContent = '',
  errandDomain = '',
  myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errandBusiness: '',
    typeCode:'',
    isPatent: false,
    index: 0,
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      errandBusiness: options.errandBusiness,
      typeCode: options.typeCode
    })
    if (options.errandType == 0) {
      this.setData({
        isPatent: false
      })
    }
    else {
      this.setData({
        isPatent: true
      })
    }
    errandDomain = this.data.domainData[this.data.index]
    console.log('类型：' + this.data.isPatent)
  },
  errandTitle: function (e) {
    errandTitle = e.detail.value
  },
  userName: function (e) {
    userName = e.detail.value
  },
  userPhone: function (e) {
    userPhone = e.detail.value
  },
  errnadPrice: function (e) {
    errandPrice = e.detail.value
  },
  errnadContent: function (e) {
    errandContent = e.detail.value
  },
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
    errandDomain = this.data.domainData[this.data.index]
  },
  publishErrand: function (e) {
    let that = this
    if (errandTitle == '') {
      wx.showModal({
        title: '请设定标题',
        content: '',
      })
      return
    }
    else if (userName == '') {
      wx.showModal({
        title: '称呼不能为空',
        content: '',
      })
      return
    }
    else if (userPhone == '') {
      wx.showModal({
        title: '联系方式不能为空',
        content: '',
      })
      return
    }
   
    else  if (userPhone.length != 11) {
      wx.showModal({
        title: '手机号长度有误！',
        content: '',
      })
      return
    }

  else  if (!myreg.test(userPhone)) {
      wx.showModal({
        title: '请输入正确的手机号码',
        content: '',
      })
      return 
    }
    else if (errandPrice == '') {
      wx.showModal({
        title: '价格不能为空',
        content: '',
      })
      return
    } 
    wx.request({
      data: {
        businessName: that.data.errandBusiness,
        typeCode: that.data.typeCode,
        businessDesc: '【标题】' + errandTitle + '【备注】' + errandContent==''?'无':errandContent + '【来源】小程序专利一键办理差事',
        price: errandPrice,
        usrPhone: userPhone,
        usrName: userName,
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
    let that = this;
    return {
      title: that.data.navigateTitle,
      path: "pages/home/home",

      success: function (res) {
        // 
        console.log("navigateTitle:" + that.data.navigateTitle);
        console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败");
      }
    }
  }
})