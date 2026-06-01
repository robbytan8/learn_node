const Book = require('../models/Book')
const Category = require('../models/Category')

const BookController = {
  index: async (req, res) => {
    try {
      const books = await Book.find().populate('category_id')
      res.status(200).render('book/index', {
        books,
        currentPage: 'book',
      })
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  create: async (req, res) => {
    try {
      const categories = await Category.find()
      res.status(200).render('book/create', {
        categories,
        currentPage: 'book',
        book: {},
        errors: {}
      })
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  store: async (req, res) => {
    try {
      await Book.create(req.body)
      res.redirect(`/book`)
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  edit: async (req, res) => {
    try {
      const {isbn} = req.params
      const book = await Book.findOne({isbn})
      const categories = await Category.find()

      if (!book) {
        return res.status(404).send('Book not found')
      }

      res.status(200).render('book/edit', {
        book,
        categories,
        currentPage: 'book',
        errors: {}
      })
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  update: async (req, res) => {
    try {
      const {isbn} = req.params
      const updatedBook = await Book.findOneAndUpdate({isbn}, req.body, {recentDocument: 'after'})

      if (!updatedBook) {
        return res.status(404).send('Failed to update book')
      }
      res.redirect('/book')
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  destroy: async (req, res) => {
    try {
      const {isbn} = req.params
      await Book.findOneAndDelete({isbn})
      res.redirect('/book')
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  }
}

module.exports = BookController