import Layout from "../components/layout";
import ProductList from "../components/productList";
import React, {useEffect, useState} from "react";
import {getSortedProducts} from "../lib/product-config";

function Home({data, allPhones}) {
  console.log('all phones', allPhones)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  useEffect(() => {
    const getDb = async () => {
      const res = await fetch('/api/products')
      console.log('res', res)
      const data = await res.json()
      console.log('data', data)
    }
    const fetchPosts = async () => {
      setLoading(true)
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json()
      setPosts(data)
      setLoading(false)
    }
    getDb()
    fetchPosts()
    console.log('token:', localStorage.getItem('token'))
  }, [])

  console.log('posts: ', posts)

  return (
    <Layout>
      <main>
        <ProductList products={allPhones}/>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPhones = getSortedProducts()
  return {
    props: {
      allPhones
    }
  }
}


// export async function getServerSideProps(props) {
//   console.log(props)
//   const {query} = props
//   return {query}
// }


export default Home