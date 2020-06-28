const addToCart = product => {
  try {
    const cachedCart = localStorage.getItem("myCart")
    const myCart = (cachedCart) ? JSON.parse(cachedCart) : []

    const _product = myCart.filter(p => p.id === product.id
      && p.title === product.title)[0]
    if (!_product)
      myCart.push({
        id: product.id, title: product.title,
        qty: 1, price: product.price, image: product.image
      })
    else {
      _product.qty += 1
    }
    console.log('my cart: ', myCart)
    localStorage.setItem("myCart", JSON.stringify(myCart))
    // this.setState((prevState) => {
    //   const _cartTotal = prevState.cartTotal
    //   const _cartTax = prevState.cartTax
    //   const _cartSubTotal = prevState.cartSubTotal
    //   const _cartCount = prevState.cartCount + 1
    //   return {
    //     cartTotal: _cartTotal, cartTax: _cartTax,
    //     cartSubTotal: _cartSubTotal, cartCount: _cartCount,
    //     cart: myCart
    //   }
    // })
    console.log('added to cart successfully')
  } catch (e) {
    console.log("something went wrong...")
  }
}
const getMyShoppingCart = () => {
  try {
    const myCart = JSON.parse(localStorage.getItem("myCart"))
    console.log("get my cart:", myCart)
    if (myCart)
      return myCart
    else
      return []
  } catch (e) {
    console.log("something went wrong...")
    return []
  }
}

const removeFromCart = id => {
  const tempProducts = this.state.products
  tempProducts[id - 1].inCart = false
  const newCart = this.state.cart.filter((item, index) => item.id !== id)
  this.setState(() => ({products: tempProducts, cart: newCart}))
}
const increment = (id) => {
  console.log('increment')
}
const decrement = (id) => {
  console.log('decrement')
}
const clearCart = () => {
  console.log('clear cart')
}
module.exports = {
  addToCart, getMyShoppingCart,
  removeFromCart, increment, decrement, clearCart
}