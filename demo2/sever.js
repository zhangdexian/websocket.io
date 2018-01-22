var ws = require("nodejs-websocket");
var countConnection = 0;
var server = ws.createServer(function(conn){
	console.log('New Connection!');
	countConnection++;
	conn.nickName = 'user' + countConnection;
	broadcast(conn.nickName + '进入了聊天室');
	conn.on('text',function(str){
		console.log('receive' + str);

		//将收到的数据（字符串）返回给客户端   并进行广播
		broadcast(str);
	})

	conn.on('close',function(code,reason){
		console.log('Connection closed');
		broadcast(conn.nickName + '离开了聊天室');
	})

	conn.on('error',function(err){
		console.log('handle error');
		console.log(err);
	})

}).listen('3000');                                                                                                                                                       
console.log('node websocket run listening on port 3000')


//广播  给每一个连接的客户端发送消息
function broadcast (msg){
	server.connections.forEach(connection=>{
		connection.sendText(msg);
	})
}