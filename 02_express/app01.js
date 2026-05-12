// app01.js - A simple Express application that demonstrates basic routing.
// Defining route using app.get() method to handle GET requests for different paths.

const express = require('express')
const app = express()

app.get('/page1', (req, res) => {
  res.send('<h1>Hello from Express Page 01</h1>')
})

app.get('/page2', (req, res) => {
  res.send('<h1>Hello from Express Page 02</h1>')
})

app.get('/', (req, res) => {
  res.send('<h1>Hello from Express</h1>')
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})