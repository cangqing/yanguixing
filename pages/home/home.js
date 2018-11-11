//index.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
var publishRoute = require('../../utils/publishRoute.js');
const db = wx.cloud.database()

Page({
  data: {
    isDriver: false,
    //具体位置
    startLocation:null,
    endLocation:null,
    dateTimeArray: null,
    dateTime: null
  },
  //事件处理函数
  bindViewTap: function () {

  },
  passengerTabed: function () {
    this.setData({ isDriver: false })
  },
  driverTabed: function (event) {
    console.log(event)
    this.setData({ isDriver: true })
  },
  publishPassengerRoute: function (event){
    console.log(event)
    publishRoute.addRoute(db, 'passenger_route', event, getApp().globalData.userInfo)
    wx.navigateTo({
      url: '../drivers/drivers?isDriver=' + this.data.isDriver
    })
    publishRoute.get_driver_route(db, this)
  },
  publishDriverRoute: function (event) {
    console.log(event)
    publishRoute.addRoute(db, 'driver_route', event, getApp().globalData.userInfo)
    wx.navigateTo({
      url: '../drivers/drivers?isDriver=' + this.data.isDriver
    })
  },
  changeDateTime: function(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTimeColumn: function(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  onLoad: function (option) {
    var timePicker = dateTimePicker.dateTimePicker(2018, 2028); 
    // 精确到分的处理，将数组的秒去掉
    var lastArray = timePicker.dateTimeArray.pop();
    var lastTime = timePicker.dateTime.pop();

    this.setData({
      dateTime: timePicker.dateTime,
      dateTimeArray: timePicker.dateTimeArray
    });
    var that = this;
    getApp().globalData.qqmapsdk.reverseGeocoder({
      location: {
        latitude: getApp().globalData.location.latitude,
        longitude: getApp().globalData.location.longitude
      },
      success: function (res) {
        console.log(res);
        const { city } = res.result.address_component
        console.log(res.result.address);
        that.setData({ address: res.result.address })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  inputStartPosition: function (e) {
    console.log("bindfocus start")
    wx.navigateTo({
      url: '../index/index?isStartPos=true&isDriver=' + this.data.isDriver
    })
  },
  inputEndPosition: function (e) {
    console.log("bindfocus end")
    wx.navigateTo({
      url: '../index/index?isStartPos=false&isDriver=' + this.data.isDriver
    })
  }
})