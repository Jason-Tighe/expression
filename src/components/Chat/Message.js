import React from 'react';

const Message = ({ message: { text, user }, name }) => {
	let isSentByCurrentUser = false;

	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		isSentByCurrentUser = true;
	}

	return isSentbyCurrentUSer ? (
		<div className="messageContainer justifyEnd">
			<p className="sentText pr-10">{trimmedName}</p>
			<div className="messageBox">
				<p className="messageText colorWhite">{text}</p>
			</div>
		</div>
	) : (
		<div className="messageContainer justifyStart">
			<div className="messageBox">
				<p className="messageText colorDark">{text}</p>
			</div>
			<p className="sentText">{trimmedName}</p>
		</div>
	);
};

export default Message;
