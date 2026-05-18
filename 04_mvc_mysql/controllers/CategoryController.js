const Category = require('../models/category')

const CategoryController = {
  index: async (req, res) => {
    try {
      const data = await Category.getAll()
      res.status(200).render('category/index', {
        categories: data,
        currentPage: 'category',
      });
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`);
    }
  },

  create: async (req, res) => {
    try {
      res.status(200).render('category/create', {
        currentPage: 'category',
      })
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  store: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).send('Name is required');
      }

      await Category.create(name)
      res.redirect(`/category`)
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.getById(id);

      if (!category) {
        return res.status(404).send('Category not found');
      }

      res.status(200).render('category/edit', {
        category: category,
        currentPage: 'category',
      })
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        return res.status(400).send('Name is required');
      }

      await Category.update(id, name)
      res.redirect('/category')
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await Category.delete(id);
      res.redirect('/category')
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  }
}

module.exports = CategoryController;