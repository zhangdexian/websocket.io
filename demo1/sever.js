var ws = require("nodejs-websocket");
var server = ws.createServer(function(conn){
	console.log('New Connection!');
	conn.on('text',function(str){
		console.log('receive' + str);
		conn.sendText(str.toUpperCase() + '!!!');
	})
	conn.on('close',function(code,reason){
		console.log('Connection closed');
	})

	//服务出现错误时用来处理错误，如果不加出现错误服务就会挂掉
	// conn.on('error',function(err){
	// 	console.log('handle error');
	// 	console.log(err);
	// })
}).listen('3000');                                                                                                                                                       
console.log('node websocket run listening on port 3000')