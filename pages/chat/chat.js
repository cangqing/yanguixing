//logs.js
var util = require('../../utils/util.js')
var publishMessage = require('../../utils/publishMessage.js');
const db = wx.cloud.database()

Page({
  data: {
    //当前聊天内容
    message: '',
    //聊天记录
    messages:null,
    logs:null
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
    publishMessage.getMessages(db,this,{})
  },
  input: function (e) {
    this.data.message = e.detail.value
  },
  send: function (e) {
    var data = {
      receiver_openid: '222',
      sender_openid: '111',
      sender_nick: getApp().globalData.userInfo.nickName,
      receiver_nick: getApp().globalData.userInfo.nickName,
      sender_avatar: getApp().globalData.userInfo.avatarUrl,
      receiver_avatar: getApp().globalData.userInfo.avatarUrl,
      content: this.data.message,
    }
    publishMessage.sendMessage(db,'messages',data)
  }
})
