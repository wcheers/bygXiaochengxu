// pages/trademarkDetail/trademarkDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    shareUrl: '',
    tradeTypeNameData: [
      "化学原料",
      "颜料油漆",
      "日化用品",
      "燃料油脂",
      "医药",
      "金属材料",
      "机械设备",
      "手工器械",
      "科学仪器",
      "医疗器械",
      "灯具空调",
      "运输工具",
      "军火烟火",
      "珠宝钟表",
      "乐器",
      "办公用品",
      "橡胶制品",
      "皮革制品",
      "建筑材料",
      "家具",
      "厨房洁具",
      "绳网袋篷",
      "纱线丝",
      "布料床单",
      "服装鞋帽",
      "纽扣拉链",
      "地毯席垫",
      "健身器材",
      "食品",
      "方便食品",
      "饲料种子",
      "啤酒饮料",
      "酒",
      "烟草烟具",
      "广告营销",
      "金融物管",
      "建筑修理",
      "通讯服务",
      "运输储藏",
      "材料加工",
      "教育娱乐",
      "网站服务",
      "餐饮住宿",
      "医疗园艺",
      "社会服务"
    ],
  },

  /**
   * 生命周期函数--监听页面加载恒冠
   */
  onLoad: function (options) {
    let that = this;
    that.data.shareUrl = 'pages/trademarkDetail/trademarkDetail?regNo=' + options.regno + '&intCls=' + options.intCls + '&isXiao=1';

    console.log(options)
    this.setData({
      url: encodeURI( 'https://appweb.techhg.com/trademark/info?regNo=' + options.regNo + '&intCls=' + options.intCls + '&isXiao=1' + "&usrPhone=" + options.phone + "&usrName=" + options.phone + "&tradeTypeName=" + that.data.tradeTypeNameData[parseInt(options.intCls) -1])
    })
   
    console.log(this.data.url)
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
    return {
      title: '商标详情页',
      path: that.data.shareUrl,
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