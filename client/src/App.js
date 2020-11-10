import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import * as EMISSIONS from './emissions';
import Messages from './messages';
import './App.css';

let socket;

function App() {
	const [messages, setMessages] = useState([]);
	const [currentMessage, setCurrentMessage] = useState('');

	useEffect(() => {
		socket = io('http://localhost:8001');

		socket.emit(EMISSIONS.JOIN_ROOM, 'Default Room');

		window.onbeforeunload = () => {
			console.log('unload');
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		socket.on(EMISSIONS.PUSH_MESSAGE, (message) => pushMessage(message));
	});

	const pushMessage = (message) => {
		let newMessages = messages;
		newMessages.push({ text: message, recieved: true });

		setMessages([...newMessages]);
	};

	const sendMessage = (e) => {
		e.preventDefault();

		socket.emit(EMISSIONS.SEND_MESSAGE, currentMessage);

		let newMessages = messages;
		newMessages.push({ text: currentMessage, recieved: false });

		setMessages([...newMessages]);
		setCurrentMessage('');
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Messages messages={messages} />
			<form onSubmit={(e) => sendMessage(e)}>
				<input
					type='text'
					className='text'
					value={currentMessage}
					onChange={(e) => setCurrentMessage(e.target.value)}
				/>
				<input className='submit' type='submit' value='Send' />
			</form>
		</div>
	);
}

export default App;
