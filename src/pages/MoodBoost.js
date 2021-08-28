import React, { useState, useEffect } from 'react';
import WestQuote from '/Users/slowdolphin/Desktop/seir-flex-hypatia/labs/expression/src/components/WestQuote.js';
import Affirmation from '/Users/slowdolphin/Desktop/seir-flex-hypatia/labs/expression/src/components/Affirm.js';
import DadJoke from '/Users/slowdolphin/Desktop/seir-flex-hypatia/labs/expression/src/components/DadJoke.js';

export default function MoodBoost(props) {
	const [affirmation, setAffirmation] = useState({});
	const [west, setWest] = useState({});
	const [dad, setDad] = useState({});

	const getDad = async () => {
		try {
			const response = await fetch(
				'http://localhost:8080/https://icanhazdadjoke.com/',
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
				'http://localhost:8080/https://www.affirmations.dev/',
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
	};

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
		<div className="jumbotron jumbotron-fluid">
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
