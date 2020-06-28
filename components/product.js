import React, {Component} from 'react';
import {PropTypes} from 'prop-types'
import Link from "next/link";


class Product extends Component {
  render() {
    const {id, title, image, price, slug} = this.props.product

    return (
      <div className='card'>
        <Link href='/phones/[slug]' as={`/phones/${slug}`}>
          <a style={{textDecoration: "none"}}>
            <div className='img-container'>
              <img src={image} alt='product' className='card-img-top'/>
            </div>
            <div className='card-footer d-flex justify-content-between'>
              <p className='align-self-center mb-0'>{(title.length > 50) ? title.slice(0, 50) + '...' : title}</p>
              <p className='mb-0'
                 style={{color: 'blue', display: 'flex', alignItems: 'center'}}>
                <span className='mr-1' style={{fontSize: "14px"}}>$</span>
                {price}
              </p>
            </div>
          </a>
        </Link>

      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }).isRequired
}

export default Product;