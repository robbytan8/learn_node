const Category = require('../models/category')

const CategoryController = {
  index: async (req, res) => {
    try {
      const data = await Category.findAll()
      res.status(200).render('category/index', {
        categories: data,
        currentPage: 'category',
      });
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`);
    }
  },

  create: (req, res) => {
    try {
      res.status(200).render('category/create', {
        category: {},
        currentPage: 'category',
      })
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  store: async (req, res) => {
    try {
      const {name, description} = req.body
      await Category.create({name, description})
      res.redirect(`/category`)
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  edit: async (req, res) => {
    try {
      const {id} = req.params;
      const category = await Category.findByPk(id);

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
      const {id} = req.params
      const {name, description} = req.body
      await Category.update({name, description}, {where: {id}})
      res.redirect('/category')
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  },

  destroy: async (req, res) => {
    try {
      const {id} = req.params;

      await Category.destroy({where: {id}});
      res.redirect('/category')
    } catch (error) {
      res.status(500).send(`Error server: ${error.message}`)
    }
  }
}

module.exports = CategoryController;