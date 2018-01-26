var ws = require("nodejs-websocket");
var countConnection = 0;
var server = ws.createServer(function(conn) {
    console.log('New Connection!');
    countConnection++;
    var msg = {};
    msg.timeStamp = Date.now();
    msg.userName = 'user' + countConnection;
    msg.type = 'enter';
    msg.data = '进入了聊天室';
    broadcast(JSON.stringify(msg));
    //broadcast([1,2,3,4]);    传数组在客户接收不到信息
    conn.on('text', function(str) {
        console.log('receive' + str);

        msg.type = 'content';
        msg.data = str;
        msg.timeStamp = Date.now();

        //将收到的数据（字符串）返回给客户端   并进行广播
        broadcast(JSON.stringify(msg));
    })

    conn.on('close', function(code, reason) {
    	msg.type = 'leave';
    	msg.timeStamp = Date.now();
    	msg.data = '离开了聊天室';
        console.log('Connection closed');
        broadcast(JSON.stringify(msg));
    })

    conn.on('error', function(err) {
        console.log('handle error');
        console.log(err);
    })

}).listen('3000');
console.log('node websocket run listening on port 3000')


//广播  给每一个连接的客户端发送消息
function broadcast(msg) {
    server.connections.forEach(connection => {
        connection.sendText(msg);
    })
}
