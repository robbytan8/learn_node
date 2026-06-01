const Joi = require('joi')

const CategoryRequest = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().max(60).messages({
      'string.max': 'Name must be at most 60 characters',
      'any.required': 'Name is required',
    }),
    description: Joi.string().max(150).empty('').allow(null).optional().messages({
      'string.max': 'Description must be at most 150 characters',
    })
  })

  try {
    req.body = await schema.validateAsync(req.body, {abortEarly: false})
    next()
  } catch (err) {
    const errorMessages = {}
    err.details.forEach(d => errorMessages[d.path[0]] = d.message)
    const isUpdate = req.params.id ? true : false
    const view = isUpdate ? 'category/edit' : 'category/create'

    return res.render(view, {
      errors: errorMessages,
      category: {...req.body, id: req.params.id || req.body.id}
    })
  }
}

module.exports = CategoryRequest