const Joi = require("joi")

const UpdateCategoryRequestValidator = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().max(60).messages({
      'string.max': 'Name must be at most 60 characters',
      'any.required': 'Name is required',
    }),
    description: Joi.string().max(150).allow(null, '').messages({
      'string.max': 'Description must be at most 150 characters',
    }),
  })

  try {
    req.body = await schema.validateAsync(req.body, {abortEarly: false})
    next()
  } catch (err) {
    const errorMessages = {}

    if (err.details) {
      err.details.forEach((detail) => {
        errorMessages[detail.path[0]] = detail.message
      })
    }

    return res.render('category/create', {
      category: req.body || {},
      errors: errorMessages,
    })
  }
}

module.exports = UpdateCategoryRequestValidator