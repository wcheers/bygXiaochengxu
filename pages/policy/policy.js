// pages/policy/policy.js
var page = 1,otherPage=0;
var province = '', city = '', district = '', department = '', title = '', sortBy='1',onlyTitle=true,isLastPage=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalNum: 0,
    isHideLoadMore: false,
    isHiddenFilterView: true,
    isHiddenOtherPromptView:true,
    searchType:'标题',
    totalNum: 0,
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
    sortBy:'1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    province = '', 
    city = '', 
    district = '',
    department = '',
     title = '', 
     sortBy = '1',
      onlyTitle = true,
       isLastPage = false
    this.showLoading();
    //获取默认数据
    this.loadData();
    // 获取筛选列表
    wx.request({
      url: 'https://appweb.techhg.com/base/listDept2ByAddr',
      method: 'GET',
      data: {
        addrCode: 0
      },
      success: function (res) {
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
    console.log("下拉刷新事件 系统");
    this.loadData();
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
    let that = this;
    return {
      title: '政策信息',
      success: function (res) {
        // 
        console.log("path:" + that.shareUrl);
        console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败");
      }
    }
  },

  // 用户自定义事件
  tableViewItemClick: function (e) {
    // var index = parseInt(e.currentTarget.dataset);
    console.log("点击了" + e.currentTarget.dataset.title);
    if (wx.canIUse('web-view')){
      wx.navigateTo({
        url: '../policyDetail/policyDetail?id=' + e.currentTarget.dataset.id + '&addr=' +
        e.currentTarget.dataset.addr + '&source=' + e.currentTarget.dataset.source + '&title=' + e.currentTarget.dataset.title
      })
    }else{
      console.log("当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试" );
       wx.showToast({
        title: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试',
      })
     
    }
    
  },
  changeSearchType:function(){
    onlyTitle=!onlyTitle;
    this.setData({
      searchType:onlyTitle?'标题':'文章'
    })
  },
  // searchInfoInput:function(e){
  //   console.log(e.detail.value)
  // },
  // 搜索
  search:function(e){
    console.log(e.detail.value),
    title = e.detail.value,
    this.loadData()
  },
  // 排序
  softClick: function () {
    console.log("点击事件")
    if(sortBy == '1')
    {
      sortBy = '0';
    }
    else
    {
      sortBy = '1';
    }
    this.setData({
      sortBy: sortBy
    })
    this.loadData();
  },
  //筛选
  filter:function(){
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

  //关闭筛选页
  closeFilter: function () {
    this.setData({
      isHiddenFilterView: true
    })
  },
  filterSure: function () {
    province = this.data.selProvince;
    city = this.data.selCity;
    district = this.data.selDistrict;
    department = this.data.selDepartment;
    this.loadData();
  },
  //刷新数据
  loadData: function () {
    console.log("加载数据");
    this.showLoading();
    this.setData({
      isHiddenFilterView: true
    })
    page = 1;
    let that = this;
    if (province == '' && city == '' && district == '' && department == '' && title == '') {
      //获取默认数据
      wx.request({
        method: 'GET',
        data: {
          pageNum: page,
          flag: sortBy,
          pageSize: 20
        },
        url: 'https://appweb.techhg.com/granoti/list',
        success: function (res) {
          // console.log(res.data);
          that.setData({
            dataList: res.data.body.list,
            totalNum: res.data.body.total
          })
          that.setData({
            isHideLoadMore: true,
          })
          that.cancelLoading();
        }
      })
    }
    else {
      var addr;
      if(district!=''){
        addr = district;
      }
      else
      {
        if(city!=''){
          addr = city;
        }
        else
        {
          addr = province;
        }
      }
      
      wx.request({
        method: 'GET',
        data: {
          pageNum: page,
          flag: sortBy,
          pageSize: 20,
          notEqual: '',
          addr: addr,
          source: department,
          title: title,
          info: onlyTitle?'':title,
          sourceType: '',
          dim: title,
        },
        url: 'https://appweb.techhg.com/granoti/listNew',
        success: function (res) {
          console.log(res.data);
          that.setData({
            dataList: res.data.body.list,
            totalNum: res.data.body.total
          })
          isLastPage = res.data.body.pageNum == res.data.body.lastPage
          if(isLastPage)
          {
            that.setData({
              isHiddenOtherPromptView:false
            })
          }
          that.setData({
            isHideLoadMore: true,
          })
          that.cancelLoading();
        }
      })
    }
  },
  //加载更多数据
  loadMoreData:function(){
    
    let that = this;
    that.setData({
      isHideLoadMore: false,
    })
    var dataListBefore = that.data.dataList;
    var otherDataListBefore = that.data.otherDataList;
    if (province == '' && city == '' && district == '' && department == '' && title == '') {
      page ++;
      //获取默认数据
      
      wx.request({
        method: 'GET',
        data: {
          pageNum: page,
          flag: sortBy,
          pageSize: 20
        },
        url: 'https://appweb.techhg.com/granoti/list',
        success: function (res) {
          // console.log(res.data);
          that.setData({
            isHideLoadMore: true,
            dataList: dataListBefore.concat(res.data.body.list),
          }),
          that.cancelLoading();
        },
        fail: function (res) {
          that.setData({
            isHideLoadMore: true,
          }),
            that.cancelLoading();
        }
      })
    }
    else {
      var addr;
      if (district != '') {
        addr = district;
      }
      else {
        if (city != '') {
          addr = city;
        }
        else {
          addr = province;
        }
      }      
      if (isLastPage) {
        otherPage++;
        wx.request({
          method: 'GET',
          data: {
            pageNum: otherPage,
            flag: sortBy,
            pageSize: 20,
            notEqual: '1',
            notAddr: addr,
            notSource: department,
            title: title,
            info: onlyTitle ? '' : title,
            notSourceType: '',
            dim: title,
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
        page++;
        wx.request({
          method: 'GET',
          data: {
            pageNum: page,
            flag: sortBy,
            pageSize: 20,
            notEqual: '',
            addr: addr,
            source: department,
            title: title,
            info: onlyTitle ? '' : title,
            sourceType: '',
            dim: title,
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
          ,
          fail: function (res) {
            that.setData({
              isHideLoadMore: true,
            }),
              that.cancelLoading();
          }
        })
      }      
    }
  }


})