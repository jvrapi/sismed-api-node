const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
<<<<<<< HEAD
  entities: [`dist/models/*.{js,ts}`],
  cli: {
    migrationsDir: `dist/database/migrations`,
=======
  entities: [rootDir + '/models/*.{js,ts}'],
  cli: {
    migrationsDir: rootDir + '/database/migrations',
>>>>>>> af7858731e7534e5900b52e38c4ddc83280aad42
  },
};


