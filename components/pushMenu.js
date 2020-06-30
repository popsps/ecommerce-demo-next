import React, {useEffect, useState} from 'react';
import Link from "next/link";

const PushMenu = ({isOpen = false, onClose, subtotal = 0, count = 0}) => {
  // const [menuOpen, setMenuOpen] = useState("")
  const [menuWidth, setMenuWidth] = useState({width: "0"})
  // useEffect(() => {
  //   console.log('menuOpen changed')
  //
  // }, [menuOpen])

  useEffect(() => {
    if (isOpen)
      setMenuWidth({width: "650px"})
  }, [isOpen])

  // useEffect(() => {
  //   // if (menuWidth.width === "0")
  //   if (isOpen)
  //     onClose()
  // }, [menuWidth])
  if (isOpen) {
    return (
      <div className='push-menu '>
        <div className='menu' style={menuWidth}>
          <div className='cart'>
            <div className='text-center'>
              <i className="fa fa-times close-btn" aria-hidden="true"
                 onClick={() => {
                   setMenuWidth({width: "0"})
                   setTimeout(() => {
                     onClose()
                   }, 300)
                 }}/>
            </div>
            <p style={{color: "#18BC9C"}}>
              <span><i className="fa fa-check" aria-hidden="true"/>  </span>
              Added to Cart
            </p>
            <p>
              <span style={{fontWeight: "1000"}}>Cart subtotal</span>
              <span>({count} items): </span>
              <span style={{color: "red"}}>${subtotal}</span>
            </p>
            <div className='text-center'>
              <Link href='/cart'>
                <a className="btn btn-success btn-lg">Cart</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else
    return null
};

export default PushMenu;