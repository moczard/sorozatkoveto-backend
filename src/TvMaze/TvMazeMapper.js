class TvMazeMapper {
	map(series, seasons, episodes) {
		return {
			id: series.id,
			name: series.name,
			genres: series.genres,
			networkName: series.network ? series.network.name : '',
			image: series.image ? series.image.medium : '',
			summary: series.summary,
			seasons: seasons.map((season) => {
				if (season) {
					return {
						number: season.number,
						episodes: episodes.filter(ep => ep.season === season.number).map((episode) => {
							return {
								name: episode.name,
								season: episode.season,
								number: episode.number,
								runtime: episode.runtime,
								image: episode.image ? episode.image.medium : '',
								summary: episode.summary
							};
						}),
					};
				}
			})
		};
	}
}

export default TvMazeMapper;