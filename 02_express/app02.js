// app02.js
// This is a simple Express application that demonstrates how to handle form submissions and display the received data on another page. The application consists of two routes: one for displaying the form and another for processing the form data and displaying it back to the user.

const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))

app.get('/page1', (req, res) => {
  res.send(`
    <form action="/page2" method="POST">
    <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" name="name" placeholder="Enter your name" required autofocus>
    </div>
    <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email" required>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `)
})

app.post('/page2', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  res.send(`
      <h1>Received Request From Another Page</h1>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <a href="/page1" class="btn btn-secondary">Go Back</a>
      </form>
      `)
})

app.get('/', (req, res) => {
  res.send('<h1>Hello from Express</h1>')
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})