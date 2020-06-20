import React, {Component} from 'react';
import {PropTypes} from 'prop-types'


class Product extends Component {
  render() {
    const {id, title, img, price, inCart} = this.props.product
    const {openModal, addToCart, removeFromCart} = this.props.commands
    return (
      <div className='card'>
        <div className='img-container'>
          <img src={img} alt='product' className='card-img-top'/>
          <button className='cardbtn'
                  onClick={() => {

                    if (!inCart) {
                      addToCart(id)
                      openModal(id)
                    }
                    else{
                      removeFromCart(id)
                    }
                  }}>
            {inCart ?
              <i className="fas fa-trash"/> :
              (<i className='fas fa-cart-plus'/>)
            }
          </button>
        </div>
        <div className='card-footer d-flex justify-content-between'>
          <p className='align-self-center mb-0'>{(title.length > 50) ? title.slice(0, 50) + '...' : title}</p>
          <p className='mb-0'
             style={{color: 'blue', display: 'flex', alignItems: 'center'}}>
            <span className='mr-1' style={{fontSize: "14px"}}>$</span>
            {price}
          </p>
        </div>


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