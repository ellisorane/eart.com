import React from "react"
import { NavLink } from "react-router-dom"
import style from "./Account.module.css"
import shopImg from "../../assets/images/shopImg.jpg"
import Sidebar from "./Sidebar/Sidebar"
import AccountInfo from "./AccountInfo/AccountInfo"
import Orders from "./Orders/Orders"
import Products from "./Products/MyProducts"

function Account() {
  const [currentTab, setCurrentTab] = React.useState<
    "account" | "products" | "orders"
  >("account") // Options: "acount", "products", "orders"
  return (
    <div className="mainContainer">
      <div className={style.accountContainer}>
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <div className="accountContent">
          <AccountInfo />

          <Orders />

          <Products />
        </div>
      </div>
    </div>
  )
}

export default Account
