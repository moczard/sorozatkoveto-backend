import express from 'express';
import RatingsController from '../Controllers/RatingsController';
import ratings from '../Models/RatingsModel';

const router = express.Router();
const controller = new RatingsController(ratings);


router.get('/', async (req, res) => {
	const response = await controller.findRatingsForEpisode(req.query.seriesId, req.query.season, req.query.episode);
	if (response) {
		if (response.length) {
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

router.get('/:seriesId', async (req, res) => {
	const response = await controller.findRatingsForSeries(req.params.seriesId);
	if (response) {
		if (response.length) {
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
	const response = await controller.addRatingsForEpisode(req.body.seriesId, req.body.season, req.body.episode, req.body.rating);
	if (response) {
		res.send(response);
	} else {
		res.statusCode = 500;
		res.send('Error');
	}
});

router.post('/ids', async (req, res) => {
	const response = await controller.findAllBySeriesIds(req.body);
	if (response) {
		res.send(response);
	} else {
		res.statusCode = 500;
		res.send('Error');
	}
});


export default router;