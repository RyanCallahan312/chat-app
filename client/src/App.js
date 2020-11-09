import './App.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import * as EMISSIONS from './emissions';

const socket = io('http://localhost:8001');

function App() {
	const [messages, setMessages] = useState([]);
	const [currentMessage, setCurrentMessage] = useState('');

	useEffect(() => {
		setMessages(() => {
			console.log('first');
			return messages.push({ text: currentMessage, recieved: false });
		});
		return () => socket.disconnect();
	}, []);

	const sendMessage = () => {
		socket.emit(EMISSIONS.SEND_MESSAGE, currentMessage);
		setMessages(() => {
			console.log('second');
			return messages.push({ text: currentMessage, recieved: false });
		});
	};

	return (
		<div>
			{messages.map((message) =>
				message && message.recieved ? (
					<div className='message incoming-message'>
						{message.text}
					</div>
				) : (
					<div className='message outgoing-message'>
						{message.text}
					</div>
				),
			)}
			<form onSubmit={sendMessage}>
				<input
					type='text'
					value={currentMessage}
					onChange={(e) => setCurrentMessage(e.target.value)}
				/>
				<input type='submit' value='Submit' />
			</form>
		</div>
	);
}

export default App;
