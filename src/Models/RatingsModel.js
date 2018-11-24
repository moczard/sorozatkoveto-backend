import mongoose from 'mongoose';


const RatingsSchema = mongoose.Schema(
	{
		seriesId: Number,
		season: Number,
		episode: Number,
		sum: Number,
		count: Number
	},
	{
		collection: 'Ratings'
	}
);

const RatingsModel = mongoose.model('Ratings', RatingsSchema);

RatingsModel.findRatingsForEpisode = (seriesId, season, episode) => {
	return RatingsModel.find({ seriesId, season, episode });
};

RatingsModel.findRatingsForSeries = (seriesId) => {
	return RatingsModel.find({ seriesId });
};

RatingsModel.addEpisode = (seriesId, season, episode) => {
	return RatingsModel.create({ seriesId, season, episode, sum: 0, count: 0 });
};

RatingsModel.addRatingsForEpisode = (seriesId, season, episode, rating) => {
	return RatingsModel.updateOne(
		{ seriesId, season, episode },
		{
			$inc:
			{
				sum: Number(rating),
				count: 1
			}
		}
	);
};

RatingsModel.findAllBySeriesIds = (seriesIds) => {
	return RatingsModel.find({ seriesId: { '$in': seriesIds } });
};


export default RatingsModel;