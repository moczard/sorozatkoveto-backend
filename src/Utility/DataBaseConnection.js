import Mongoose from 'mongoose';
import config from './Configuration';

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
	try {
		await Mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`);
	}
	catch (err) {
		console.error(err);
		console.error('Could not connect to db');
	}
};


export default connectToDb;