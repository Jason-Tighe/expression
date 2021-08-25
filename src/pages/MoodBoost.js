import React, { useState, useEffect } from 'react';
import WestQuote from '/Users/slowdolphin/Desktop/seir-flex-hypatia/labs/expression/src/components/WestQuote.js';
import Affirmation from '/Users/slowdolphin/Desktop/seir-flex-hypatia/labs/expression/src/components/Affirm.js';

export default function MoodBoost(props) {
	const [affirmation, setAffirmation] = useState({});
	const [west, setWest] = useState({});

	const getAffirmation = async () => {
		try {
			const response = await fetch('https://www.affirmations.dev/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'cors',
				cache: 'default'
			});
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
		console.log('aff');
		getWest();
		console.log('west');
	}, []);

	return (
		<div className="jumbotron jumbotron-fluid">
			<div className="container">
				<h1>
					{Object.keys(west).length ? <WestQuote west={west} /> : 'No Yee'}
				</h1>
				<button className="btn-primary lead" onClick={getWest}>
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
				<button className="btn-primary lead" onClick={getAffirmation}>
					Confirm for more Affirm
				</button>
			</div>
		</div>
	);
}
