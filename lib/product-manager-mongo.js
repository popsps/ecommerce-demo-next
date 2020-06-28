const mongoose = require('mongoose')
const {getProducts} = require("./product-config");
const path = require('path')

const Schema = mongoose.Schema
const mongoURI = process.env.MONGO_KEY


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

/** @type {Collection<DefaultSchema>} */
let Phone

async function createDatabase() {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then(() => console.log('mongo db connected'))
    .catch(err => console.log("error connection"))

  try {
    Phone = mongoose.model('phone')
    console.log('already in')
  } catch (err) {
    console.log('get a new schema')
    Phone = mongoose.model('phone', PhoneSchema)
  }

  try {
    // Phone.find()
    //   .sort({date: -1})
    //   .then(p => console.log(p))

    // Product.findById('5eef6e06583f080815e1a972')
    //   .then(item => res.json(item))


    // =====================INSERTION=========================

    const allPhones = getProducts()
    // console.log("all phones:", allPhones)

    // allPhones.forEach((p) => {
    //   const newPhone = new Phone({
    //     title: p.title, listPrice: p.listPrice, price: p.price, stock: 100,
    //     date_created: p.date, date_modified: Date.now()
    //   })
    //   newPhone.save()
    //     .then(phone => console.log(`${phone.title} saved int MongoDB.`))
    // })

    const p = allPhones[0]
    const newPhone = new Phone({
      title: p.title + " fe", listPrice: p.listPrice, price: p.price, stock: 100,
      date_created: p.date, date_modified: Date.now()
    })
    // =====================METHOD 1=========================
    // newPhone.save()
    //   .then(phone => console.log(`${phone.title} saved int MongoDB.`))
    //   .catch(err => console.log("failed to insert"))

    // =====================METHOD 2=========================
    // Phone.create(newPhone).then(phone => console.log(`${phone.title} saved int MongoDB.`))
    //   .catch(err => console.log("failed to insert"))

    // =====================REMOVE=========================
    // Phone.find({title: p.title + " fe"})
    //   // .remove((r) => console.log(`${r.title} removed.`))
    //   .remove(() => console.log('removed'))


    // =====================UPDATE=========================
    // Phone.findOneAndUpdate({'title': "my new phone"},
    //   {title: "Samsung", listPrice: 256, price: 220, stock: 100},
    //   {upset: true}, () => {
    //     console.log('updated')
    //     Phone.find()
    //       .sort({date: -1})
    //       .then(p => console.log(p))
    //   })

    // Phone.find({title: "Samsung"})
    //   .remove(() => console.log('removed'))
    const myPhone = await Phone.findById('5ef8a67189ccb311cc44536d')
    console.log(myPhone.title)

  } catch (err) {
    // console.log(err)
    console.log('something went wrong...')
  }

}


async function createDatabaseWithConnection() {
  // =====================CONNECTION=========================
  let mongoConnection
  try {
    mongoConnection = await mongoose.createConnection(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log('mongo db connected')
  } catch (e) {
    console.log('connection failed.')
  }

  try {
    Phone = mongoConnection.model('phone')
    console.log('already in')
  } catch (err) {
    console.log('get a new schema')
    Phone = mongoConnection.model('phone', PhoneSchema)
  }

  try {
    const myPhone = await Phone.findById('5ef8a67189ccb311cc44536d')
    console.log(myPhone.title)
  } catch (err) {
    // console.log(err)
    console.log('something went wrong...')
    // mongoConnection.close()
  } finally {
    mongoConnection.close()
    console.log('mongoDB connection closed.')
  }

}


async function updateByID(id) {
  let mongoConnection
  try {
    mongoConnection = await mongoose.createConnection(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log('mongo db connected')
  } catch (e) {
    console.log('connection failed.')
  }

  try {
    Phone = mongoConnection.model('phone')
    console.log('already in')
  } catch (err) {
    console.log('get a new schema')
    Phone = mongoConnection.model('phone', PhoneSchema)
  }

  try {
    Phone.findOneAndUpdate({'_id': id},
      {price: 435.99},
      {upset: false}, () => {
        console.log('updated')
        Phone.findById(id)
          .then((myPhone) => console.log(myPhone.title, myPhone.price))

      });

  } catch (err) {
    // console.log(err)
    console.log('something went wrong...')
  } finally {
    // mongoConnection.close()
    // console.log('mongoDB connection closed.')
  }

}

function addToDatabase() {
}

// createDatabase()
// createDatabaseWithConnection()
updateByID('5ef8a67189ccb311cc44536e')
