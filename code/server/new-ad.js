var http = require("http");

var options = {
  host: '192.168.90.21',
  port: 8000,
  path: '/ad',
  method: 'POST'
};

var req = http.request(options, function(res){
	console.log('STATUS: ', res.statusCode);
	console.log('HEADERS: ', res.headers);
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
	    var obj = JSON.parse(chunk);
	    if (obj.result === "failure") {
			console.log("Failed to insert ad", obj.message)
	    } 
		else {
	    	console.log("Successfully sent ad to server, with id: ", obj.ad._id);
		}
	});
});

req.on('error', function(e) {
  console.log('problem with request: ', e.message);
});

req.setHeader("Content-Type", "application/json");

// write data to request body
req.write(JSON.stringify({
	title: "An Ad is here",
	body: "We have a lot of stuff for sale"
}));
req.end();