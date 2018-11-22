import mongoose from 'mongoose';
import upsertMany from '@meanie/mongoose-upsert-many';

mongoose.plugin(upsertMany);

const SeriesSchema = mongoose.Schema(
	{
		id: { type: Number, required: true, unique: true, index: true },
		name: String,
		genres: [String],
		networkName: String,
		imgage: String,
		summary: String,
		seasons: [
			{
				number: Number,
				episodes: [
					{
						name: String,
						season: Number,
						number: Number,
						runtime: Number,
						image: String,
						summary: String
					}
				]
			}
		]

	},
	{
		collection: 'Series'
	}
);

const SeriesModel = mongoose.model('Series', SeriesSchema);

SeriesModel.populateDB = (seriesArray) => {
	return SeriesModel.upsertMany(seriesArray);
};

SeriesModel.getGenres = () => {
	return SeriesModel.distinct('genres');
};

SeriesModel.findByGenre = (genre, skip, limit) => {
	return SeriesModel.find({ genres: genre }, null, { skip: Number(skip) }).limit(Number(limit));
};

SeriesModel.findByTitle = (title, skip, limit) => {
	return SeriesModel.find({ name: { '$regex': title, '$options': 'i' } }, null, { skip: Number(skip) }).limit(Number(limit));
};

SeriesModel.findAllByIds = (ids) => {
	return SeriesModel.find({ id: { '$in': ids } });
};

export default SeriesModel;