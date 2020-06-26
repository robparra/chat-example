// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

// app.get('/', (req, res)=>{
// 	res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket)=>{
// 	socket.on('chat message', (msg)=>{
// 		console.log('message: '+ msg);
// 	});
// 	console.log('user', socket.id, 'is connected');
// 	socket.on('disconnect', ()=>{
// 		console.log('user', socket.id, 'is disconnected');
// 	});
// 	socket.on('chat message' , (msg)=>{
// 		io.emit('chat message', msg);
// 	});
// 	socket.on('chat message', (data)=>{
// 		io.emit('chat message', data)
// 	});
// });

// http.listen(3000, ()=>{
// 	console.log('listening on *:3000');
// });





const path = require('path');
const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//archivos static
app.use(express.static(path.join(__dirname,'public')));

//empezar el server
const server = app.listen(app.get('port'),()=>{
	console.log('listening on port', app.get('port'));
});

//websockets
const SocketIO = require('socket.io');
const io = SocketIO.listen(server);

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
socket.on('disconnect', () => {
  console.log('user disconnected');
  });

  socket.on('chat:message', (data)=>{
  	io.sockets.emit('chat:message', data);
  });

  socket.on('chat:typing', (data)=>{
  	socket.broadcast.emit('chat:typing', data);
  });
});



