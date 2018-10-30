import mongoose from 'mongoose';

const SeriesSchema = mongoose.Schema(
	{
		id: { type: Number, required: true, unique: true, index: true },
		name: String,
		genres: [String],
		networkName: String,
		imgage: String,
		summary: String,
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
	},
	{ 
		collection: 'Series' 
	}
);

const SeriesModel = mongoose.model('Series', SeriesSchema);

SeriesModel.getAll = () => {
	return SeriesModel.find({});
};

SeriesModel.populateDB = (seriesArray) => {
	return SeriesModel.updateMany(seriesArray);
};

export default SeriesModel;