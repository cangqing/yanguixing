// pages/drivers/drivers.js
var publishRoute = require('../../utils/publishRoute.js');
const db = wx.cloud.database()

Page({
  /**
   * Page initial data
   */
  data: {
    isDriver:false,
    routes:null
  },

  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  formSubmit: function (e) {
    console.log(e.detail.formId)
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var isDriver=(options.isDriver == 'true' ? true : false);
    var routeId=options.routeId
    console.log(options)
    if (isDriver)
      publishRoute.get_driver_route(db, this, { _id: routeId})
    else
      publishRoute.get_passenger_route(db, this, { _id: routeId })
    this.setData({
      isDriver: isDriver,
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

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
  onPay: function () {
    wx.requestPayment(
      {
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success': function (res) { console.log(res) },
        'fail': function (res) { console.log(res) },
        'complete': function (res) { console.log(res) }
      })
  },
  imageError: function (e) {
    console.log('image发生error事件，携带值为', e.detail.errMsg)
  }
})