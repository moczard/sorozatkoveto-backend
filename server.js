import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import SocketIO from 'socket.io';
import config from './Utility/Configuration';
import movies from './RealTimeApi/Routes/MovieListRoutes';
import connectToDb from './Utility/DataBaseConnection';

const port = config.serverPort;

connectToDb();

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);
app.use(bodyParser.json());
app.use('/movies', movies);

//Index route
app.get('/', (req, res) => {
	res.send('Invalid endpoint!');
});

io.on('connection', function (socket) {
	console.log(JSON.stringify(socket.handshake.query));
	let token = socket.handshake.query.token;
	console.log(`Token: ${token} has been connected`);
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
	socket.emit('hello', { hello: 'world' });
});

server.listen(port, () => {
	console.log('server started, port: ', port);
});