import React, {Component} from 'react'
import {storeProducts} from "./data";

const ProductContext = React.createContext(storeProducts)

export class ProductProvider extends Component {
  state = {
    // products: storeProducts
    products: [],
    cart: [],
    modalOpen: false,
    item: undefined,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  }

  componentDidMount() {
    const tempProducts = []
    storeProducts.forEach(((value, index) => {
      tempProducts.push(value)
    }))
    this.setState(() => ({products: tempProducts}))
    this.setState(() => ({cart: tempProducts.slice(0, 4)}))
  }

  addToCart = id => {
    const tempProducts = this.state.products
    tempProducts[id - 1].inCart = true
    tempProducts[id - 1].count = 1
    tempProducts[id - 1].total = tempProducts[id - 1].price
    const newCart = this.state.cart
    newCart.push(this.state.products[id - 1])
    this.setState(() => ({products: tempProducts, cart: newCart}))
    console.log('add to cart')
  }
  removeFromCart = id => {
    const tempProducts = this.state.products
    tempProducts[id - 1].inCart = false
    const newCart = this.state.cart.filter((item, index) => item.id !== id)
    this.setState(() => ({products: tempProducts, cart: newCart}))
  }
  openModal = id => {
    const product = this.state.products[id - 1]
    this.setState(() => ({item: product, modalOpen: true}))
  }
  closeModal = () => {
    this.setState(() => ({modalOpen: false}))
  }

  increment = (id) => {
    console.log('increment')
  }
  decrement = (id) => {
    console.log('decrement')
  }
  clearCart = () => {
    console.log('clear cart')
  }

  render() {
    return (
      <ProductContext.Provider value={
        {
          ...this.state,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          clearCart: this.clearCart,
          openModal: this.openModal,
          closeModal: this.closeModal

        }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export const ProductConsumer = ProductContext.Consumer

export default ProductContext

