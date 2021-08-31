require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;
const db = mongoose.connection;
const ventController = require('./controllers/vents');
//have to bring in http becuase we need to interact with it directly
const http = require('http');
const server = http.createServer(app);
//socket.io stuff
const socketio = require('socket.io');
const io = socketio(server);
const {
	addUser,
	removeUser,
	getUser,
	getUserInRoom
} = require('./controllers/users');

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
db.on('open', () => {
	console.log('Mongo is Connected');
});
/* Middleware */
app.use(express.json());
if (process.env.NODE_ENV !== 'development') {
	app.use(express.static('public'));
}

//run when  user connects
io.on('connection', socket => {
	console.log('socks on!');
	//io.emit is to everyone
	//.emit will go to just the user
	socket.emit('message', 'Welcome to FunkyChat!');

	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) return callback(error);

		socket.emit('message', {
			user: 'admin',
			text: `${user.name}, welcome to the room ${user.room}`
		});
		socket.broadcast
			.to(user.room)
			.emit('message', { user: 'admin', text: `${user.name}, has joined!` });

		socket.join(user.room);

		io.to(user.room).emit('roomData', {
			room: user.room,
			users: getUsersInRoom(user.room)
		});

		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit('message', { user: user.name, text: message });
		io.to(user.room).emit('roomData', {
			room: user.room,
			users: getUsersInRoom(user.room)
		});

		callback();
	});

	//broadcast.emit = sends it to everyone but the user.
	//when a user disconnects
	socket.on('disconnect', () => {
		const user = removeUser(sock.id);

		if (user) {
			io.to(user, room).emit('message', {
				user: 'admin',
				text: `${user.name} has left.`
			});
		}
	});
});

/* Controller Goes Here Remove the tes*/
app.use('/api/vents', ventController);
/* Controller Ends here */
//LISTENER

// for react router
app.get('*', (req, res) => {
	res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html')));
});

//i'm going to change this to server, should still work.
server.listen(PORT, () => {
	console.log(`API Listening on port ${PORT}`);
});

/* Vanilla Node Server
const http = require('http'); // The node http module allow you to create servers
const fs = require('fs'); // The node file system module allows you to create files and interact with file system
const path = require('path'); // path allows you to get the path of a folder etc.
const PORT = process.env.PORT || 8080;

const public = __dirname + '/public'

http.createServer(function (req, res) {
	let filePath = public + req.url;
	if (filePath == public + '/') {
	  filePath = public + '/index.html';
	}
  filePath = filePath.split('?')[0]

	let extName = String(path.extname(filePath)).toLowerCase();
	const mimeTypes = {
	'.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
	};

	let contentType = mimeTypes[extName] || 'application/octet-stream';
	fs.readFile(filePath, function(error, content) {
	if (error) {
	  if(error.code == 'ENOENT') {
	    fs.readFile(public + '/404.html', function(error, content) {
	      res.writeHead(404, {'Content-Type': 'text/html'});
	      res.end(content, 'utf-8');
	    });
	  }
	  else {
	    res.writeHead(500);
	    res.end('Sorry, you got an error bro here it is'+error.code+' ..\n');
	  }
	}
	else {
	   res.writeHead(200, { 'Content-Type': contentType });
	   res.end(content, 'utf-8');
	  }
	});
}).listen(PORT);

console.log(`Server started! Listening on port: ${PORT}`);
// basic node server without express serving
*/
