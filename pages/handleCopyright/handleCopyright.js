// pages/handleCopyright/handleCopyright.js
var peopleNum = '0'
var username='', userPhone=''
var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageHeight: 369,
    typeSelNum: 0,      //专利类型 0--软件著作权  1--作品著作权 2-加急版权
    priceIndex: 0,
    urgentIndex: 0,
    urgentInfoHidden: true,
    userInfoHidden: true,
    typeTitleData: [
      {
        name: "软件著作权",
        code:"YWLX01-05-01"
      },
      { 
        name: "作品著作权",
        code: "YWLX01-05-02"
      }, {
        name: "加急版权",
        code: "YWLX01-05-04"
      }
    ],
    typeTitleInfo: [
      "计算机软件著作权是指软件的开发者或其他权利人依据有关著作权法律的规定，对于软件作品所享有的各项专有权利。就权利的性质而言，它属于一种民事权利，具备民事权利的共同特征。",
      "指用语言文字符号记录的，用以表达作者思想情感的文学、艺术、自然科学、社会科学、工程技术作品的创作成果，他包括小说(长、中、短篇)、诗歌、散文、论文、剧本、电影、电视创作、歌曲等表达方式，无论作者采用的是手写、打字、印刷、磁盘、光盘等书写记录方式，都是文字作品。",
      "最快作品当天可拿到证书，软著3个工作日可拿到证书。"
    ],
    servicePrice: [
      "600元",
      "600元",
      "2000元",
      "1800元",
      "1600元",
      "1400元",
      "1200元",
      "1000元",
      "800元",
      "600元",
      "600元",
    ],
    officialPrice: [
      "0元",
      "100元",
      "5000元",
      "4000元",
      "3000元",
      "2000元",
      "1500元",
      "1000元",
      "700元",
      "400元",
      "300元",
    ],
    priceData: [
      "600元",
      "700元",
      "7000元",
      "5800元",
      "4600元",
      "3400元",
      "2700元",
      "2000元",
      "1500元",
      "1000元",
      "900元",
    ],
    urgentData: [
      "软著加急1-3个工作日拿证",
      "软著加急4个工作日拿证",
      "软著加急5个工作日拿证",
      "软著加急6-10个工作日拿证",
      "软著加急11-15个工作日拿证",
      "软著加急16-20个工作日拿证",
      "软著加急21-25个工作日拿证",
      "软著加急26-30个工作日拿证",
      "软著加急31-35个工作日拿证",
     ],
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
          imageHeight: windowWidth / 615.0 * 369.0
        })
      }
    })
  },
  typeClick: function (e) {
    console.log(e.currentTarget.dataset.type)
    let that=this;
    if (e.currentTarget.dataset.type== 2) {
      this.setData({
        typeSelNum: e.currentTarget.dataset.type ,
        priceIndex: Number(e.currentTarget.dataset.type) + Number(that.data.urgentIndex),
        urgentInfoHidden:false
    })
    } else {
      this.setData({
        typeSelNum: e.currentTarget.dataset.type,
        priceIndex: e.currentTarget.dataset.type ,
          urgentIndex: 0,
          urgentInfoHidden: true
      })  
    }
  
  },
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      urgentIndex: e.detail.value,
      priceIndex: Number(e.detail.value)+2
    })
  },
  applyForCopyRight: function (e) {
    this.setData({
      userInfoHidden: false
    })
  },
  bindInput: function (e) {
    peopleNum = e.detail.value ? e.detail.value : '0'
    console.log(Number(peopleNum))
  },
  hidden: function (e) {
    this.setData({
      userInfoHidden: true
    })
  },
  usernameInput: function (e) {
    username = e.detail.value
  },
  userphoneInput: function (e) {
    userPhone = e.detail.value
  },
  submit: function (e) {
    this.setData({
      userInfoHidden: true,
    }) 
    console.log('提交')
    let that = this
    let str = Number(that.data.typeSelNum) == 2 ? that.data.urgentData[that.data.urgentIndex] :''
    if (!myreg.test(userPhone)) {
      wx.showModal({
        title: '请输入正确的手机号码',
        content: '',
      })
      return
    }
    if (String(userPhone).length == 11) {
      wx.request({
        data: {
          businessName: that.data.typeTitleData[that.data.typeSelNum].name,
          typeCode: that.data.typeTitleData[that.data.typeSelNum].code,
          businessDesc: '【' + that.data.typeTitleData[that.data.typeSelNum].name + '】' + str + '   【来源】小程序版权登记',
          price: that.data.priceData[that.data.priceIndex],
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
    else {
      wx.showModal({
        title: '手机号格式不正确',
        content: '',
      })
      return;
    }
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