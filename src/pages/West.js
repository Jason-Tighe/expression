import React, { useState, useEffect } from 'react';
import WestQuote from '/Users/slowdolphin/Desktop/seir-flex-hypatia/labs/expression/src/components/WestQuote.js';

export default function Westy(props) {
	const [west, setWest] = useState({});

	const getWest = async () => {
		try {
			const response = await fetch('https://api.kanye.rest/');
			const data = await response.json();
			setWest({ ...data });
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getWest();
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
		</div>
	);
}
