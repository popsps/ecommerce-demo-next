import React from 'react';
import Product from "./product";


const ProductList = ({products}) => {
  return (
    <div className='product-list'>
      {
        products.map((product, i) => {
          return (
            <Product key={i} product={product}/>
          )
        })
      }
    </div>
  );
};


export default ProductList;