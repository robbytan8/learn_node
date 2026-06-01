const Book = require("../models/Book")
const Category = require('../models/Category')

const CategoryController = {
  index: async (req, res) => {
    try {
      const categories = await Category.find()
      res.status(200).render('category/index', {
        categories,
        currentPage: 'category',
      })
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  create: (req, res) => {
    try {
      res.status(200).render('category/create', {
        category: {},
        currentPage: 'category',
        errors: {}
      })
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  store: async (req, res) => {
    try {
      await Category.create(req.body)
      res.redirect(`/category`)
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  edit: async (req, res) => {
    try {
      const {id} = req.params
      const category = await Category.findById(id)

      if (!category) {
        return res.status(404).send('Category not found')
      }

      res.status(200).render('category/edit', {
        category,
        currentPage: 'category',
        errors: {}
      })
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  update: async (req, res) => {
    try {
      const {id} = req.params
      const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {returnDocument: 'after'})

      if (!updatedCategory) {
        return res.status(400).send('Failed to update category')
      }
      res.redirect('/category')
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  destroy: async (req, res) => {
    try {
      const {id} = req.params;
      const isUsed = await Book.findOne({category_id: id})
      if (isUsed) {
        return res.status(404).send('Cannot delete used category data')
      }
      await Category.findByIdAndDelete(id)
      res.redirect('/category')
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  }
}

module.exports = CategoryController