const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 60
  },
  description: {
    type: String,
    maxlength: 150,
  }
}, {
  timestamps: true,
  collection: 'category'
})

module.exports = mongoose.model('Category', categorySchema)