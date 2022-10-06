var http = require('http')
var os = require('os')
var url = require('url')

const timer = require('timers/promises')

http.createServer(function (req, res) {

    var PREF="[NODE_JS_APP] ";

    var query = url.parse(req.url, true).query;
    var msg = "DUMMY"

    if (query['msg']) {
        msg = query['msg']
    }
      
    console.log("log: " + PREF + msg)
    console.error("error: " + PREF + msg)
    console.info("info: " + PREF + msg)
    console.trace("trace: " + PREF + msg)

    //zzz();


    res.writeHead(200, {'Content-Type': 'text/plain'})
    const host = os.hostname()
    const req_client = req.socket.remoteAddress
    const res_client = req.ip
    res.end(`Hello World host ${host} , req_client ${req_client} , res_client ${res_client}\n`)
}).listen(8080)



async function zzz() {
   console.log("before");
   const res = await timer.setTimeout(20000, 'result');
   console.log(res);
   console.log("shutdown");
   process.exit(1);
}
