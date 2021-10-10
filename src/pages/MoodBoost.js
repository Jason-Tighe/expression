import React, { useState, useEffect } from 'react';
import WestQuote from '../components/WestQuote.js';
import Affirmation from '../components/Affirm';
import DadJoke from '../components/DadJoke';

export default function MoodBoost(props) {
	const [affirmation, setAffirmation] = useState({});
	const [west, setWest] = useState({});
	const [dad, setDad] = useState({});

	const getDad = async () => {
		try {
			const response = await fetch(
				'https://icanhazdadjoke.com/',
				{ headers: { Accept: 'application/json' } }
			);
			const data = await response.json();
			setDad(data);
		} catch (err) {
			console.error(err);
		}
	};

	const getAffirmation = async () => {
		try {
			const response = await fetch(
				'https://www.affirmations.dev/',
				{
					headers: {
						Accept: 'application/json'
					}
				}
			);
			const data = await response.json();
			setAffirmation(data);
			console.log('we almost made it');
		} catch (err) {
			console.error(err);
		}
	}

	const getWest = async () => {
		try {
			const response = await fetch('https://api.kanye.rest/');
			const data = await response.json();
			setWest({ ...data });
			console.log('we made it');
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getAffirmation();
		getWest();
		getDad();
	}, []);

	return (
		<div id="mood" className="jumbotron jumbotron-fluid">
			<div className="container">
				<h1>
					{Object.keys(west).length ? <WestQuote west={west} /> : 'No Yee'}
				</h1>
				<button className="btn-primary btn-block" id="btn" onClick={getWest}>
					More Yee
				</button>
			</div>
			<div className="container">
				<h1>
					{Object.keys(affirmation).length ? (
						<Affirmation affirmation={affirmation} />
					) : (
						'Affirm these hands'
					)}
				</h1>
				<button
					className="btn-primary btn-block"
					id="btn"
					onClick={getAffirmation}
				>
					Confirm for more Affirm
				</button>
			</div>
			<div className="container">
				<h1>
					{Object.keys(dad).length ? <DadJoke dad={dad} /> : 'Ask your mom...'}
				</h1>
				<button className="btn-primary btn-block" id="btn" onClick={getDad}>
					Hello Joke, I'm Dad
				</button>
			</div>
		</div>
	);
}
