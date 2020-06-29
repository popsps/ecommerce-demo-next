import React, {useEffect, useState} from 'react';
import PayPalButton from "../components/payPalButton";
import Layout from "../components/layout";
import {getMyShoppingCart, getMyShoppingCartInfo, increment, decrement} from "../utils/cart";

const {clearCart} = require("../utils/cart");

const Cart = () => {
  // cartTotal, cartSubTotal, cartCount, clearCart, addToCart
  const [cart, setCart] = useState([])
  const [count, setCount] = useState(0)
  const [subtotal, setSubtotal] = useState(0)

  let cartDisplay = (
    <div className='cart-container'>
      <div className='text-center'>
        <p>Your cart is empty</p>
      </div>
    </div>
  );
  useEffect((() => {
    const cartInfo = getMyShoppingCartInfo()
    console.log("cartinfo:", cartInfo)
    // const _cart = getMyShoppingCart()
    setCart(cartInfo.myCart)
    setCount(cartInfo.count)
    setSubtotal(cartInfo.subTotal)
  }), [])

  if (cart.length > 0) {
    cartDisplay = (
      <div className='cart-container'>
        <div className='cart-products'>
          <button className='btn btn-info' onClick={() => {
            const submitPurchase = async () => {

              const myCart = cart.map((p, i) => {
                return {_id: p.id, title: p.title, qty: p.qty}
              })
              const res = await fetch('/api/submitPurchase'
                , {
                  method: 'POST',
                  body: JSON.stringify(myCart)
                })
            };
            submitPurchase();
            clearCart()
            const _cart = getMyShoppingCart()
            setCart(_cart)
          }}>submit
          </button>
          <div className='product header'>
            <div className='product-row'>
              <div className='title'>
                <h5>Shopping Cart</h5>
              </div>
              <div id='price'>
                <p>price</p>
              </div>
            </div>
          </div>
          {cart.map((item, index) => (
            <div className='product' key={index}>
              <div className='product-row'>
                <div className='img-container'>
                  <img src={item.image} alt={item.title}/>
                </div>
                <div className='title'>
                  <p>{(item.title.length > 90) ? item.title.slice(0, 90) + '...' : item.title}</p>
                </div>
                <div id='price'>
                  <p>{item.price}</p>
                </div>
              </div>
              <div className='my-2'>
                <button type="button" className="btn btn-outline-danger w-50 mr-1"
                        onClick={() => {
                          decrement(item.id)
                          const _cart = getMyShoppingCartInfo()
                          setCart(_cart.myCart)
                          setSubtotal(_cart.subTotal)
                          setCount(_cart.count)
                        }}>
                  -
                </button>
                <div id='qty' className="w-50 mr-1">{item.qty}</div>
                <button type="button" className="btn btn-outline-info w-50"
                        onClick={() => {
                          increment(item.id)
                          const _cart = getMyShoppingCartInfo()
                          setCart(_cart.myCart)
                          setSubtotal(_cart.subTotal)
                          setCount(_cart.count)
                        }}>
                  +
                </button>

              </div>
            </div>
          ))}
        </div>
        <div className='payment my-2 text-center'>
          <div className="card bg-light mb-3" style={{maxWidth: "20rem"}}>
            <div className="card-header">Proceed to Checkout</div>
            <div className="card-body">
              <p className="card-text">
                {`Subtotal (${count}) items:$${subtotal}`}
              </p>
              <PayPalButton/>
            </div>
          </div>

        </div>
      </div>
    )
  }
  return (
    <Layout>

      {cartDisplay}
    </Layout>
  )
};

export default Cart;