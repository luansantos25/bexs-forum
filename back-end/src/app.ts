import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'

mongoose.connect('mongodb://localhost:27017/bexs', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
})

const app = express()
app.use(express.json())
app.use(routes)

export default app
