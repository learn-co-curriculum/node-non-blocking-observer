var http = require('http')



  http.get({
      host: 'localhost',
      port: 3000,
      path: '/'
    }, function(response) {
      // Continuously update stream with data
      var body = ''
      response.on('data', function(d) {
        body += d
      })
      response.on('end', function() {
        // Data reception is done, do whatever with it!
        // var parsed = JSON.parse(body)
        // console.log(parsed)
        console.log(null, body)
    })
  })


// console.log(http.request.toString());
// http.request({
//     host: 'localhost',
//     port: 3000,
//     path: '/',
//     method: 'GET'
//   }, function(error, response) {
//     console.log('yo', response);
//     // Continuously update stream with data
//     var body = ''
//     response.on('data', function(d) {
//       body += d
//     })
//     response.on('end', function() {
//       // Data reception is done, do whatever with it!
//       var parsed = JSON.parse(body)
//       // console.log(parsed)
//       console.log(null, parsed)
//   })
// })