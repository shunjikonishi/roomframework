var http = require('http');
 
var server = http.createServer();
server.on('request', doRequest);
server.listen(process.env.PORT, process.env.IP);
console.log('Server running!');
 
// リクエストの処理
function doRequest(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World\n');
    res.end();
}
