var http = require('http')
var requestHandler = function(request, response) {
  response.end('Hello World\n')
}
var server = http.createServer(requestHandler)
server.listen(3000)