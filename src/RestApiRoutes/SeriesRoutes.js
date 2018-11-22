import express from 'express';
import SeriesController from '../Controllers/SeriesController';
import series from '../Models/SeriesModel';
import Mapper from '../TvMaze/TvMazeMapper';
import Api from '../TvMaze/TvMazeApi';

const mapper = new Mapper();
const api = new Api(mapper);
const router = express.Router();
const controller = new SeriesController(series, api);


router.get('/populate', async (req, res) => {
	const response = await controller.populateDB();
	if (response) {
		res.send('Success');
	} else {
		res.statusCode = 500;
		res.send('Error');
	}
});

router.get('/genres', async (req, res) => {
	const response = await controller.getGenres();
	if (response) {
		res.send(response);
	} else {
		res.statusCode = 500;
		res.send('Error');
	}
});

router.get('/', async (req, res) => {
	const { query } = req;
	let response;
	if (query.genre) {
		response = await controller.findByGenre(query.genre, query.skip, query.limit);
	} else if (query.title) {
		response = await controller.findByTitle(query.title, query.skip, query.limit);
	} else {
		res.statusCode = 500;
		res.send('Error');
		return;
	}

	if (response) {
		if(response.length) {
			res.send(response);
		} else {
			res.statusCode = 404;
			res.send('No results');
		}
	} else {
		res.statusCode = 500;
		res.send('Error');
	}
});

router.post('/', async (req, res) => {
	const response = await controller.findAllByIds(req.body);
	if (response) {
		res.send(response);
	} else {
		res.statusCode = 500;
		res.send('Error');
	}
});

export default router;