import React, { useState, useEffect } from 'react';
//this will allow us to pull from the url
const queryString = require('query-string');
import io from 'socket.io-client';
import PORT from '/Users/slowdolphin/Desktop/seir-flex-hypatia/labs/expression/server.js';

import InfoBar from '/Users/slowdolphin/Desktop/seir-flex-hypatia/labs/expression/src/components/Chat/InfoBar.js';
import Input from '/Users/slowdolphin/Desktop/seir-flex-hypatia/labs/expression/src/components/Chat/Input.js';
import Messages from '/Users/slowdolphin/Desktop/seir-flex-hypatia/labs/expression/src/components/Chat/Messages.js';
import TextContainer from '/Users/slowdolphin/Desktop/seir-flex-hypatia/labs/expression/src/components/Chat/TextContainer.js';

let socket;

export default function ChatRoom(props) {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	// const ENDPOINT = PORT;

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);
		socket = io(PORT);
		setName(name);
		setRoom(room);
		socket.emit('join', { name, room }, () => {});
		return () => {
			socket.emit('disconnect');
			socket.off();
		};
	}, [PORT, location.search]);

	useEffect(() => {
		socket.on('message', message => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	const sendMessage = e => {
		e.preventDefault;
		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar room={room} />
				<Messages message={message} name={name} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
			<TextContainer users={user} />
		</div>
	);
}
