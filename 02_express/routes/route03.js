const express = require('express')
const router = express.Router()

router.get('/page1', (req, res) => {
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

router.post('/page2', (req, res) => {
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

router.get('/', (req, res) => {
  res.send('<h1>Hello from Express</h1>')
})

module.exports = router
