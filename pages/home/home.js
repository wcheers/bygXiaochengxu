// pages/home/home.js
let version = "0.2.4"
var page = 1, otherPage = 0;
var department = '', title = '', sortBy = '1', onlyTitle = true, isLastPage = false;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    //是否显示指示点 true 显示 false 不显示
    indicatorDots: true,
    //控制方向
    vertical: false,
    //是否自动切换
    autoplay: true,
    //自动切换时间间隔
    interval: 3000,
    //滑动动画时长
    duration: 1000,
    imageHeight:170,
    policyHidden:false,
    city:'北京市',
    isHideLoadMore: true,
    isHiddenFilterView: true,
    isHiddenOtherPromptView: true,
    dataList: [],
    otherDataList: [],
    provinceList: [],
    cityList: [],
    districtList: [],
    departmentList: [],
    selProvince: '',
    selCity: '',
    selDistrict: '',
    selDepartment: '',
    sortBy: '1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://appweb.techhg.com/base/carousel',
      success: function (res) {
        console.log(res.data.body)
        that.setData({
          imgUrls: res.data.body
        })
      }
    })
    wx.request({
      url: 'https://appweb.techhg.com/base/show',
      success: function (res) {
        console.log(res.data.body)
        if(res.data.body >= version)
        {
          that.setData({
            policyHidden:false
          })
        }
      }
    })
    // wx.setStorage({
    //   key: 'city',
    //   data: '北京',
    // })
    // 获取本地缓存
    if (wx.getStorageSync("city")){
      console.log("取出缓存数据：" + wx.getStorageSync("city"))
      that.setData({
        city: wx.getStorageSync("city")
      })
    }
    this.loadData()
    // 获取筛选列表
    wx.request({
      url: 'https://appweb.techhg.com/base/listDept2ByAddr',
      method: 'GET',
      data: {
        addrCode: 0
      },
      success: function (res) {
        console.log('筛选列表')
        console.log(res.data);
        that.setData({
          provinceList: res.data.body
        })
      }
    })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   // var query = wx.createSelectorQuery()
   // console.log(query.select(".slide-image")); 
   
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
    console.log("上拉加载更多事件 系统");
    this.loadMoreData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  imageLoad:function(e){
    let ratio = e.detail.height / e.detail.width;
    console.log(ratio)
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        console.log(res.windowWidth)
        that.setData({
          imageHeight: windowWidth * ratio
        })
      }
    })
  },
  // 专利查询
  searchPatent: function (e) {
    console.log("专利查询");
    wx.navigateTo({
      url: '../searchPatent/searchPatent?title=专利检索',
    })
  },
  // 商标查询
  searchTrademark: function (e) {
    console.log("商标查询");
    wx.navigateTo({
      url: '../searchTrademark/searchTrademark',
    })
  },
  // 政策信息
  polocyList: function (e) {
    console.log("政策信息");
    wx.navigateTo({
      url: '../policy/policy',
    })
  },
  // 专利评估
  evaluationPatent:function(e){
    wx.navigateTo({
      url: '../searchPatent/searchPatent?title=专利评估',
    })
  },
  // 专利办理
  HandlePatent:function(e){
    wx.navigateTo({
      url: '../handlePatent/handlePatent',
    })
  },
  // 商标注册
  HandleTrademark:function (e) {
    wx.navigateTo({
      url: '../handleTrademark/handleTrademark',
    })
  },
  // 版本登记
  HandleCopyright:function(e){
    wx.navigateTo({
      url: '../handleCopyright/handleCopyright',
    })
  },
  // 案件进度查询
  caseProgress: function (e) {
    wx.navigateTo({
      url: '../caseProgress/caseProgress',
    })
  },
  HandErrand:function(e){
      wx.navigateTo({
        url: '../sendOrder/sendOrder',
      })
  },
  gotosearch:function(){
    wx.navigateTo({
      url: '../policy/policy',
    })
  },
  //筛选
  filter: function () {
    this.setData({
      isHiddenFilterView: false
    })
  },
  // 筛选页省级点击目录
  provinceTap: function (e) {
    console.log("点击选择省级" + e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    this.setData({
      cityList: this.data.provinceList[index].listAddr,
      departmentList: this.data.provinceList[index].listDept,
      districtList: [],
      selProvince: this.data.provinceList[index].addrName,
      selCity: '',
      selDistrict: '',
      selDepartment: ''
    });
  },
  // 筛选页市级点击目录
  cityTap: function (e) {
    console.log("点击选择市级" + e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    this.setData({
      districtList: this.data.cityList[index].listAddr,
      departmentList: this.data.cityList[index].listDept,
      selCity: this.data.cityList[index].addrName,
      selDistrict: '',
      selDepartment: ''
    });
  },
  districtTap: function (e) {
    console.log("点击选择市级" + e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    this.setData({
      departmentList: this.data.districtList[index].listDept,
      selDistrict: this.data.districtList[index].addrName,
      selDepartment: ''
      
    });
  },
  departmentTap: function (e) {
    console.log("点击选择部门" + e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    this.setData({
      selDepartment: this.data.departmentList[index].departName,
    });
  },

  showLoading: function () {
    wx.showLoading({
      title: '加载中',
    })
  },
  cancelLoading: function () {
    wx.hideLoading();
    wx.stopPullDownRefresh(); //停止下拉刷新
  },
  // 用户自定义事件
  tableViewItemClick: function (e) {
    // var index = parseInt(e.currentTarget.dataset);
    console.log("点击了" + e.currentTarget.dataset.title);
    if (wx.canIUse('web-view')) {
      console.log("可以了哈哈哈哈哈哈哈");
      wx.navigateTo({
        url: '../policyDetail/policyDetail?id=' + e.currentTarget.dataset.id + '&addr=' +
        e.currentTarget.dataset.addr + '&source=' + e.currentTarget.dataset.source + '&title=' + e.currentTarget.dataset.title
      })
    } else {
      console.log("当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试");
      wx.showToast({
        title: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试',
      })

    }

  },
  //关闭筛选页
  closeFilter: function () {
    this.setData({
      isHiddenFilterView: true,
      selProvince: '',
      selCity: '',
      selDistrict: '',
      selDepartment: ''
    })
  },
  filterSure: function () {
    department = this.data.selDepartment;
    var addr = this.data.city;
    if (this.data.selDistrict=='')
    {
      if (this.data.selCity=='')
      {
        if (this.data.selProvince=='')
        {

        }
        else
        {
          addr = this.data.selProvince
        }
      }
      else
      {
        addr = this.data.selCity
      }
    }
    else
    {
      addr = this.data.selDistrict
    }
    wx.setStorage({
      key: 'city',
      data: addr,
    })
    this.setData({
      isHiddenFilterView: true,
      city:addr
    })
    this.loadData();
  },
  // 刷新数据
  loadData(){
    page = 1
    let that = this;
    wx.request({
      method: 'GET',
      data: {
        pageNum: page,
        flag: sortBy,
        pageSize: 20,
        notEqual: '',
        addr: that.data.city,
        source: department,
        title: '',
        info: '',
        sourceType: '',
        dim: '',
      },
      url: 'https://appweb.techhg.com/granoti/listNew',
      success: function (res) {
        console.log(res.data);
        that.setData({
          dataList: res.data.body.list,
          totalNum: res.data.body.total
        })
        isLastPage = res.data.body.pageNum == res.data.body.lastPage
        if (isLastPage) {
          that.setData({
            isHiddenOtherPromptView: false
          })
          otherPage = 1
        }
        that.cancelLoading();
      }
    })
  },
  //加载更多数据
  loadMoreData: function () {

    let that = this;
    that.setData({
      isHideLoadMore: false,
    })
    var dataListBefore = that.data.dataList;
    var otherDataListBefore = that.data.otherDataList;
    if (isLastPage) {
      otherPage++;
      wx.request({
        method: 'GET',
        data: {
          pageNum: otherPage,
          flag: sortBy,
          pageSize: 20,
          notEqual: '1',
          notAddr: that.data.city,
          notSource: department,
          title: '',
          info: '',
          notSourceType: '',
          dim: '',
        },
        url: 'https://appweb.techhg.com/granoti/listNew',
        success: function (res) {
          console.log(res.data)
          that.setData({
            isHideLoadMore: true,
            otherDataList: otherDataListBefore.concat(res.data.body.list),
          })
          console.log("其他部门")
          that.cancelLoading();
        }
      })
    }
    else {
      page++
      wx.request({
        method: 'GET',
        data: {
          pageNum: page,
          flag: sortBy,
          pageSize: 20,
          notEqual: '',
          addr: that.data.city,
          source: department,
          title: '',
          info: '',
          sourceType: '',
          dim: '',
        },
        url: 'https://appweb.techhg.com/granoti/listNew',
        success: function (res) {
          console.log(res.data)
          that.setData({
            isHideLoadMore: true,
            dataList: dataListBefore.concat(res.data.body.list)
          })
          isLastPage = res.data.body.pageNum == res.data.body.lastPage
          if (isLastPage) {
            that.setData({
              isHiddenOtherPromptView: false
            })
          }
          console.log("选中部门")
          that.cancelLoading();
        }
      })
      
      
    }
  }

})
