import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
	//opening statement
	const [statement, setStatement] = useState(true);
	//the array of posts
	const [vents, setVents] = useState({});
	//1 post
	const [oneVent, setOneVent] = useState('');
	//new post
	const [newVent, setNewVent] = useState({
		title: '',
		body: '',
		mood: true
	});

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

	//loading a random post
	const handleClick = () => {
		const random = vents[Math.floor(Math.random() * vents.length)];
		setOneVent(random);
	};
	//Getting rid of the opening statment and loading a random post
	const swap = () => {
		setStatement(false);
		const random = vents[Math.floor(Math.random() * vents.length)];
		setOneVent(random);
	};

	const handleSubmit = async () => {
		e.preventDefault();
		try {
			const response = await fetch('/api/vents/', {
				method: 'POST',
				headers: {
					'content-Type': 'application/json'
				},
				body: JSON.stringify(newVent)
			});
			const data = await response.json();
			setVents([...vents, data]);
			setNewVent({
				title: '',
				body: '',
				mood: true
			});
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = e => {
		setNewVent({ ...newBookmark, [e.target.id]: e.target.value });
	};

	//new post

	return (
		<div className="HomePage">
			<div>
				<div>
					{statement ? (
						<>
							<h1> Welcome to Funk!</h1>
							<p>
								Whether you're feeling Funky fresh or just not feeling it at
								all, we encourage you to express how you're feeling.
							</p>
							<p>
								Feel free to post anonymously how you feel. Not feeling great,
								or just want some laughs? Check out our MoodBoosters. Want to
								see how others are doing? Check out previous posts. Just want to
								talk it out, or lend an ear? Check out our Chat rooms.
							</p>
							<button
								className="btn-success btn-lg btn-block"
								id="btn"
								onClick={swap}
							>
								<span className="btn-label">
									<i className="fas fa-dice"></i>
								</span>
							</button>
						</>
					) : (
						<>
							<h1>A Previous Funk:</h1>
							<h1>{oneVent.title}</h1>
							<p>{oneVent.body}</p>
							<div>
								{oneVent.mood ? (
									<div>
										<i className="far fa-grin">Awesome</i>
									</div>
								) : (
									<div>
										<i className="far fa-frown-open">Not awesome</i>
									</div>
								)}
							</div>
							<button
								className="btn-primary btn-lg btn-block"
								onClick={handleClick}
							>
								<span className="btn-label">
									<i className="fas fa-sync-alt"></i>
								</span>
							</button>
						</>
					)}
				</div>
				<div className="container">
					<form onSubmit={handleSubmit} className="row">
						<input
							type="text"
							id="title"
							className="col-sm"
							placeholder="Make it memorable"
							onChange={handleChange}
						/>
						<input
							type="text"
							id="body"
							className="col-sm"
							placeholder="Please Include HTTPS"
							onChange={handleChange}
						/>
						<div>
							<input
								type="radio"
								id="mood"
								className="col-sm"
								value="true"
								onChange={handleChange}
							/>
							<lable for="true">Funky Fresh</lable>
						</div>
						<div>
							<input
								type="radio"
								id="mood"
								className="col-sm"
								value="false"
								onChange={handleChange}
							/>
							<lable for="false">In a Funk</lable>
						</div>

						<button
							className="col-sm btn btn-primary"
							type="submit"
							value="Add"
						>
							<span className="btn-label">
								<i className="bi bi-save"></i>
							</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
