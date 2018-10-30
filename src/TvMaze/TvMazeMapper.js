class TvMazeMapper {
	map(series, episodes) {
		return {
			id: series.id,
			name: series.name,
			genres: series.genres,
			networkName: series.network ? series.network.name : '',
			image: series.image ? series.image.medium : '',
			summary: series.summary,
			episodes: episodes.map((episode) => {
				if (episode) {
					return {
						name: episode.name,
						season: episode.season,
						number: episode.number,
						runtime: episode.runtime,
						image: episode.image ? episode.image.medium : '',
						summary: episode.summary
					};
				}
			})
		};
	}
}

export default TvMazeMapper;