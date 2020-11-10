import './messages.css';
import { useEffect, useRef } from 'react';

export default function Messages({ messages }) {
	return (
		<div className='message-container'>
			{messages.map((message) => {
				return message && message.recieved ? (
					<div className='message incoming-message'>
						{message.text}
					</div>
				) : (
					<div className='message outgoing-message'>
						{message.text}
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
