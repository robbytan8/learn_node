// app04.js - Using EJS Template Engine to Render Dynamic Content

const express = require('express');
const path = require('path');
const app = express();
const route  = require('./routes/route04');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: false }))
app.use(route)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})