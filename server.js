import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import SocketIO from 'socket.io';
import config from './src/Utility/Configuration';
import series from './src/RestApiRoutes/SeriesRoutes';
import userData from './src/RestApiRoutes/UserDataRoutes';
import ratings from './src/RestApiRoutes/RatingsRoutes';
import connectToDb from './src/Utility/DataBaseConnection';
import SeriesController from './src/Controllers/SeriesController';
import seriesModel from './src/Models/SeriesModel';
import UserDataController from './src/Controllers/UserDataController';
import userDataModel from './src/Models/UserDataModel';
import RatingsController from './src/Controllers/RatingsController';
import ratingsModel from './src/Models/RatingsModel';

const port = config.serverPort;

connectToDb();

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);
app.use(bodyParser.json());
app.use('/series', series);
app.use('/user', userData);
app.use('/ratings', ratings);

//Index route
app.get('/', (req, res) => {
	res.send('Invalid endpoint!');
});

io.on('connection', function (socket) {
	let emailHash = socket.handshake.query.emailHash;
	console.log(`emailHash: ${emailHash} has been connected`);
	const seriesController = new SeriesController(seriesModel);
	const userDataController = new UserDataController(userDataModel);
	const ratingsController = new RatingsController(ratingsModel);
	
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});


	// series
	socket.on('genres', async () => {
		const response = await seriesController.getGenres();
		socket.emit('genres', response);
	});

	socket.on('findByTitle', async (data) => {
		const series = await seriesController.findByTitle(data.title, data.skip, data.limit);
		socket.emit('series', series);
	});

	socket.on('findByGenre', async (data) => {
		const series = await seriesController.findByGenre(data.genre, data.skip, data.limit);
		socket.emit('series', series);
	});

	socket.on('findAllByIds', async (data) => {
		const series = await seriesController.findAllByIds(data.ids);
		socket.emit('series', series);
	});

	// userData
	socket.on('getByEmailHash', async (data) => {
		const userData = await userDataController.getByEmailHash(data.emailHash);
		socket.emit('user', userData);
	});

	socket.on('addUser', async (data) => {
		const response = await userDataController.addUser(data.emailHash);
		socket.emit('dbresponse', response);
	});

	socket.on('addToWatched', async (data) => {
		const response = await userDataController.addToWatched(data.emailHash, data.seriesId, data.season, data.episode);
		socket.emit('dbresponse', response);
		const userData = await userDataController.getByEmailHash(data.emailHash);
		socket.emit('user', userData);
	});

	socket.on('addToFollowed', async (data) => {
		const response = await userDataController.addToFollowed(data.emailHash, data.seriesId);
		socket.emit('dbresponse', response);
		const userData = await userDataController.getByEmailHash(data.emailHash);
		socket.emit('user', userData);
	});

	// ratings
	socket.on('findRatingsForEpisode', async (data) => {
		const ratings = await ratingsController.findRatingsForEpisode(data.seriesId, data.season, data.episode);
		socket.emit('ratings', ratings);
	});

	socket.on('findRatingsForSeries', async (data) => {
		const ratings = await ratingsController.findRatingsForSeries(data.seriesId);
		socket.emit('ratings', ratings);
	});

	socket.on('findAllBySeriesIds', async (data) => {
		const ratings = await ratingsController.findAllBySeriesIds(data.seriesIds);
		socket.emit('ratings', ratings);
	});

	socket.on('addRatingsForEpisode', async (data) => {
		const response = await ratingsController.addRatingsForEpisode(data.seriesId, data.season, data.episode, data.rating);
		socket.emit('dbresponse', response);
		socket.broadcast.emit('ratingsChange');
		socket.emit('ratingsChange');
	});
});

server.listen(port, () => {
	console.log('server started, port: ', port);
});