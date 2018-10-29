const config = {
	dbHost: process.env.DB_HOST || 'localhost',
	dbPort: process.env.DB_PORT || '27017',
	dbName: process.env.DB_NAME || 'movies',
	serverPort: process.env.SERVER_PORT || 3001,
};

export default config;