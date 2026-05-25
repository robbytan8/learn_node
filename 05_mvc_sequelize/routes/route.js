const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const CategoryController = require('../controllers/CategoryController')

const authMiddleware = require('../middlewares/AuthMiddleware')

router.use(express.static('public'))

router.get('/login', AuthController.showLogin);
router.post('/login', AuthController.login);
router.get('/logout', authMiddleware, AuthController.logout);

router.get('/category/:id/edit', authMiddleware, CategoryController.edit)
router.put('/category/:id', authMiddleware, CategoryController.update)
router.delete('/category/:id', authMiddleware, CategoryController.destroy)
router.get('/category/create', authMiddleware, CategoryController.create)
router.post('/category', authMiddleware, CategoryController.store)
router.get('/category', authMiddleware, CategoryController.index)

router.get('/', (req, res) => {
  res.render('starter', {
    currentPage: 'starter',
  })
})

module.exports = router