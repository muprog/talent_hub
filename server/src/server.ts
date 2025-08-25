import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/route'
import connectDB from './config/db'
import path = require('path')
dotenv.config()

const app = express()
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)
app.use(express.json())

app.use('/', router)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
connectDB()
