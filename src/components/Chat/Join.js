import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Join(props) {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	return (
		<div className="Chat">
			<div>
				<h1>Join</h1>
				<div>
					<input
						placeholder="Name"
						className="joinInput"
						type="text"
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="Room"
						className="joinInput"
						type="text"
						onChange={e => setRoom(e.target.value)}
					/>
				</div>
				<Link
					onClick={e => (!name || !room ? e.preventDefault() : null)}
					to={`/chat?name=${name}&room=${room}`}
				>
					<button className="button" type="submit"></button>
				</Link>
			</div>
		</div>
	);
}
