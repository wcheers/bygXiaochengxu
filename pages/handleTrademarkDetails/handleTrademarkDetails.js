// pages/handleTrademarkDetails/handleTrademarkDetails.js
let userName='',userPhone='',trademarkName='',imageUrl=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerData1:[],
    index1:'0',
    pickerData2:[],
    index2:'0',
    trademarkType:[],
    selTrademarkTypeList:[],
    applicantType:'0',//0--企事业单位   1自然人   2--初始
    selTrademarkType:'0',//0--智能推荐  1--自动选择  2--初始
    selData:[],
    userInfoHidden: true,
    imageUrl: "https://appweb.techhg.com/imgs/add_img.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: "https://appweb.techhg.com/base/listDict?superDictionaryCode=XYLY01",
      success:function(res){
        // console.log(res.data)
        that.setData({
          pickerData1:res.data.body
        })
        console.log("小推荐分类")
        console.log(that.data.pickerData1)
        that.loadPicker2Data()
      }
    })
    wx.request({
      url: "https://appweb.techhg.com/base/listTradeClassify?superTradeCode=0",
      success:function(res){
        var selDict = []
        for (var i = 0; i < res.data.body.length; i++)
        {
          let item = res.data.body[i]
          // console.log(item)
          selDict[i] = false
        }
        console.log(selDict)
        that.setData({
          trademarkType: res.data.body,
          selData: selDict
        })
        console.log("专利分类")
        console.log(that.data.trademarkType)
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
  
  },
  pickerSel1:function(e){
    console.log(e.detail.value)
    this.setData({
      index1: e.detail.value
    })
    this.loadPicker2Data()
  }, 
  pickerSel2:function(e){
    console.log(e.detail.value)
    this.setData({
      index2: e.detail.value
    })
    this.loadrecommendList()
  },
  loadPicker2Data:function(){
    let code = this.data.pickerData1[this.data.index1].dictionaryCode
    let that = this
    wx.request({
      data: {
        superDictionaryCode: code
      },
      url: "https://appweb.techhg.com/base/listDict",
      success:function(res){
        that.setData({
          index2: '0',
          pickerData2:res.data.body
        })
        that.loadrecommendList()
      }
    })
  },
  typeClick: function (e) {
    console.log(e.currentTarget.dataset.type)
    this.setData({
      applicantType: e.currentTarget.dataset.type
    })
  },
  selTypeClick: function (e) {
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type != this.data.selTrademarkType){
      this.setData({
        selTrademarkTypeList: []
      })
    }
    this.setData({
      selTrademarkType: e.currentTarget.dataset.type
    })
    
    if (e.currentTarget.dataset.type == '0') {
      this.loadrecommendList()
    }
  },
  // 选分类点击事件
  typeSelClick:function(e){
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    var dict = this.data.selData
    let value = this.data.selData[index] 
    dict[index] = !value
    this.setData({
      selData: dict
    })
    var selItemList=[]
    for (var i = 0; i < dict.length;i++)
    {
      if(dict[i])
      {
        selItemList.push(this.data.trademarkType[i])
        // console.log(selItemList)
      }
    }
    this.setData({
      selTrademarkTypeList: selItemList,
    })  
    // console.log(this.data.selTrademarkTypeList)  
    
  },
  loadrecommendList:function(){
    let that = this;
    let code = this.data.pickerData2[this.data.index2].dictionaryCode
    wx.request({
      data:{
        profeCode:code
      },
      url: "https://appweb.techhg.com/trademark/addclassify",
      success:function(res){
        that.setData({
          selTrademarkTypeList:res.data.body
        })
        console.log(res.data)
      }

    })
  },
  userName:function(e){
    userName = e.detail.value
  },
  userPhone:function(e){
    userPhone = e.detail.value
  },
  trademarkName:function(e){
    trademarkName = e.detail.value
  },
  submit: function (e) {
    console.log('提交')
    let that = this
    if(userName=='')
    {
      wx.showModal({
        title: '申请人不能为空',
        content: '',
      })
        return;
    }
    if(trademarkName=='')
    {
      wx.showModal({
        title: '商标名不能为空',
        content: '',
      })
      return;
    }
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(userPhone)))
    {
      wx.showModal({
        title: '联系电话格式不正确',
        content: '',
      })
      return;
    }
    if (this.data.applicantType == '2') {
      wx.showModal({
        title: '请选择申请人类型',
        content: '',
      })
      return;
    }
    if (this.data.selTrademarkTypeList.length == 0){
      wx.showModal({
        title: '请选择商标类类型',
        content: '',
      })
      return;
    }
    let str=''
    for (var i = 0; i<this.data.selTrademarkTypeList.length;i++)
    {
      let item = this.data.selTrademarkTypeList[i]
      str += '第' + item.tradeCode + '类' + ' ' + item.tradeBrief+'    '
    }
    wx.request({
      data: {
        businessName: '商标一键申请-商标名：'+trademarkName,
        typeCode: 'YWLX02-06',
        businessDesc: '【分类】' + str + ' 【来源】小程序商标一键申请',
        price: 800,
        usrPhone: userPhone,
        usrName: userName,
        busiQuality: '1',
        reseField2: imageUrl
      },
      url: 'https://appweb.techhg.com/business/add',
      success: function (res) {
        console.log(res.data)
        userName = '', 
        userPhone = '', 
        trademarkName = '',
        imageUrl = ''
        wx.navigateBack();
        wx.showToast({
          title: '提交成功',
          duration: 1500
        })
      }
    })
  },
  //上传图片
  uploadImage:function(e){
    console.log('上传图片')
    let that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res.tempFilePaths)
        wx.uploadFile({
          url: 'https://appweb.techhg.com/upload/savePhoneFile', //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'fileName',
          success: function (res) {
            var data = JSON.parse(res.data)
            //do something
            
            console.log(data)
            imageUrl = 'http://img.techhg.com' + data.body.path
            that.setData({
              imageUrl: imageUrl
            })
          }
        })
      },
    })
  }
})