const io = require('socket.io')();

const bindListeners = require('./listeners');

io.on('connection', (socket) => {
	console.log(`${socket.id} connected`);

	bindListeners(socket, io);
});

io.listen(process.env.PORT || 3000);
console.log(`Listening on port ${process.env.PORT || 3000}`);
