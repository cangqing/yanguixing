//index.js
var dateTimePicker = require('../../utils/dateTimePicker.js');

Page({
  data: {
    isDriver: false,
    address: '',
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
  detail: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '../detail/detail?isDriver=' + this.data.isDriver
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
  }
})