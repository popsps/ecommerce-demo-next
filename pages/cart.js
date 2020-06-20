import React, {useContext} from 'react';
import ProductContext from "../productContext";
import PayPalButton from "../components/payPalButton";
import Layout from "../components/layout";

const Cart = () => {
  const context = useContext(ProductContext)
  // const history = this.props.history
  const {cart, cartTotal, clearCart} = context
  let cartDisplay = (
    <div className='text-center'>
      <p>Your cart is empty</p>
    </div>
  );
  console.log('---PAYPAL_ID:', process.env.PAYPAL_ID)
  console.log('---NEXT_PUBLIC_PAYPAL_ID:', process.env.NEXT_PUBLIC_PAYPAL_ID)
  if (cart.length > 0) {
    cartDisplay = (
      <div className='text-center'>
        <h5>Your Cart</h5>
        <PayPalButton/>
      </div>)
  }
  return (
    <Layout>
      {cartDisplay}
    </Layout>
  )
};

export default Cart;