import {ProductProvider} from "../productContext"
import React from "react"
import "../styles/main.scss"

export default function App({Component, pageProps}) {
  console.log("_app: pageProps", pageProps)
  return (
    <ProductProvider>
      <Component {...pageProps}/>
    </ProductProvider>
  )
}

