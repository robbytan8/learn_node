const Joi = require("joi");
const Category = require("../models/category");

const UpdateBookRequestValidator = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(100).messages({
      'string.max': 'Title must be at most 100 characters',
      'any.required': 'Title is required',
    }),
    author: Joi.string().required().max(100).messages({
      'string.max': 'Author must be at most 100 characters',
      'any.required': 'Author is required',
    }),
    description: Joi.string().required().max(300).messages({
      'string.max': 'Description must be at most 300 characters',
      'any.required': 'Description is required',
    }),
    publish_year: Joi.number().integer().required().messages({
      'number.base': 'Publish year must be a positive integer',
      'any.required': 'Publish year is required',
    }),
    category_id: Joi.number().integer().required().external(async (value) => {
      const categoryExists = await Category.findByPk(value)
      if (!categoryExists) {
        throw new Error(`Category with id ${value} does not exist`);
      }
      return value
    }),
    cover: Joi.string().max(100).allow(null),
  })

  try {
    req.body = await schema.validateAsync(req.body, {abortEarly: false})
    next()
  } catch (err) {
    const categories = await Category.findAll()
    const errorMessages = {}

    if (err.details) {
      err.details.forEach((detail) => {
        errorMessages[detail.path[0]] = detail.message
      })
    }

    if (err.message.includes('Category not found')) {
      errorMessages['category_id'] = 'Category not found'
    }

    const data = {...req.body, isbn: req.params.isbn}

    return res.render('book/edit', {
      book: data,
      categories: categories,
      currentPage: 'book',
      errors: errorMessages,
    })
  }
}

module.exports = UpdateBookRequestValidator