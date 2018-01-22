var app = require('http').createServer();

var io = require('socket.io')(app);

var countConnection = 0;

const PORT = 3000;

app.listen(PORT);


io.on('connection',function(socket){
    countConnection++;
    socket.userName = 'user' + countConnection;
    io.emit('enter',socket.userName + 'comes in');

    socket.on('message',function (str){
        io.emit('message',socket.userName + 'says：' + str);
    })

    socket.on('disconnect',function (){
        io.emit('leave',socket.userName + 'left');
    })
})

console.log('node websocket run listening at port %d',PORT);