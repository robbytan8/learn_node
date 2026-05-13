const express = require('express')
const path = require('path')
const router = express.Router()

router.use(express.static('public'))
router.use(express.urlencoded({ extended: false }))

router.get('/', (req, res) => {
  res.status(200).render('starter')
})

module.exports = router
