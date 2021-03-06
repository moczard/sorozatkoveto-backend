class UserDataController {
	constructor(model) {
		this.model = model;
	}

	async getByEmailHash(emailHash) {
		try {
			const userData = await this.model.getByEmailHash(emailHash);
			return userData;
		}
		catch (err) {
			console.error('Error in getting the user data: ' + err);
			return null;
		}
	}

	async addUser(emailHash) {
		try {
			const userData = await this.model.getByEmailHash(emailHash);
			if(!userData.length) {
				const dbResponse = await this.model.addUser({ emailHash, watchedEpisodes: [], followedSeries: [] });
				return dbResponse;
			}

			return true;
		}
		catch (err) {
			console.error('Error in adding user: ' + err);
			return null;
		}
	}

	async addToWatched(emailHash, seriesId, season, episode) {
		try {
			const dbResponse = await this.model.addToWatched(emailHash, seriesId, season, episode);
			return dbResponse;
		}
		catch (err) {
			console.error('Error in adding watched episode: ' + err);
			return null;
		}
	}

	async addToFollowed(emailHash, seriesId) {
		try {
			const dbResponse = await this.model.addToFollowed(emailHash, seriesId);
			return dbResponse;
		}
		catch (err) {
			console.error('Error in adding followed episode: ' + err);
			return null;
		}
	}
}


export default UserDataController;