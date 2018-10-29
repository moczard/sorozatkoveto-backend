import express from 'express';
import MovieListController from '../Controllers/MovieListController';
import movie from '../Models/MovieListModel';
const router = express.Router();
const controller = new MovieListController(movie);

router.get('/', (req, res) => {
	controller.getAll(req, res);
});

router.post('/', (req, res) => {
	controller.addMovie(req, res);
});

router.delete('/', (req, res) => {
	controller.deleteMovie(req, res);
});

export default router;