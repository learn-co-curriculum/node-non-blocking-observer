var http = require('http')
var requestHandler = function(request, response) {
  response.write('Hello World,\n')
  response.end('Hello Node!\n')
}
var server = http.createServer(requestHandler)
server.listen(3000)