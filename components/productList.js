import React, {Component} from 'react';
import {ProductConsumer} from '../productContext'
import Product from "./product";

class ProductList extends Component {
  render() {
    return (
      <div className='product-list'>

        <ProductConsumer>
          {v => {
            return (
              v.products.map((product, i) => {
                return (
                  <Product key={i} product={product}
                           commands={{
                             addToCart: v.addToCart,
                             openModal: v.openModal,
                             removeFromCart: v.removeFromCart
                           }}/>
                )
              })
            )
          }}
        </ProductConsumer>
      </div>
    );
  }
}

export default ProductList;