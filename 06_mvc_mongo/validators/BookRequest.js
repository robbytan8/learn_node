const Joi = require('joi')
const mongoose = require('mongoose')
const Category = require('../models/Category')

const BookRequest = async (req, res, next) => {
  const schema = Joi.object({
    isbn: Joi.string().required().max(13).messages({
      'string.max': 'ISBN must be at most 13 characters',
      'any.required': 'ISBN is required'
    }),
    title: Joi.string().required().max(100).messages({
      'string.max': 'Title must be at most 100 characters',
      'any.required': 'Title is required'
    }),
    author: Joi.string().required().max(100).messages({
      'string.max': 'Author must be at most 100 characters',
      'any.required': 'Author is required'
    }),
    description: Joi.string().required().max(300).messages({
      'string.max': 'Description must be at most 300 characters',
      'any.required': 'Description is required'
    }),
    publish_year: Joi.number().integer().required().messages({
      'number.base': 'Publish year must be a positive integer',
      'any.required': 'Publish year is required'
    }),
    cover: Joi.string().max(100).empty('').allow(null).optional(),
    category_id: Joi.string().required().external(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Category id is invalid.')
      }
      const category = await Category.findById(value)
      if (!category) throw new Error('Category not found')
      return value
    })
  })

  try {
    req.body = await schema.validateAsync(req.body, {abortEarly: false})
    next()
  } catch (err) {
    const categories = await Category.find()
    const errorMessages = {}

    if (err.isJoi) {
      err.details.forEach(d => errorMessages[d.path[0]] = d.message)
    } else {
      errorMessages['category_id'] = err.message
    }

    const isUpdate = req.params.isbn ? true : false
    const view = isUpdate ? 'book/edit' : 'book/create'

    return res.render(view, {
      categories,
      errors: errorMessages,
      book: {...req.body, isbn: req.params.isbn || req.body.isbn}
    });
  }
}

module.exports = BookRequest