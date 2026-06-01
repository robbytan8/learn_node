const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const CategoryController = require('../controllers/CategoryController')
const BookController = require("../controllers/BookController");
const StoreBookRequestValidator = require('../validators/StoreBookValidator')
const StoreCategoryRequestValidator = require('../validators/StoreCategoryValidator')
const UpdateCategoryRequestValidator = require('../validators/UpdateCategoryValidator')

const authMiddleware = require('../middlewares/AuthMiddleware')

router.use(express.static('public'))

router.get('/login', AuthController.showLogin);
router.post('/login', AuthController.login);
router.get('/logout', authMiddleware, AuthController.logout);

router.get('/category/:id/edit', authMiddleware, CategoryController.edit)
router.put('/category/:id', authMiddleware, UpdateCategoryRequestValidator, CategoryController.update)
router.delete('/category/:id', authMiddleware, CategoryController.destroy)
router.get('/category/create', authMiddleware, CategoryController.create)
router.post('/category', authMiddleware, StoreCategoryRequestValidator, CategoryController.store)
router.get('/category', authMiddleware, CategoryController.index)

router.get('/book/:isbn/edit', authMiddleware, BookController.edit)
router.put('/book/:isbn', authMiddleware, BookController.update)
router.delete('/book/:isbn', authMiddleware, BookController.destroy)
router.get('/book/create', authMiddleware, BookController.create)
router.post('/book', authMiddleware, StoreBookRequestValidator, BookController.store)
router.get('/book', authMiddleware, BookController.index)

router.get('/', authMiddleware, (req, res) => {
  res.render('starter', {
    currentPage: 'starter',
  })
})

module.exports = router