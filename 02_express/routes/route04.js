const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/form', (req, res) => {
  res.status(200).render('form')
})

router.post('/submit-form', (req, res) => {
  const { name, email } = req.body
  res.status(200).render('form-success', { name, email })
})

router.get('/', (req, res) => {
  res.status(200).render('index')
})

module.exports = router
