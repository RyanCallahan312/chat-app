const EMISSIONS = require('./emissions');

module.exports = function createListeners(socket, io) {
	socket.on(EMISSIONS.JOIN_ROOM, (roomCode) => {
		console.log(`${socket.id} ${EMISSIONS.JOIN_ROOM}`);
		socket.join(roomCode);
		socket.roomCode = roomCode;
	});

	socket.on(EMISSIONS.SEND_MESSAGE, (message) => {
		console.log(`${socket.id} ${EMISSIONS.SEND_MESSAGE}`);
		console.log(socket.roomCode);
		socket.to(socket.roomCode).emit(EMISSIONS.PUSH_MESSAGE, message);
	});

	socket.on(EMISSIONS.DISCONNECT, (reason) => {
		console.log(`${socket.id} ${reason}`);
	});
};
