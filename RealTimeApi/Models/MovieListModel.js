import mongoose from 'mongoose';

const MovieSchema = mongoose.Schema({
	name: { type: String, required: true, unique: true, index: true }
}, { collection: 'Movie' });

const MoviesModel = mongoose.model('Movie', MovieSchema);

MoviesModel.getAll = () => {
	return MoviesModel.find({});
};

MoviesModel.addMovie = (movie) => {
	return movie.save();
};

MoviesModel.removeMovie = (movieName) => {
	return MoviesModel.remove({ name: movieName });
};

export default MoviesModel;