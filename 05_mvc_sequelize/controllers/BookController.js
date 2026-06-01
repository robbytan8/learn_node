const Book = require('../models/book')
const Category = require('../models/category')

const BookController = {
  index: async (req, res) => {
    try {
      const data = await Book.findAll({
        include: [{model: Category, as: 'category'}],
      })
      res.status(200).render('book/index', {
        books: data,
        currentPage: 'book',
      });
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`);
    }
  },

  create: async (req, res) => {
    try {
      const data = await Category.findAll()
      res.status(200).render('book/create', {
        categories: data,
        currentPage: 'book',
        data: {}
      })
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  store: async (req, res) => {
    try {
      const {isbn, title, author, publish_year, description, category_id} = req.body

      await Book.create({
        isbn,
        title,
        author,
        publish_year,
        description,
        category_id
      });
      res.redirect(`/book`)
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  edit: async (req, res) => {
    try {
      const {isbn} = req.params
      const categories = await Category.findAll()
      const book = await Book.findByPk(isbn)

      if (!book) {
        return res.status(404).send('Book not found');
      }

      res.status(200).render('book/edit', {
        book: book,
        categories: categories,
        currentPage: 'book',
      })
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  update: async (req, res) => {
    try {
      const {isbn} = req.params
      const book = await Book.findByPk(isbn)

      if (!book) {
        return res.status(404).send('Book not found');
      }

      await book.update(req.body)
      res.redirect('/book')
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  destroy: async (req, res) => {
    try {
      const {isbn} = req.params

      await Book.destroy({where: {isbn}})
      res.redirect('/book')
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  }
}

module.exports = BookController