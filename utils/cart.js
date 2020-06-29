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
  try {
    let myCart = JSON.parse(localStorage.getItem("myCart"))
    myCart = myCart.filter(item => item.id !== id)
    localStorage.setItem("myCart", JSON.stringify(myCart))
  } catch (e) {
    console.log("something went wrong...")
  }
}
const increment = id => {
  const myCart = JSON.parse(localStorage.getItem("myCart"))
  const _product = myCart.filter(p => p.id === id)[0]
  if (_product) {
    _product.qty += 1
  }
  localStorage.setItem("myCart", JSON.stringify(myCart))
  console.log('increment')
}
const decrement = (id) => {
  const myCart = JSON.parse(localStorage.getItem("myCart"))
  const _product = myCart.filter(p => p.id === id)[0]
  if (_product) {
    if (_product.qty > 1) {
      _product.qty -= 1
      localStorage.setItem("myCart", JSON.stringify(myCart))
    } else
      removeFromCart(id)
  }
  console.log('decrement')
}
const clearCart = () => {
  localStorage.removeItem('myCart')
  console.log('clear cart')
}

const addToSubTotal = id => {

}
const removeFromSubTotal = id => {

}

const getMyShoppingCartInfo = () => {
  try {
    const myCart = JSON.parse(localStorage.getItem("myCart"))
    console.log("get my cart:", myCart)
    if (myCart) {
      const subTotal = myCart.reduce((p, c) => Math.round((p + c.price * c.qty) * 100) / 100, 0)
      const count = myCart.reduce((p, c) => p + c.qty, 0)
      console.log('subtotal:', subTotal)
      return {myCart: myCart, count: count, subTotal: subTotal}
    } else
      return {myCart: [], count: 0, subTotal: 0}
  } catch (e) {
    console.log("something went wrong...")
    return {myCart: [], count: 0, subTotal: 0}
  }
}

module.exports = {
  addToCart, getMyShoppingCart, getMyShoppingCartInfo,
  removeFromCart, increment, decrement, clearCart
}