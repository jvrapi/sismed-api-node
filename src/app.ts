import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv'
import cors from 'cors'
import express from 'express'
import { errorMiddleware } from 'middlewares/ErrorMiddleware'
import { routes } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorMiddleware)
export { app }
