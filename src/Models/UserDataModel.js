import mongoose from 'mongoose';


const UserDataSchema = mongoose.Schema(
	{
		emailHash: { type: String, required: true, unique: true, index: true },
		watchedEpisodes: [
			{
				seriesId: Number,
				season: Number,
				episode: Number
			}
		],
	},
	{
		collection: 'UserData'
	}
);

const UserDataModel = mongoose.model('UserData', UserDataSchema);

UserDataModel.getByEmailHash = (emailHash) => {
	return UserDataModel.find({ emailHash });
};

UserDataModel.addUser = (user) => {
	return UserDataModel.updateOne({ emailHash: user.emailHash }, user, { upsert: true });
};

UserDataModel.addToWatched = (emailHash, seriesId, season, episode) => {
	return UserDataModel.updateOne(
		{ emailHash },
		{ $push:
			{
				watchedEpisodes: { seriesId: Number(seriesId), season: Number(season), episode: Number(episode) }
			}
		}
	);
};

export default UserDataModel;