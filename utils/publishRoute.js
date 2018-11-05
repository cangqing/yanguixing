var utils = require('util.js');

function addRoute(db,collect,event,userInfo){
  //console.log(event.detail.value.endLocation)
  db.collection(collect).add({
    // data 字段表示需新增的 JSON 数据
    data: {
      // _id: 'todo-identifiant-aleatoire', 
      // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      publishDate: utils.formatTime(new Date()),
      userInfo: userInfo,
      // startPoint: new db.Geo.Point(event.detail.value.logitude, event.detail.value.latitude),
      // endPoint: new db.Geo.Point(113, 23),
      startLocaion: event.detail.value.startLocaion,
      endLocaion: event.detail.value.endLocation,
      price: event.detail.value.price,
      routeTime: event.detail.value.routeTime
    },
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    },fail:function(res){
      console.log(res)
    }
  })
}

function get_driver_route(db, that){
  db.collection('driver_route').get({
      success: function (res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        that.setData({ driverRoute: res.data})
        console.log(res.data)
      },
      fail: function (res) {
          console.log(res)
      }
    })
}

function get_passenger_route(db, that) {
  db.collection('passenger_route').get({
    success: function (res) {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      that.setData({ passengerRoute: res.data })
      console.log(res.data)
    },
    fail: function (res) {
      console.log(res)
    }
  })
}

module.exports = {
  addRoute: addRoute,
  get_driver_route:get_driver_route
}