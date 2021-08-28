import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = props => {
	const [drop, setDrop] = useState(false);

	const handleClick = () => {
		setDrop(!drop);
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="/home">
					<h1 className="logo">Funk</h1>
					<p>Funk That!</p>
				</a>
				<div className="nav-bar-toggler" type="button" onClick={handleClick}>
					<span className="fas fa-bars"></span>
				</div>
				<div className="navbar-collapse">
					{drop ? (
						<ul>
							{props.routes.map(({ key, path }) => (
								<li key={key} className="nav-item">
									<Link className="naem" key={key} to={path}>
										{key}
									</Link>
								</li>
							))}
						</ul>
					) : (
						''
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
