var http = require('http')
var os = require('os')
var url = require('url')

var CosmosClient = require('@azure/cosmos').CosmosClient;
var dotenv = require('dotenv');
dotenv.config();

const timer = require('timers/promises')
const key = process.env.COSMOS_KEY;
const endpoint = process.env.COSMOS_ENDPOINT;

const html = "<html><body>"
+ "<h1>Hello GitHub Actions</h1><br>"
+ "<img src='https://github.com/akubicharm/aro-githubactions/raw/master/src/media/Octocat.jpg'>"
//+ "<img src='https://github.com/akubicharm/aro-githubactions/raw/master/src/media/okd-panda-flat_rocketeer_with_number.svg'>"
+ "</body></html>"


http.createServer(function (req, res) {

    var PREF="[NODE_JS_APP] ";

    var query = url.parse(req.url, true).query;
    var name = "anonymous";

    if (query['name']) {
         name = query['name']
    }

    var req_client = req.socket.remoteAddress
    setDataAsync(req_client, name);

    //res.writeHead(200, {'Content-Type': 'text/plain'})
    //res.end(`Hello Github Actions`);
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    res.write(html);
    res.end();
}).listen(8080)


async function setDataAsync(req_client, name) {
  // Authenticate to Azure Cosmos DB
  const cosmosClient = new CosmosClient({ endpoint, key });
  const { database } = await cosmosClient.databases.createIfNotExists({id: "mydb"});
  const { container } = await database.containers.createIfNotExists({
    id: "mycont",
    partitionKey: {
        paths: "/id"
    }
  });


  item = {"AccessDatetime": Date.now(), "Client Addr": req_client, "Name": name}
  const { resource } = await container.items.create(item);
  console.log(`'${resource}' inserted`);
}


