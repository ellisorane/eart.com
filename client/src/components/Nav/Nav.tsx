import React from "react"
import style from "./Nav.module.css"
import { AiOutlineShoppingCart } from "react-icons/ai"
function Nav() {
  const [toggleNav, setToggleNav] = React.useState(false)
  return (
    <nav>
      <div className={style.mainNav}>
        <div
          // className={`${style.toggleBtn}, ${toggleNav && style.active}`}
          className={style.toggleBtn}
          onClick={() => setToggleNav(!toggleNav)}
        >
          <div className={style.hamburger}></div>
        </div>
        <div
          className={
            toggleNav ? style.navlinksContainerOpen : style.navlinksContainer
          }
        >
          <div className={style.navlinks}>
            <p className={style.navlink}>Shop</p>
            <p className={style.navlink}>Account</p>
            <p className={style.navlink}>Logout</p>
            <p className={style.navlink}>Log In</p>
            <p className={style.navlink}>Sign Up</p>
          </div>
        </div>
        <div className={style.siteLogo}>
          <h2>EArt.com</h2>
        </div>
        <div className={style.cart}>
          <p>
            <AiOutlineShoppingCart />
            <span className={style.numOfItems}>0</span>
          </p>
        </div>
      </div>
    </nav>
  )
}

export default Nav
