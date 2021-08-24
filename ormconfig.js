const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';
const dbConfig = {
  type: process.env.BD_TYPE,
  host: process.env.BD_HOST,
  database: process.env.BD_NAME,
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
}

const { type, host, database, username, password } = dbConfig

const ormConfig = {
  type,
  host,
  database,
  username,
  password,
  entities: [rootDir + '/entities/*.{js,ts}'],
  migrations: [rootDir + '/database/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: rootDir + '/database/migrations',
    entitiesDir: rootDir + '/entities',
  },
}

process.env.NODE_ENV !== 'development' && (ormConfig['ssl'] = {
  rejectUnauthorized: false
})


module.exports = ormConfig