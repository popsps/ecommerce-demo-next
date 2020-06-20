import React, {useContext} from 'react';
import ProductContext from "../productContext";
import {Link} from "react-router-dom";

const Modal = ({}) => {
  const context = useContext(ProductContext)
  const {item, openModal, closeModal, modalOpen} = context
  if (modalOpen && item) {
    return (
      <div className='modal-container'>
        <div className='product-modal'>
          <p className='text-center text-wrap'>modal</p>
          <div className='img-container'>
            <img src={item.img} alt='product'/>
          </div>
          <p className='text-center text-wrap'>{item.title}</p>
          <p className='text-center text-wrap'>
            <span>$ </span>{item.price}
          </p>
          <div>
            <Link to='/'>
              <button onClick={() => closeModal()}>
                Continue Shopping
              </button>
            </Link>
          </div>
          <Link to='/cart' onClick={() => closeModal()}>
            <button>
              Go To Cart
            </button>
          </Link>
        </div>
      </div>
    )
  } else
    return null;
};

export default Modal;

