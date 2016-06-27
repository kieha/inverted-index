var static = require('node-static');

var staticServer = new static.Server({
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    staticServer.serve(request, response);
  }).resume();
}).listen(8080);
