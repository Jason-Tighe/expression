import React, { useState, useEffect, useRef } from 'react';
export default function Review(props) {
	const [vent, setVent] = useState({});
	const titleInput = useRef(null); //similar to doc.querySelector('query')
	const bodyInput = useRef(null);
	const moodInput = useRef(null);

	const handleUpdate = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/vents/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: titleInput.current.value,
					body: bodyInput.current.value,
					mood: moodInput.current.value
				})
			});
			const data = await response.json();
			setVent(data);
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/home');
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/vents/${props.match.params.id}`);
				const data = await response.json();
				setVent(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/vents/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const deletedVent = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/home');
		}
	};

	return (
		<div id="form" className="fixed-bottom">
			<form onSubmit={handleUpdate} className="form-horizontal">
				<div className="form-group">
					<div className="col-sm-10 p-2">
						<input
							type="text"
							id="title"
							className="form-control"
							ref={titleInput}
							defaultValue={vent.title}
						/>
					</div>

					<div className="form-group p-2">
						<textarea
							type="text"
							id="body"
							className="form-control"
							ref={bodyInput}
							defaultValue={vent.body}
							rows="5"
						></textarea>
					</div>

					<div id="bubble" className="d-flex">
						<div className="p-1">
							<input
								type="radio"
								id="mood"
								className="ml-1"
								value="true"
								ref={moodInput}
								defaultValue={vent.mood}
								name="mood"
							/>
							<span className="p-1">Funky Fresh</span>
						</div>
						<div className="p-1">
							<input
								type="radio"
								id="mood"
								className="ml-1"
								value="false"
								ref={moodInput}
								defaultValue={vent.mood}
								name="mood"
							/>
							<span className="p-1">In a Funk</span>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-end">
					<button
						id="btn"
						className="p-1"
						className="btn btn-primary btn-block fixed-bottom"
						type="submit"
						value="update"
					>
						<span className="btn-label">
							<i className="far fa-paper-plane"></i>
						</span>
					</button>
					<button
						onClick={handleDelete}
						id="delete"
						className="btn btn-danger mx-4"
					>
						Forget!
					</button>
				</div>
			</form>
		</div>
	);
}
