import axios from 'axios';
import config from '../Utility/Configuration';
import Promise from 'es6-promise';


class TvMazeApi {
	constructor(mapper) {
		this.url = config.tvMazeApiUrl;
		this.mapper = mapper;
	}

	async getSeries() {
		try {
			const { data } = await axios.get(`${this.url}/shows`);
			return data;
		} catch (err) {
			console.error('Unable to get series: ', err);
		}
	}

	async getEpisodes(seriesId) {
		try {
			const { data } = await axios.get(`${this.url}/shows/${seriesId}/episodes`);
			return data;
		} catch (err) {
			console.error(`Unable to get episodes: seriesId: ${seriesId}`, err);
		}
	}

	async getSeriesData() {
		const seriesArray = await this.getSeries();
		if (seriesArray) {
			const mappedSeriesArray = [];
			await Promise.all(seriesArray.map(async (series) => {
				const episodes = await this.getEpisodes(series.id);
				if(episodes && series) {
					const mappedSeries = this.mapper.map(series, episodes);
					mappedSeriesArray.push(mappedSeries);
				}
			}));

			return mappedSeriesArray;
		}

		return [];
	}
}

export default TvMazeApi;