const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors')
const user = require('./routes/userRoutes')
const auth = require('./routes/authRoutes')
const tasks = require('./routes/taskRoutes')

dotenv.config()

mongoose.connect( process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB\n", err))
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.use('/api/auth', auth)
app.use('/api/tasks', tasks)
app.use('/api/user', user)

app.listen(5000, () => console.log("Server listening on port 5000"))