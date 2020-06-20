import {ProductProvider} from "../productContext";
import React from "react";
import "../st.css";
import "../styles/main.css";

export default function App({Component, pageProps}) {
  return (
    <ProductProvider>
      <Component {...pageProps}/>
    </ProductProvider>
  )
}