import React, {Component} from 'react';
import Link from "next/link";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
    this.nav = React.createRef()
  }

  render() {
    const {collapsed} = this.state
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href='/'><a className="navbar-brand">Products</a></Link>
        <button className="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarColor03"
                aria-controls="navbarColor03" aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => {
                  this.nav.current.classList.toggle('collapse')
                  this.setState({collapsed: !collapsed})
                }}>
          <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor03" ref={this.nav}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link href='/'>
                <a className="nav-link">Home <span className="sr-only">(current)</span></a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about">
                <a className="nav-link">About</a>
              </Link>
            </li>
          </ul>
          <div className="nav-item" >
            <Link href='/cart'>
              <a className="nav-link" >
                <i className='fas fa-cart-plus mr-1'/>
                My Cart
              </a>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

// //
// <Link href='/'>
//   // <a className="nav-link">Home</a>
//   // </Link>
// //


export default Navigation;
