import React, {Component} from 'react'
import {storeProducts} from "./data";


const ProductContext = React.createContext(storeProducts)


export class ProductProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cart: [{
        id: 1,
        title: "Google - Pixel 3a with 64GB Memory Cell Phone (Unlocked) - Just Black - G020G",
        qty: 1,
        price: 337.97,
        image: "img/Google - Pixel 3a with 64GB Memory Cell Phone (Unlocked) - Just Black - G020G.jpg"
      }, {id: 2, title: "Samsung S7", qty: 1, price: 169.99, image: "img/Samsung S7.png"}, {
        id: 3,
        title: "iPhone XS Max 64GB - Gold (Unlocked)",
        qty: 1,
        price: 598.99,
        image: "img/iPhone XS Max 64GB - Gold (Unlocked).jpg"
      }, {id: 4, title: "HTC 10 - White", qty: 1, price: 179.99, image: "img/HTC 10 - White.png"}],
      modalOpen: false,
      item: undefined,
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0,
      cartCount: 0
    }
  }

  componentDidMount() {
    console.log('---------------------cdm-------------------')
    // const tempProducts = []
    // storeProducts.forEach(product => {
    //   tempProducts.push({
    //     id: product.id, title: product.title,
    //     qty: 1, price: product.price, image: product.image
    //   })
    // })

    // this.setState(() => ({products: tempProducts}))

    // this.setState(() => ({cart: tempProducts.slice(0, 4)}))

    // this.setState(() => ({cart: tempProducts.slice(0, 4)})
    //   , () => this.addToCart(tempProducts[4]))

  }

  addToCart = product => {
    const tempProducts = this.state.cart
    const _product = tempProducts.filter(p => p.id === product.id
      && p.title === product.title)[0]
    if (!_product)
      tempProducts.push({
        id: product.id, title: product.title,
        qty: 1, price: product.price, image: product.image
      })
    else {
      _product.qty += 1
    }
    console.log('tempProducts: ', tempProducts)
    this.setState((prevState) => {
      const _cartTotal = prevState.cartTotal
      const _cartTax = prevState.cartTax
      const _cartSubTotal = prevState.cartSubTotal
      const _cartCount = prevState.cartCount + 1
      return {
        cartTotal: _cartTotal, cartTax: _cartTax,
        cartSubTotal: _cartSubTotal, cartCount: _cartCount,
        cart: tempProducts
      }
    })
    console.log('added to cart successfully')
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

