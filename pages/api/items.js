const mongoose = require('mongoose')
const Schema = mongoose.Schema

let message = "init"
let error = ''
console.log('feefe')
const mongoURI = process.env.MONGO_KEY
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('mongo db connected')
    message += ' mongo db connected'
  })
  .catch(err => {
    message += ' error connection'
    error = err
    console.log(" error connection")
  })


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


export default async (req, res) => {
  try{
    const mongoConnection = await mongoose.createConnection(mongoURI)
    console.log('mongoConnection')
    message += ' mongoConnection'
  }
  catch (err) {
    console.log('error mongoConnection')
    message += ' error mongoConnection'

  }

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

    res.json({val: 12323, message: message, error})

  } catch (err) {
    console.log('something went wrong...')
    res.statusCode = 404
    res.end(err)
  }
}

