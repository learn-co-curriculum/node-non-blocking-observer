var http = require('http')
var fs = require('fs')

var request = http.get('http://localhost:3000', function(response) {
  // Continuously update stream with data
  var body = ''
  response.on('data', function(chunk) {
    body += chunk
  })
  response.on('end', function() {
    // Data reception is done, do whatever with it!
    console.log(body)
    fs.writeFile('./crawler.html', body, function(){
      console.log('finished writing')
    })
  })
})

request.on('error', function(error){
  console.error(error)
})
