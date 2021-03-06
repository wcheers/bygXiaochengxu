// pages/handleTrademark/handleTrademark.js
let userName='',userPhone=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageHeight: 553,
    title:'商标快速注册',
    content: '商标注册是指商标的使用人为了取得商标专用权将其使用或准备使用的商标依照法律规定的条件原则和程序向商标主管机关提出注册申请经商标主管机关审核予以注册的制度。',
    servicePrice:'600元',
    officialPrice:'300元',
    price:'900元',
    userInfoHidden:true
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
          imageHeight: windowWidth / 553.0  * 251.0 
        })
      }
    })
  },
  applyForTrandmark: function (e) {
    // 不跳转
    // this.setData({
    //   userInfoHidden: false
    // })

// 以下是跳转
  wx.navigateTo({
    url: '../handleTrademarkDetails/handleTrademarkDetails',
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
  hidden: function (e) {
    this.setData({
      userInfoHidden: true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  usernameInput: function (e) {
    userName = e.detail.value
  },
  userphoneInput: function (e) {
    userPhone = e.detail.value
  },
  submit: function (e) {
    console.log('提交')
    let that = this
    let reliefStr = '无减缓'
    this.setData({
      userInfoHidden: true
    })
    if ((/^1(3|4|5|7|8)\d{9}$/.test(userPhone))) {
      wx.request({
        data: {
          businessName: "商标一键申请",
          typeCode: 'YWLX02-06',
          businessDesc:  '商标一键申请' + '【来源】小程序商标一键申请',
          price: 800,
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
    }
    else {
      wx.showModal({
        title: '手机号格式不正确',
        content: '',
      })
      return;
    }

  }
})