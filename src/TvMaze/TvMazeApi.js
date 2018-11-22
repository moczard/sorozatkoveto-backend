import axios from 'axios';
import config from '../Utility/Configuration';
import Promise from 'es6-promise';

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

class TvMazeApi {
	constructor(mapper) {
		this.url = config.tvMazeApiUrl;
		this.mapper = mapper;
	}

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async getSeries(page) {
		try {
			const { data } = await axios.get(`${this.url}/shows?page=${page}`);
			return data;
		} catch (err) {
			if (err.response && err.response.status !== 404) {
				console.error(`Unable to get series page: ${page}`);
			} else {
				return null;
			}
		}
	}

	async getEpisodes(seriesId) {
		try {
			const { data } = await axios.get(`${this.url}/shows/${seriesId}/episodes`);
			return data;
		} catch (err) {
			console.log('Throttling...');
			await this.sleep(2000);
			const data = await this.getEpisodes(seriesId);
			return data;
		}
	}

	async getSeasons(seriesId) {
		try {
			const { data } = await axios.get(`${this.url}/shows/${seriesId}/seasons`);
			return data;
		} catch (err) {
			console.log('Throttling...');
			console.log(`id: ${seriesId}`);
			await this.sleep(2000);
			const data = await this.getSeasons(seriesId);
			return data;
		}
	}

	async getPageData(page) {
		const seriesArray = await this.getSeries(page);
		if (seriesArray) {
			const mappedSeriesArray = [];
			await asyncForEach(seriesArray, async (series) => {
				const episodes = await this.getEpisodes(series.id);
				const seasons = await this.getSeasons(series.id);
				if (episodes && series && seasons) {
					const mappedSeries = this.mapper.map(series, seasons, episodes);
					mappedSeriesArray.push(mappedSeries);
				}
			});

			return mappedSeriesArray;
		}

		return null;
	}
}

export default TvMazeApi;