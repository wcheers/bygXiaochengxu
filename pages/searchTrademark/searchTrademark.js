// pages/searchTrademark/searchTrademark.js
var page = 1, isLastPage = false, searchContent = '',username = '',code = '';
var interval = null //倒计时函数
var selData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    isHideLoadMore: true,
    totalNum:0,
    userInfoHidden:true,
    codeBtnTitle:'获取验证码',
    currentTime: 60,
    disabled: false
  },
  userphoneInput: function (e) {
    username = e.detail.value
  },
  cpdeInput:function (e){
    code = e.detail.value
  },
  getCode:function(){
    console.log("获取验证码")
    var that = this;
    if(username.length == 11)
    {
      wx.request({
        url: 'https://appweb.techhg.com/note/sendNoteCode',
        data: {
          mobileNum: username,
          note: "2"
        },
        success: function (res) {
        
          if (res.data.success == true) {
            that.timer();
          }
          else
          {
            wx.showModal({
              title: '验证码获取失败',
              content: '请检查手机号是否正确',
            })
          }
        },
        fail: function (res) {

        }

      })
    }
    else
    {
      wx.showModal({
        title: '错误',
        content: '请输入正确格式手机号',
      })
    }
  },
  submit:function(){
    var that = this;
      wx.request({
        url: 'https://appweb.techhg.com/dl/login',
        data:{
          usrAccount:username,
          nodeCode:code,
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.success == true) {
            wx.setStorage({
              key: "phone",
              data: username
            }),
            that.setData({
              userInfoHidden:true
            }),
              wx.navigateTo({
              url: '../trademarkDetail/trademarkDetail?regNo=' + selData.regno + '&intCls=' + selData.intcls + '&isXiao=1' + '&phone=' + username
              })

          }
          else {
            wx.showModal({
              title: res.data.info,
              content: '',
            })
          }

        },
        fail: function (res) {

        }
        
      })
  },

  timer:function(){
    var that = this;
    that.setData({
      disabled: true
    })
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        codeBtnTitle: currentTime + 's'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          codeBtnTitle: '获取验证码',
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    this.loadData(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData(false)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '查商标',
      path: 'pages/searchTrademark/searchTrademark?searchContent=' + searchContent,

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
  },
  // 搜索
  search: function (e) {
    console.log('搜：' + e.detail.value)
    searchContent = e.detail.value;
    this.loadData(true)
  },
  loadData: function (isRefresh) {
    let that = this
    
    if (isRefresh) {
      page = 1;
      isLastPage = false
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        data: {
          pageNo: page,
          content: searchContent,
          intCls: ''
        },
        url: 'https://appweb.techhg.com/trademark/list',
        success(res) {
          console.log(res.data)
          wx.hideLoading();
          wx.stopPullDownRefresh(); //停止下拉刷新
          that.setData({
            dataList: res.data.body.results,
            totalNum: res.data.body.allRecords
          })
          isLastPage = page * 20 >= res.data.body.allRecords
        }
      })
    }
    else {
      that.setData({
        isHideLoadMore: false,
      })
      if(isLastPage){
        that.setData({
          isHideLoadMore: true,
        })
        wx.showToast({
          title: '没有更多了',
        })
      }
      else
      {
        page++;
        var dataListBefore = this.data.dataList
        wx.request({
          data: {
            pageNo: page,
            content: searchContent,
            intCls: ''
          },
          url: 'https://appweb.techhg.com/trademark/list',
          success(res) {
            console.log(res.data)
            that.setData({
              isHideLoadMore: true,
              dataList: dataListBefore.concat(res.data.body.results)
            })
            isLastPage = page * 20 >= res.data.body.allRecords
          }
        })
      }
    }
  },
  itemClick: function (e) {
    console.log(e.currentTarget.dataset)

    var phone = wx.getStorageSync("phone")
    if (phone)
    {
      wx.navigateTo({
        url: '../trademarkDetail/trademarkDetail?regNo=' + e.currentTarget.dataset.regno + '&intCls=' + e.currentTarget.dataset.intcls + '&isXiao=1' + '&phone=' + phone
      })
    }
    else
    {
      selData = e.currentTarget.dataset;
      this.setData({
        userInfoHidden: false
      })
    }
  },
hidden:function(){
  this.setData({
    userInfoHidden: true
  })
}

})