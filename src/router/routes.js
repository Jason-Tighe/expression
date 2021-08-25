import React from 'react';
import App from '../pages/App';
import Chat from '../pages/Chat';
import Home from '../pages/Home';
import MoodBoost from '../pages/MoodBoost';

const routes = [
	{
		Component: MoodBoost,
		key: 'MoodBoost',
		path: '/MoodBoost'
	},
	{
		Component: Home,
		key: 'Home',
		path: '/home'
	},
	{
		Component: Chat,
		key: 'Chat',
		path: '/chat'
	},
	{
		Component: App,
		key: 'App',
		path: '/'
	}
];

export default routes;
