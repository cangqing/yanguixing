//app.js
//1.1引入sdk核心类（写在app.js中，其他页面用到直接引用
var QQMapWX = require('utils/qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
var conf = require('config.js');

App({
  onLaunch: function () {
    wx.cloud.init({
      env: conf.getCloudEnv()
    })
    var that = this;
    that.globalData.qqmapsdk = new QQMapWX({
      key: conf.getQqMapKey()
    });

    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.globalData.location = {
          latitude: latitude,
          longitude: longitude
        }
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + conf.getAppKey() + '&secret=' +conf.getAppSecret()+'&js_code=' + res.code + '&grant_type=authorization_code';
        wx.request({
          url: l,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          // header: {}, // 设置请求的 header  
          success: function (res) {
            console.log(res.data.openid)
            that.globalData.openid = res.data.openid
          }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})