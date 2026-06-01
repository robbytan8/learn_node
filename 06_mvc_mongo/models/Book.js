const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    unique: true,
    maxlength: 13
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  author: {
    type: String,
    required: true,
    maxlength: 100
  },
  publish_year: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    maxlength: 300
  },
  cover: {
    type: String,
    maxlength: 100,
    default: null
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, {
  timestamps: true,
  collection: 'book'
})

module.exports = mongoose.model('Book', bookSchema)