import express from 'express';
import SeriesController from '../Controllers/SeriesController';
import series from '../Models/SeriesModel';
import Mapper from '../TvMaze/TvMazeMapper';
import Api from '../TvMaze/TvMazeApi';

const mapper = new Mapper();
const api = new Api(mapper);
const router = express.Router();
const controller = new SeriesController(series, api);

router.get('/', (req, res) => {
	controller.getAll(req, res);
});

router.get('/populate', (req, res) => {
	controller.populateDB(req, res);
});

export default router;