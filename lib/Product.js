const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: String,
  value: Number
})

module.exports = Products = mongoose.model("products", ProductSchema)