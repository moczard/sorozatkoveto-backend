import express from 'express';
import UserDataController from '../Controllers/UserDataController';
import userData from '../Models/UserDataModel';

const router = express.Router();
const controller = new UserDataController(userData);


router.get('/:emailHash', async (req, res) => {
	const response = await controller.getByEmailHash(req.params.emailHash);
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

router.put('/:emailHash', async (req, res) => {
	const response = await controller.addUser(req.params.emailHash);
	if (response) {
		res.send(response);
	} else {
		res.statusCode = 500;
		res.send('Error');
	}
});

router.post('/:emailHash', async (req, res) => {
	const response = await controller.addToWatched(req.params.emailHash, req.body.seriesId, req.body.season, req.body.episode);
	if (response) {
		res.send(response);
	} else {
		res.statusCode = 500;
		res.send('Error');
	}
});

router.post('/follow/:emailHash', async (req, res) => {
	const response = await controller.addToFollowed(req.params.emailHash, req.body.seriesId);
	if (response) {
		res.send(response);
	} else {
		res.statusCode = 500;
		res.send('Error');
	}
});


export default router;