import Head from "next/head";
import Navigation from "./navigation";

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>E-commerce app demo</title>
        <link rel="icon" href="./favicon.ico"/>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
              integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
              crossOrigin="anonymous"/>

      </Head>
      <Navigation/>
      <div className='container mt-4'>
        {props.children}
        {/*<footer>*/}
        {/*  <a*/}
        {/*    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*  >*/}
        {/*    Powered by{' '}*/}
        {/*    <img src="/vercel.svg" alt="Vercel Logo" className="logo"/>*/}
        {/*  </a>*/}
        {/*</footer>*/}
      </div>
    </div>
  )
}
export default Layout