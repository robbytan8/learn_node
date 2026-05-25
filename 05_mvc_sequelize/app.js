require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const route = require('./routes/route')
const sequelize = require('./config/database')
const session = require('express-session')

app.set('view engine', 'pug')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.use(route)
app.use(session({
  secret: process.env.SESSION_SECRET || 'yoursecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2
  }
}))

const PORT = process.env.PORT || 3000
sequelize.sync({alter: false})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`)
    })
  })
  .catch(err => console.log(err))
