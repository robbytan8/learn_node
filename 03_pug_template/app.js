// app.js - This file is the entry point of the application. It sets up the Express server, configures the view engine, and defines the routes.

const express = require('express');
const path = require('path');
const app = express();
const route  = require('./routes/route');

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(route)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})