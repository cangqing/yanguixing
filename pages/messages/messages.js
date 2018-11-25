var publishMessage = require('../../utils/publishMessage.js');
const db = wx.cloud.database()

Page({
  data: {
    partners: null
  },
  onLoad: function () {
    this.setData({
      partners: publishMessage.getPartners(db,this)
      })
  },
  chat: function (event) {
    wx.navigateTo({
      url: '../chat/chat?id=' + event.currentTarget.dataset.id,
      success: function (res) {
        console.log(res)
      }, fail: function (res) {
        console.log(res)
      }
    })
  }
})
