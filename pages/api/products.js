const mongoose = require('mongoose')
// const Product = require('../../lib/Product')
const Schema = mongoose.Schema

console.log('feefe')
const mongoURI = process.env.MONGO_KEY
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log('mongo db connected'))
  .catch(err => console.log("error connection"))
// const mongoConnection = await mongoose.createConnection(mongoURI)

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})


let Product


export default (req, res) => {
  try {
    Product = mongoose.model('product')
    console.log('already in')
  } catch (err) {
    console.log('get a new schema')
    Product = mongoose.model('product', ProductSchema)
  }

  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    // const Products = mongoose.model("products", ProductSchema)

    // mongoose.model("products").find()
    //   .sort({date: -1})
    //   .then(res => res.json(res))

    Product.find()
      .sort({date: -1})
      .then(products => res.json(products))

    // Product.findById('5eef6e06583f080815e1a972')
    //   .then(item => res.json(item))

    // const newProduct = new Product({
    //   title: req.body.title
    // })
    // newProduct.save()
    //   .then(product => res.json(product))
  } catch (err) {
    console.log('something went wrong...')
    res.statusCode = 404
    res.end(err)
  }
}

