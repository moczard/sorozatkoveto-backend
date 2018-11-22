class SeriesController {
	constructor(model, api) {
		this.model = model;
		this.api = api;
	}

	async populateDB() {
		try {
			let isLastPage = false;
			let page = 0;

			while (!isLastPage) {
				console.log(`Getting data from api page: ${page}`);
				const seriesData = await this.api.getPageData(page);
				console.log('Successfully got data from api');
				console.log('Populating db...');
				if (seriesData) {
					await this.model.populateDB(seriesData);
					console.log('Success');
					page += 1;
				} else {
					isLastPage = true;
				}
			}
			return true;
		}
		catch (err) {
			console.error('Error in populating db : ' + err);
			return null;
		}
	}

	async getGenres() {
		try {
			const genres = await this.model.getGenres();
			return genres;
		}
		catch (err) {
			console.error('Error in getting the genres: ' + err);
			return null;
		}
	}

	async findByGenre(genre, skip, limit) {
		try {
			const hits = await this.model.findByGenre(genre, skip || 0, limit || 20);
			return hits;
		}
		catch (err) {
			console.error('Error in finding the series: ' + err);
			return null;
		}
	}

	async findByTitle(title, skip, limit) {
		try {
			const hits = await this.model.findByTitle(title, skip || 0, limit || 20);
			return hits;
		}
		catch (err) {
			console.error('Error in finding the series: ' + err);
			return null;
		}
	}

	async findAllByIds(ids) {
		try {
			const series = await this.model.findAllByIds(ids);
			return series;
		}
		catch (err) {
			console.error('Error in finding the series: ' + err);
			return null;
		}
	}
}


export default SeriesController;