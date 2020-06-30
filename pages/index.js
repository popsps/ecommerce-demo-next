import Layout from "../components/layout";
import ProductList from "../components/productList";
import React, {useEffect, useState} from "react";
import {getSortedProducts} from "../lib/product-config";

function Home({allPhones}) {
  const [filteredPhones, setFilteredPhones] = useState(allPhones)
  const [filter, setFilter] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)

  const handleSearchSubmission = () => {
    const _filter = filter.toLowerCase()
    console.log("_filter:", _filter)
    const _filteredPhones = allPhones.filter((phone) =>
      phone.title.toLowerCase().includes(_filter)
      || phone.company.toLowerCase().includes(_filter));
    console.log("_filteredPhones:", _filteredPhones)
    setFilteredPhones(_filteredPhones)
  }
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
    fetchPosts().then(() => console.log('posts: ', posts))
    console.log('all phones', allPhones)

  }, [])


  return (
    <Layout>
      <main>
        <div className='text-center ml-3'>
          <div>
            <div className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search"
                     onChange={(e) => setFilter(e.target.value)}
                     onKeyUp={(e) => {
                       if (e.key === 'Enter')
                         handleSearchSubmission()
                     }}/>
              <button className="btn btn-secondary my-2 my-sm-0" type="button"
                      onClick={() => handleSearchSubmission()}>
                Search
              </button>
            </div>
          </div>
        </div>
        <ProductList products={filteredPhones}/>
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