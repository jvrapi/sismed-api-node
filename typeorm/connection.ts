import { resolve } from 'path'
import dotenv from 'dotenv'
import { createDatabase, DbCredential, dropDatabase } from 'pg-god'
import { createConnection, getConnection } from 'typeorm'

dotenv.config({
  path: resolve(__dirname, '..', '.env.test')
})

const alphaNumeric = Math.random().toString(36).slice(-10)

const databaseName = `schema_test_${alphaNumeric}`

const entities = resolve(__dirname, '..', 'src', 'entities', '*.ts')
const migrations = resolve(
  __dirname,
  '..',
  'src',
  'database',
  'migrations',
  '*.ts'
)

const databaseConfig: Partial<DbCredential> = {
  host: process.env.BD_HOST,
  user: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  port: 5432
}

const connection = {
  async connect() {
    await createDatabase({ databaseName: databaseName }, databaseConfig)

    return await createConnection({
      type: 'postgres',
      host: databaseConfig.host,
      database: databaseName,
      username: databaseConfig.user,
      password: databaseConfig.password,
      entities: [entities],
      migrations: [migrations],
      // synchronize: true,
      logging: false,
      dropSchema: true,
      migrationsRun: true
    })
  },

  async close() {
    await dropDatabase({ databaseName: databaseName }, databaseConfig)
    getConnection().close()
  }
}

export { connection }
