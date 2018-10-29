class MovieController {
	constructor(model) {
		this.model = model;
	}

	async getAll(req, res) {
		try {
			const movies = await this.model.getAll();
			res.send(movies);
		}
		catch (err) {
			console.error('Error in getting movies: ' + err);
			res.send('Error');
		}
	}

	async addMovie(req, res) {
		const movie = this.model({
			name: req.body.name
		});
		try {
			const savedMovie = await this.model.addMovie(movie);
			res.send(`added: ${savedMovie}`);
		}
		catch (err) {
			console.error('Error in getting movies: ' + err);
			res.send('Error');
		}
	}

	async deleteMovie(req, res) {
		const movieName = req.body.name;
		try {
			await this.model.removeMovie(movieName);
			res.send('Movie deleted');
		}
		catch (err) {
			console.error('Failed to delete movie: ' + err);
			res.send('Delete failed..!');
		}
	}
}


export default MovieController;