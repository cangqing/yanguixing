function save_certificate_images(db,openid,arr){
  db.collection('certificate').doc(openid).set({
    data: {
      fileIds: arr,
      certificate_status:0
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
            that.setData({ certificate: certificate})
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
  save_certificate_images:save_certificate_images,
  get_one_certificate: get_one_certificate
}