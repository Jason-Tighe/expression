import React from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';
import Review from '../pages/Review';
// import Join from '../components/Chat/Join';
// import Chat from '../components/Chat/ChatRoom';
// <Route path={'/'} exact component={Join}></Route>
// <Route path={'/chat'} component={Chat}></Route>

const AppRouter = () => {
	return (
		<Router>
			<NavBar routes={routes} />
			<Switch>
				{routes.map(({ Component, key, path }) => (
					<Route
						key={key}
						path={path}
						exact
						component={() => <Component page={key} />}
					></Route>
				))}
				<Route
					path={'/:id'}
					render={routerProps => <Review {...routerProps} />}
				></Route>
			</Switch>
		</Router>
	);
};

export default AppRouter;
