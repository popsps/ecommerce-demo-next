import "../styles/main.css"
import {ProductProvider} from "../productContext";
import React from "react";

export default function MyApp({Component, pageProps}) {
  return (
    <ProductProvider>
      <Component {...pageProps}/>
    </ProductProvider>
  )
}