var fs = require("fs"),
	http = require("http"),
	path = require("path");

http.createServer(function(request,response){
	var fileName = "src/app/index.html",
		contentType = "text/html";
	if( request.url !== "/"){
		var extName = path.extname(request.url);
		fileName = request.url.replace("/","");
		switch (extName) {
		    case '.js':
		        contentType = 'text/javascript';
		        break;
		    case '.html':
		        contentType = 'text/html';
		        break;
		    case '.css':
		        contentType = 'text/css';
		        break;
		    case '.json':
		        contentType = 'application/json';
		        break;
		    case '.png':
		        contentType = 'image/png';
		        break;
		    case '.jpg':
		        contentType = 'image/jpg';
		        break;
		    case '.wav':
		        contentType = 'audio/wav';
		        break;
		}
	}
	/*fs.readFile(fileName,function(err,data){
		response.writeHead("200",{"content-type":contentType});
		response.end(data);
	});*/
	//var fs = require('fs');
	fs.writeFile("/tmp/trades.txt", JSON.stringify( trades.json ), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
}).listen(8001);
console.log("Server Started 8001");