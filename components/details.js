import React, {Component} from 'react';
import ProductContext, {ProductConsumer} from "../productContext"
import Product from "./product";
import {Link} from "react-router-dom";

class Details extends Component {
  static contextType = ProductContext
  state = {
    product: undefined
  }
  

  render() {
    const {products, addToCart, openModal} = this.context
    console.log('products::', products)
    const product = products[0]
    let res = <div>Page Removed</div>
    if (product) {
      res =
        <div className='detail-view'>
          <div className='img-container'>
            <img src={product.img}/>
          </div>
          <div className='info'>
            <h5>
              {product.title}
            </h5>
            <p><span>$</span>{product.price}</p>
            <p>{product.info}</p>
            <div className='d-flex justify-content-between'>
              <Link to='/'>
                <button className='mr-2'>Back To Products</button>
              </Link>
              <button className='ml-2'
                      onClick={() => {
                        addToCart(product.id)
                        openModal(product.id)
                      }}>
                {product.inCart ? "In Cart" : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
    }
    return (res);
  }
}

export default Details;


// <ProductConsumer>
//   {value => {
//     console.log(value)
//     const {id, company, img, info, price, title, inCart} = value.products[0]
//     return (
//       <div>
//         <p>{title}</p>
//         <p>{price}</p>
//         <p>{info}</p>
//       </div>
//     )
//   }}
// </ProductConsumer>