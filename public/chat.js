const socket = io()

//elementos del html
let message = document.getElementById('message');
let username = document.getElementById('username');
let button = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

button.addEventListener('click', function(){
	socket.emit('chat:message', {
		message:message.value,
		username:username.value
	});
});

button.addEventListener('click', function handleKeyPress(e){
 var key=e.keyCode || e.which; if (key==13){ searching(); }
});

message.addEventListener('keypress', function(){
	socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function(data){
	actions.innerHTML = '';
	output.innerHTML += `<p>
	<strong>${data.username}</strong>:${data.message}
	</p>`
});

socket.on('chat:typing', function(data){
	actions.innerHTML = `<p><em>${data} is typing</em></p>`
})