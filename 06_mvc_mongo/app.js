require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const route = require('./routes/route')
const connectDB = require('./config/database')
const session = require('express-session')

const app = express()
app.set('view engine', 'pug')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
connectDB()
app.use(session({
  secret: process.env.SESSION_SECRET || 'yoursecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2
  }
}))
app.use(route)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
