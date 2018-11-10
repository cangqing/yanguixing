//pages/drivers/drivers.js
var publishRoute = require('../../utils/publishRoute.js');
const db = wx.cloud.database()

Page({
  /**
   * Page initial data
   */
  data: {
    isDriver: false,
    //推荐可接单的出行列表
    routes: null
  },
  detail: function (event) {
    wx.navigateTo({
      url: '../detail/detail?isDriver=' + this.data.isDriver
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({ isDriver: options.isDriver=='true'?true:false })
    console.log("this.data.isDriver:" + this.data.isDriver)
    if (this.data.isDriver)
      publishRoute.get_passenger_route(db, this)
    else
      publishRoute.get_driver_route(db, this)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  imageError: function (e) {
    console.log('image发生error事件，携带值为', e.detail.errMsg)
  }
})