const mongoose = require('mongoose')
const Schema = mongoose.Schema

let message = ''
console.log('feefe')
const mongoURI = process.env.MONGO_KEY
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('mongo db connected');
    message = 'mongo db connected'
  })
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
  // try {
  //   Product = mongoose.model('product')
  //   console.log('already in')
  // } catch (err) {
  //   console.log('get a new schema')
  //   Product = mongoose.model('product', ProductSchema)
  // }

  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    res.json({val: 12323, message: message})

  } catch (err) {
    console.log('something went wrong...')
    res.statusCode = 404
    res.end(err)
  }
}

