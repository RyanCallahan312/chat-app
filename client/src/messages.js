import './messages.css';
import { useEffect, useRef } from 'react';

export default function Messages({ messages }) {
	return (
		<div className='message-container'>
			{messages.map((message) => {
				return message && message.recieved ? (
					<div className='message-bubble incoming-message'>
						<p className='message'>{message.text}</p>
					</div>
				) : (
					<div className='message-bubble outgoing-message'>
						<p className='message'>{message.text}</p>
					</div>
				);
			})}
			<AlwaysScrollToBottom />
		</div>
	);
}

const AlwaysScrollToBottom = () => {
	const elementRef = useRef();
	useEffect(() => elementRef.current.scrollIntoView());
	return <div ref={elementRef} />;
};
