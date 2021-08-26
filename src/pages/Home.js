import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
	const [vent, setVent] = useState({});
	const [oneVent, setOneVent] = useState('');
	const [newVent, setNewVent] = useState({
		title: '',
		body: '',
		mood: true
	});

	const getVent = async () => {
		try {
			const response = await fetch('/api/vents/');
			const data = await response.json();
			setVent(data);
			console.log('we made it');
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getVent();
	}, []);

	//
	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const reponse = await fetch('/api/vents/');
	// 			const data = await reponse.json();
	// 			setVents(data);
	// 		} catch (err) {
	// 			console.error(err);
	// 		}
	// 	})();
	// }, []);
	//
	// const handleClick = () => {
	// 	const random = vents[Math.floor(Math.random() * vents.length)];
	// 	setOneVent(random);
	// };
	// <h1>{oneVent.title}</h1>
	// <p>{oneVent.body}</p>
	// <div>{oneVent.mood ? 'Feeling Good' : 'Not so great'}</div>
	// <button onClick={handleClick}>Click me</button>

	return (
		<div className="HomePage">
			<h1>Previous Post:</h1>

			<div>
				<div>
					{Object.keys(vent).length ? (
						<div>
							<h1>{vent.title}</h1> <p>{vent.body}</p>
						</div>
					) : (
						'No Yee'
					)}
				</div>
				<button className="btn-primary lead" onClick={getVent}>
					More Yee
				</button>
			</div>
		</div>
	);
}
