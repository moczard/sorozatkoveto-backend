const config = {
	dbHost: process.env.MONGODB_URI || 'localhost',
	dbPort: process.env.DB_PORT || '27017',
	dbName: process.env.DB_NAME || 'sorozatkoveto',
	serverPort: process.env.SERVER_PORT || 3001,
	tvMazeApiUrl: 'http://api.tvmaze.com'
};

export default config;