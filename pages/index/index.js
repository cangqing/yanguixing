//index.js
//获取应用实例
var WxSearch = require('../wxSearch/wxSearch.js')
var app = getApp()
Page({
  data: {
    wxSearchData:{
      view:{
        mindKeys: null
      }
    }
  },
  onLoad: function () {
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    console.log(e)
  },
  wxSearchInput: function (e) {
    var that = this
    console.log("Searching " + e.detail.value)
    getApp().globalData.qqmapsdk.getSuggestion({
      keyword: e.detail.value,
      region: "杭州市",
      success: function (res) {
        console.log(res);
        var targets=new Array()
        for (let i = 0; i < res.count; ++i) {
          targets.push(res.data[i].address)
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
    console.log("wxSearchKeyTap"+e)
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
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      endPosition: event.detail.value.position
    });
    wx.navigateBack({
      delta: 1
    })
  }
})