//utils/publishMessage.js
var utils = require('util.js');

function sendMessage(db,collect,message){
  console.log(message)
  db.collection(collect).add({
    data:message,
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    },fail:function(res){
      console.log(res)
    }
  })
  var id = message.sender_openid +"&"+ message.receiver_openid
  db.collection("chat_partner").doc(id).set({
    data: { 
      sender_openid:message.sender_openid,
      receiver_openid: message.receiver_openid,
      receiver_nick: message.receiver_nick,
      receiver_avatar: message.receiver_avatar,
      updateTime: new Date().getTime
    },
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }, fail: function (res) {
      console.log(res)
    }
  })
}

function getMessages(db, that, condition) {
  db.collection('messages').where(condition).get({
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      that.setData({ messages: res.data })
      console.log(res)
    }, fail: function (res) {
      console.log(res)
    }
  })
}

function getPartners(db, that) {
  db.collection('chat_partner').where({}).get({
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      that.setData({ partners: res.data })
      console.log(res)
    }, fail: function (res) {
      console.log(res)
    }
  })
}

module.exports = {
  sendMessage: sendMessage,
  getMessages: getMessages,
  getPartners: getPartners
}