import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
	//opening statement
	const [statement, setStatement] = useState(true);
	const [form, setForm] = useState(false);
	const [icon, setIcon] = useState(true);
	//the array of posts
	const [vents, setVents] = useState([]);
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

	//Getting rid of the opening statment and loading a random post
	const swap = () => {
		setStatement(false);
		const random = vents[Math.floor(Math.random() * vents.length)];
		setOneVent(random);
	};

	const add = () => {
		setForm(!form);
		setIcon(!icon);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		e.target.reset();
		try {
			const response = await fetch('/api/vents/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newVent)
			});
			const data = await response.json();
			setVents([...vents, data]);
			setOneVent(data);
			//below is supposed to clear/reset the state of  the form... but doesnt... idk why.
			setNewVent({
				title: '',
				body: '',
				mood: true
			});
		} catch (err) {
			console.error(err);
		}
	};

	const partyPack = e => {
		handleSubmit(e);
		swap();
	};

	const handleChange = e => {
		setNewVent({ ...newVent, [e.target.id]: e.target.value });
	};

	//new post

	return (
		<div className="HomePage">
			<div>
				<div id="home" className="card container-md">
					{statement ? (
						<>
							<h1 className="card-header Display-4 text-center">
								{' '}
								Welcome to Funk!
							</h1>
							<p className="card-body text-center">
								Whether you're feeling Funky fresh or just not feeling it at
								all, we encourage you to express how you're feeling.
							</p>
							<p className="card-body text-center">
								Feel free to post anonymously how you feel. Not feeling great,
								or just want some laughs? Check out our MoodBoosters. Want to
								see how others are doing? Check out previous posts. Just want to
								talk it out, or lend an ear? Check out our Chat rooms.
							</p>

							{form ? (
								<>
									<button
										className="btn btn-lg btn-block"
										id="btn"
										onClick={swap}
									>
										<span className="btn-label">
											<i className="fas fa-dice"></i>
										</span>
									</button>
									<button
										className="btn btn-lg btn-block"
										id="btn"
										onClick={add}
									>
										{icon ? (
											<span className="btn-label">
												<i className="fas fa-plus-square"></i>
											</span>
										) : (
											<span className="btn-label">
												<i className="fas fa-minus-square"></i>
											</span>
										)}
									</button>
								</>
							) : (
								<>
									<div className="fixed-bottom">
										<button
											className="btn btn-lg btn-block"
											id="btn"
											onClick={swap}
										>
											<span className="btn-label">
												<i className="fas fa-dice"></i>
											</span>
										</button>
										<button
											className="btn btn-lg btn-block"
											id="btn"
											onClick={add}
										>
											{icon ? (
												<span className="btn-label">
													<i className="fas fa-plus-square"></i>
												</span>
											) : (
												<span className="btn-label">
													<i className="fas fa-minus-square"></i>
												</span>
											)}
										</button>
									</div>
								</>
							)}
						</>
					) : (
						<>
							<h3 className="text-center">
								<small>A Previous Funk:</small>
							</h3>
							<div className="card text-center">
								<h1 className="card-header text-center">{oneVent.title}</h1>

								<div>
									{oneVent.mood ? (
										<div className="card-body justify-content-center">
											<i className="far fa-grin" id="moodIcon">
												Awesome
											</i>
										</div>
									) : (
										<div className="card-body justify-content-center">
											<i className="far fa-frown-open" id="moodIcon">
												Not awesome
											</i>
										</div>
									)}
								</div>
								<p className="card-body">{oneVent.body}</p>
							</div>
							{form ? (
								<>
									<div className="d-flex card-footer justify-content-center">
										<button
											id="btn"
											className="btn-primary btn-lg btn-block"
											onClick={swap}
										>
											<span className="btn-label">
												<i className="fas fa-sync-alt"></i>
											</span>
										</button>
										<Link to={`/${oneVent._id}`}>
											<button
												className="btn-primary btn-lg btn-block"
												id="btn2"
											>
												<span className="t">
													<i className="fas fa-edit"></i>
												</span>
											</button>
										</Link>

										<button
											className="btn-primary btn-lg btn-block"
											id="btn"
											onClick={add}
										>
											{icon ? (
												<span className="btn-label">
													<i className="fas fa-plus-square"></i>
												</span>
											) : (
												<span className="btn-label">
													<i className="fas fa-minus-square"></i>
												</span>
											)}
										</button>
									</div>
								</>
							) : (
								<>
									<div className="fixed-bottom">
										<button
											id="btn"
											className="btn-primary btn-lg btn-block"
											onClick={swap}
										>
											<span className="btn-label">
												<i className="fas fa-sync-alt"></i>
											</span>
										</button>
										<button
											className="btn btn-lg btn-block"
											id="btn"
											onClick={add}
										>
											{icon ? (
												<span className="btn-label">
													<i className="fas fa-plus-square"></i>
												</span>
											) : (
												<span className="btn-label">
													<i className="fas fa-minus-square"></i>
												</span>
											)}
										</button>
									</div>
								</>
							)}
						</>
					)}
				</div>

				<div id="form" className="fixed-bottom">
					{form ? (
						<form onSubmit={partyPack} className="form-horizontal">
							<div className="form-group">
								<div className="col-sm-10 p-2">
									<input
										type="text"
										id="title"
										className="form-control"
										placeholder="Create a Title"
										onChange={handleChange}
									/>
								</div>

								<div className="form-group p-2">
									<textarea
										type="text"
										id="body"
										className="form-control"
										rows="5"
										placeholder="How was your day?"
										onChange={handleChange}
									></textarea>
								</div>

								<div id="bubble" className="d-flex">
									<div className="p-1">
										<input
											type="radio"
											id="mood"
											className="ml-1"
											value="true"
											name="mood"
											onChange={handleChange}
										/>
										<span className="p-1">Funky Fresh</span>
									</div>
									<div className="p-1">
										<input
											type="radio"
											id="mood"
											className="ml-1"
											value="false"
											name="mood"
											onChange={handleChange}
										/>
										<span className="p-1">In a Funk</span>
									</div>
								</div>
							</div>

							<button
								id="btn2"
								className="p-1"
								className="btn btn-primary btn-block fixed-bottom"
								type="submit"
								value="Add"
							>
								<span className="btn-label">
									<i className="far fa-paper-plane"></i>
								</span>
							</button>
						</form>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
}
