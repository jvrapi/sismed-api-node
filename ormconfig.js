const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,

  entities: [rootDir + '/models/*.{js,ts}'],
  cli: {
    migrationsDir: rootDir + '/database/migrations',

  },
};


