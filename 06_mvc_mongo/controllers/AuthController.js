const User = require('../models/User')
const bcrypt = require('bcrypt')

const AuthController = {

  showLogin: (req, res) => {
    res.render('auth/login', {currentPage: 'login'})
  },

  login: async (req, res) => {
    try {
      const {email, password} = req.body
      if (!email || !password) {
        return res.status(400).send('Email and password are required')
      }
      const user = await User.findOne({email})
      if (!user) {
        return res.status(401).send('Invalid email or password')
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).send('Invalid email or password')
      }

      req.session.userId = user._id
      req.session.userName = user.name
      req.session.userEmail = user.email
      res.redirect('/')
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  logout: async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send(`Error server: ${err}`)
      }
      res.clearCookie('connect.sid')
      res.redirect('/login')
    })
  }
}

module.exports = AuthController