const io = require('socket.io')();

const bindListeners = require('./listeners');

io.on('connection', (socket) => {
	console.log(`${socket.id} connected`);

	bindListeners(socket, io);
});

io.listen(8001);
console.log("Listening on port 8001")
