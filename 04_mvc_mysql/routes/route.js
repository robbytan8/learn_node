const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')

router.use(express.static('public'))

router.get('/category/:id/edit', CategoryController.edit)
router.put('/category/:id', CategoryController.update)
router.delete('/category/:id', CategoryController.destroy)
router.get('/category/create', CategoryController.create)
router.post('/category', CategoryController.store)
router.get('/category', CategoryController.index)
router.get('/', (req, res) => {
  res.render('starter', {
    currentPage: 'starter',
  })
})

module.exports = router