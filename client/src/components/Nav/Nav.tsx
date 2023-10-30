import React from "react"
import { NavLink } from "react-router-dom"
import style from "./Nav.module.css"
import { AiOutlineShoppingCart } from "react-icons/ai"

function Nav() {
  const [toggleNav, setToggleNav] = React.useState(false)
  const closeNav = () => {
    setToggleNav(false)
  }
  return (
    <nav>
      <div className={style.mainNav}>
        <div
          className={
            toggleNav ? `${style.toggleBtn} ${style.open}` : style.toggleBtn
          }
          onClick={() => setToggleNav(!toggleNav)}
        >
          <div className={style.hamburger}></div>
        </div>
        <div
          className={
            toggleNav
              ? `${style.navlinksContainer} ${style.open}`
              : style.navlinksContainer
          }
        >
          <div className={style.navlinks}>
            <NavLink to="/" className={style.navlink} onClick={closeNav}>
              Shop
            </NavLink>
            <NavLink to="/signup" className={style.navlink} onClick={closeNav}>
              Sign Up
            </NavLink>
            <NavLink to="/login" className={style.navlink} onClick={closeNav}>
              Log In
            </NavLink>
            <NavLink to="/account" className={style.navlink} onClick={closeNav}>
              Account
            </NavLink>
            <p className={style.navlink} onClick={closeNav}>
              Logout
            </p>
          </div>
        </div>
        <div className={style.siteLogo}>
          <NavLink to="/">
            <h2>EArt.com</h2>
          </NavLink>
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
