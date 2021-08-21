import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
	const [vents, setVents] = useState([]);
	const [newVent, setNewVent] = useState({
		title: '',
		body: '',
		mood: true
	});

	//so in bookmarks this is used to bring in EVERY bookmark. I'd like to bring in 1 random previous post. For this i'll prob have to do something like data[math.floor(math.random()*data.length-1)]

	useEffect(() => {
		(async () => {
			try {
				const reponse = await fetch('/api/vents/');
				const data = await reponse.json();
				setVents(data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	return (
		<div className="HomePage">
			<h1>Previous Post:</h1>

			<div>
				{vents.map(vent => {
					return (
						<div key={vent._id}>
							<h1>{vent.title}</h1>
							<p>{vent.body}</p>
							<div>{vent.mood}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
