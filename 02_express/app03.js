// app03.js - An Express application that demonstrates the use of middleware and routing with external route definitions.

const express = require('express');
const app = express();
const route  = require('./routes/route03');

app.use(express.urlencoded({ extended: false }))
app.use(route)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})