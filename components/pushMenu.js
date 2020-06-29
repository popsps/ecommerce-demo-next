import React, {useEffect, useState} from 'react';
import Link from "next/link";

const PushMenu = ({isOpen = false, onClose, subtotal = 0, count = 0}) => {
  const [menuOpen, setMenuOpen] = useState("")
  // useEffect(() => {
  //   console.log('menuOpen changed')
  //
  // }, [menuOpen])
  // useEffect(() => {
  //   console.log('isOpen changed')
  //   if (isOpen)
  //     setMenuOpen('')
  // }, [isOpen])
  if (isOpen) {
    return (
      <div className='push-menu '>
        <div className={`menu ${menuOpen}`}>
          <div className='cart'>
            <div className='text-center'>
              <i className="fa fa-times close-btn" aria-hidden="true"
                 onClick={() => {
                   onClose()

                 }}/>
            </div>
            <p style={{color: "#18BC9C"}}>Added to Cart</p>
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