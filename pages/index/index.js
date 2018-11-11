//index.js
//获取应用实例
var WxSearch = require('../wxSearch/wxSearch.js')
var app = getApp()
Page({
  data: {
    isDriver: false,
    isStartPos:true,
    queryLocations:[],
    selectedLocation:null,
    wxSearchData: {
      view: {
        isShow: false,
        mindKeys: null,
        isShowSearchKey: false,
        isShowSearchHistory: false
      }
    }
  },
  onLoad: function (options) {
    var that = this
    that.setData({ isDriver: options.isDriver, isStartPos: options.isStartPos })
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, [], that.data.wxSearchData.view.isShowSearchKey, that.data.wxSearchData.view.isShowSearchHistory);
    WxSearch.initMindKeys([]);
  },
  // wxSearchFn: function (e) {
  //   var that = this
  //   WxSearch.wxSearchAddHisKey(that);
  //   console.log(e)
  // },
  wxSearchInput: function (e) {
    var that = this
    this.data.queryLocations=[]
    console.log("Searching " + e.detail.value)
    getApp().globalData.qqmapsdk.getSuggestion({
      keyword: e.detail.value,
      region: "杭州市",
      success: function (res) {
        console.log(res);
        var targets=new Array()
        for (let i = 0; i < res.count; ++i) {
          targets.push(res.data[i].title)
          that.data.queryLocations[res.data[i].title] = res.data[i]
        }
        console.log(targets)
        WxSearch.initMindKeys(targets)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
    WxSearch.wxSearchInput(e, that);
    
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  //选择提示词后回调
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
    this.data.selectedLocation = this.data.queryLocations[e.target.dataset.key]
    console.log(this.data.selectedLocation)
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
    console.log(e)
  },
  confirm: function (event) {
    console.log(event)
    WxSearch.wxSearchAddHisKey(this);
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    var data={}
    if (this.data.isStartPos=='true'){
      data = { isStartPos: this.data.isStartPos, startLocation: this.data.selectedLocation}
    }else{
      data = { isStartPos: this.data.isStartPos, endLocation: this.data.selectedLocation}
    }
    //直接给上移页面赋值
    prevPage.setData(data);
    wx.navigateBack({
      delta: 1
    })
  }
})