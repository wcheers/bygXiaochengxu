// pages/sendOrder/sendOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray1: [],  //一级分类
    dataArrar2: [],  //二级分类
    dataArrar3: [],  //三级分类
    sel1: '0',
    sel2: '0',
    sel3: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://appweb.techhg.com/errand/otherBusiType',
      success: function (res) {
        console.log(res.data.body[0])
        that.setData({
          dataArray1: res.data.body,
          dataArray2: res.data.body[0].listChildDict,
          dataArray3: res.data.body[0].listChildDict[0].listChild
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

  },
  tap1: function (e) {
    let array = this.data.dataArray1
    let index = e.currentTarget.dataset.index
    console.log(index)

    this.setData({
      dataArray2: array[index].listChildDict,
      dataArray3: array[index].listChildDict[0].listChild,
      sel1: index,
      sel2: '0',
      sel3: '0'

    })
  },
  tap2: function (e) {
    let array = this.data.dataArray2
    let index = e.currentTarget.dataset.index
    console.log(index)

    this.setData({
      dataArray3: array[index].listChild,
      sel2: index,
      sel3: '0'

    })
  },
  tap3: function (e) {
    let index = e.currentTarget.dataset.index
    console.log(index)

    this.setData({
      sel3: index
    })
  },
  apply:function(e){
    var name1 = '',name2='',name3='',code='';
    if (this.data.dataArray1.length > 0) {
      name1 = this.data.dataArray1[this.data.sel1].dictionaryName;
      code = this.data.dataArray1[this.data.sel1].dictionaryCode
    }
    if (this.data.dataArray2.length > 0) {
      name2 = this.data.dataArray2[this.data.sel2].dictionaryName;
    }
    if (this.data.dataArray3.length>0)
    {
      name3 = this.data.dataArray3[this.data.sel3].dictionaryName;
    }
    let that = this;
    console.log(name1,name2,name3)
    wx.navigateTo({
      url: '../submitOrder/submitOrder?errandBusiness=' + name1 + name2 + name3 + '&errandType=' + that.data.sel1 + '&typeCode='+ code
    })

  }
})