import Layout from "../components/layout";
import ProductList from "../components/productList";
import React from "react";


const getDb = async () => {
  const res = await fetch('/api/products')
  console.log('res', res)
  const data = await res.json()
  console.log('data', data)
}

function Home({data}) {

  getDb()
  return (
    <Layout>
      <main>
        <ProductList/>
      </main>
    </Layout>
  )
}

// export async function getServerSideProps() {
// const mongoURI = 'mongodb+srv://product-manager:POCfYMKUvISBYjxq@cluster0-gzrvn.mongodb.net/productdb?retryWrites=true&w=majority'
// mongoose.connect(mongoURI).then(() => console.log('mongo db connected'))
//   .catch(err => console.log(err))
//
// const data = Product.find()
//   .sort({date: -1})
//   .then(product => product)
// const res = await fetch('')
// const data = res.json()

// return {props: {data}}
// }


export default Home