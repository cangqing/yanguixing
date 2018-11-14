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
      // endPoint: new db.Geo.Point(113, 23),
      startLocation: {
        address:event.detail.value.startLocation,
        addr: event.detail.value.startAddr,
        longitude: event.detail.value.startLongitude,                           latitude:event.detail.value.startLatitude
      },
      endLocation: {
        address:event.detail.value.endLocation,
        addr: event.detail.value.endAddr,
        longitude: event.detail.value.endLongitude, 
        latitude:event.detail.value.endLatitude
      },
      price: event.detail.value.price,
      routeTime: event.detail.value.routeTime,
      routeTimeMills: new Date(event.detail.value.routeTimeMills).getTime()
    },
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    },fail:function(res){
      console.log(res)
    }
  })
}

function get_driver_route(db, that, condition){
  var coll=db.collection('driver_route')
  if (condition != null)
    coll = coll.where(condition)
  coll.get({
      success: function (res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        that.setData({ routes: res.data})
        console.log(res.data)
      },
      fail: function (res) {
          console.log(res)
      }
    })
}

function get_passenger_route(db, that,condition) {
  var coll=db.collection('passenger_route');
  if(condition!=null)
    coll=coll.where(condition)
  coll.get({
    success: function (res) {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      that.setData({ routes: res.data })
      console.log(res.data)
    },
    fail: function (res) {
      console.log(res)
    }
  })
}

function get_bargin_route(db, that, condition) {
  var coll = db.collection('bargin_route');
  if (condition != null)
    coll = coll.where(condition)
  coll.get({
    success: function (res) {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      that.setData({ routes: res.data })
      console.log(res.data)
    },
    fail: function (res) {
      console.log(res)
    }
  })
}

function save_certificate_images(db,arr){
  db.collection('certificate').add({
    data: {
      fileIds: arr
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }, 
      fail: function(res) {
        console.log(res)
      }
  })
}

function get_one_certificate(db, condition,that) {
  db.collection('certificate').where(condition).
   get({
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res.data)
      if (res.data != null && res.data.length>0){
        var certificate = res.data[0]
        wx.cloud.getTempFileURL({
          fileList: certificate.fileIds,
          success: res => {
            // get temp file URL
            var images = []
            console.log(res.fileList)
            for (let img of res.fileList){
              images.push(img.tempFileURL)
            }
            that.setData({ certificate: certificate, images: images })
            console.log(images)
          },
          fail: err => {
            // handle error
          }
        })
      }
    },
    fail: function (res) {
      console.log(res)
    }
  })
}

module.exports = {
  addRoute: addRoute,
  get_driver_route:get_driver_route,
  get_passenger_route:get_passenger_route,
  get_bargin_route: get_bargin_route,
  save_certificate_images:save_certificate_images,
  get_one_certificate: get_one_certificate
}