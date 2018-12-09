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
  publishRoute: function (event) {
    var userInfo = getApp().globalData.userInfo
    var openId = getApp().globalData.openId
    var that=this
    db.collection('certificate').where({ _id: openId}).
      get({
        success: function (res) {
          if (res.data == null || res.data.length > 0) {
            var certificate = res.data[0]
            console.log(certificate)                        
            if(certificate.certificate_status !=1){
              wx.navigateTo({
                url: '../certificate/certificate'
              })
            }
            else {
              userInfo.openId = openId
              var route_collection = that.data.isDriver ? 'driver_route': 'passenger_route';
              console.log("publish " + route_collection)
              publishRoute.addRoute(db, route_collection, event, userInfo)
              wx.navigateTo({
                url: '../drivers/drivers?isDriver=' + that.data.isDriver
              })
            }
          }
        }, 
        fail: function (res) {
          console.log(res)
        }
      });
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
        getApp().globalData.city = city
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
      url: '../position/position?isStartPos=true&isDriver=' + this.data.isDriver
    })
  },
  inputEndPosition: function (e) {
    console.log("bindfocus end")
    wx.navigateTo({
      url: '../position/position?isStartPos=false&isDriver=' + this.data.isDriver
    })
  }
})