import React, { useState, useEffect } from 'react';

export default function App(props) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/vents');
				const data = await response.json();
				setPosts(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/vents/${vent._id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const deletedPost = await response.json();
		} catch (error) {
			console.error(error);
		}
	};

	const handleRemove = e => {
		setPosts({ ...posts, [e.target.key]: e.target.value });
	};

	return (
		<ul className="card">
			{posts.map(post => {
				return (
					<li className="col" key={post._id} onChange={handleRemove}>
						<h1 className="row">{post.title}</h1>
						<p> {post.body}</p>
						<button onClick={handleDelete} className="row-2 btn btn-danger">
							Forget!
						</button>
					</li>
				);
			})}
		</ul>
	);
}
