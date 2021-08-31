import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = props => {
	const [drop, setDrop] = useState(false);

	const handleClick = () => {
		setDrop(!drop);
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light">
				<div className="container-fluid">
					<a className="navbar-brand" href="/home">
						<div className="d-flex p-2">
							<h1 className="display-3 logo">Funk!</h1>
							<p className="p-1 slogan center">
								<small>Funk That!</small>
							</p>
						</div>
					</a>
					<div className="nav-bar-toggler" type="button" onClick={handleClick}>
						<span className="fas fa-bars"></span>
					</div>
				</div>
			</nav>
			<div className="navbar-collapse">
				{drop ? (
					<ul className="d-flex flex-column justify-content-end">
						{props.routes.map(({ key, path }) => (
							<li key={key} className="nav-item">
								<Link className="nav-link" id="linky" key={key} to={path}>
									{key}
								</Link>
							</li>
						))}
					</ul>
				) : (
					''
				)}
			</div>
		</>
	);
};

export default NavBar;
