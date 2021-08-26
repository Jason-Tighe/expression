import React from 'react';

const DadJoke = props => {
	return (
		<div className="card text-center">
			<div className="card-header"></div>
			<div className="card-body">
				<h1 className="card-body">{props.dad.joke}</h1>
			</div>
			<div className="card-footer text-muted"></div>
		</div>
	);
};

export default DadJoke;
