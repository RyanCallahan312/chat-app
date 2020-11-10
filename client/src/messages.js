import './messages.css';

export default function Messages({ messages }) {
	return messages.map((message) => {
		return message && message.recieved ? (
			<div className='message incoming-message'>{message.text}</div>
		) : (
			<div className='message outgoing-message'>{message.text}</div>
		);
	});
}
