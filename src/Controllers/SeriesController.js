class SeriesController {
	constructor(model, api) {
		this.model = model;
		this.api = api;
	}

	async getAll(req, res) {
		try {
			const series = await this.model.getAll();
			res.send(series);
		}
		catch (err) {
			console.error('Error in getting the series: ' + err);
			res.send('Error');
		}
	}

	async populateDB(req, res) {
		try {
			console.log('Getting data from api');
			const seriesData = await this.api.getSeriesData();
			console.log('Successfully got data from api');
			console.log('Populating db...');
			await this.model.populateDB(seriesData);
			console.log('Success');
			res.send('Success');
		}
		catch (err) {
			console.error('Error in populating db : ' + err);
			res.send('Error');
		}
	}
}


export default SeriesController;