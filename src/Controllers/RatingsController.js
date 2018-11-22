class RatingsController {
	constructor(model) {
		this.model = model;
	}

	async findRatingsForEpisode(seriesId, season, episode) {
		try {
			const ratings = await this.model.findRatingsForEpisode(seriesId, season, episode);
			return ratings;
		}
		catch (err) {
			console.error('Error in getting the ratings: ' + err);
			return null;
		}
	}

	async findRatingsForSeries(seriesId) {
		try {
			const ratings = await this.model.findRatingsForSeries(seriesId);
			return ratings;
		}
		catch (err) {
			console.error('Error in getting the ratings: ' + err);
			return null;
		}
	}

	async addRatingsForEpisode(seriesId, season, episode, rating) {
		try {
			const ratings = await this.model.findRatingsForEpisode(seriesId, season, episode);
			if (!ratings.length) {
				await this.model.addEpisode(seriesId, season, episode);
			}

			const dbResponse = await this.model.addRatingsForEpisode(seriesId, season, episode, rating);
			return dbResponse;
		}
		catch (err) {
			console.error('Error in adding ratings for episode: ' + err);
			return null;
		}
	}
}


export default RatingsController;