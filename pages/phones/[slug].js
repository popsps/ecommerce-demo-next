import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout";
import {getProductsSlug, getProductData} from "../../lib/product-config";
import Head from "next/head";
import Link from "next/link";
import {addToCart, getMyShoppingCartInfo} from "../../utils/cart";
import PushMenu from "../../components/pushMenu";


const Product = ({phoneData}) => {
  console.log('phoneData', phoneData)
  const [stock, setStock] = useState(null)
  const [price, setPrice] = useState(null)
  const [pushMenuOpen, setPushMenuOpen] = useState(false)
  const [count, setCount] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const togglePushMenu = () => {
    setPushMenuOpen(prevState => !prevState)
  }
  useEffect(() => {
    const getItem = async () => {
      const res = await fetch('/api/getPhone'
        , {
          method: 'POST',
          body: JSON.stringify({_id: phoneData.id, title: phoneData.title})
        })
      const phone = await res.json()
      console.log('phone', phone)
      setStock(phone.stock)
      setPrice(phone.price)
    }
    getItem()
  }, [])
  return (
    <>
      <Layout>
        <Head>
          <title>{phoneData.title}</title>
        </Head>
        <article>
          <div className='detail-view'>
            <div className='img-container'>
              <img src={phoneData.image} alt='product'/>
            </div>
            <div className='info'>
              <h5>
                {phoneData.title}
              </h5>
              <p><span>$</span>{price}</p>
              <p>{`stock: ${stock}`}</p>
              <div dangerouslySetInnerHTML={{__html: phoneData.contentHtml}}/>
              <div className='d-flex justify-content-between'>
                <Link href='/'>
                  <a>
                    <button className='btn btn-info my-5 mr-2'>Back To Products</button>
                  </a>
                </Link>
                <button className='btn btn-info ml-2 my-5'
                        onClick={() => {
                          addToCart(phoneData)
                          const _cartInfo = getMyShoppingCartInfo()
                          setPushMenuOpen(true)
                          setCount(_cartInfo.count)
                          setSubtotal(_cartInfo.subTotal)
                        }}>
                  {phoneData.inCart ? "In Cart" : "Add To Cart"}
                </button>
              </div>
            </div>
          </div>
        </article>
      </Layout>
      <PushMenu isOpen={pushMenuOpen}
                count={count} subtotal={subtotal}
                onClose={() => {
                  setPushMenuOpen(false)
                }}/>
    </>

  );
};

export async function getStaticPaths() {
  const paths = getProductsSlug()
  return ({
    paths,
    fallback: false
  })
}

export async function getStaticProps({params}) {
  const phoneData = await getProductData(params.slug)
  return {
    props: {
      phoneData
    }
  }
}


export default Product;