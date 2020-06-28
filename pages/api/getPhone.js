const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongoURI = process.env.MONGO_KEY
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log('mongo db connected'))
  .catch(err => console.log("error connection"))

const PhoneSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  date_modified: {
    type: Date,
    default: Date.now
  },
  listPrice: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
})


let Product


export default (req, res) => {
  console.log("req:", req.body)
  try {
    Product = mongoose.model('phone')
    console.log('already in')
  } catch (err) {
    console.log('get a new schema')
    Product = mongoose.model('phone', PhoneSchema)
  }
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    const {_id, title} = JSON.parse(req.body)
    console.log("id:", _id, "title:", title)
    Product.findById(_id)
      .then((myPhone) => {
        console.log(myPhone.title, myPhone.price)
        res.json({price: myPhone.price, stock: myPhone.stock})
      })

  } catch (err) {
    console.log('something went wrong...')
    res.statusCode = 404
    res.end(err)
  }
}

