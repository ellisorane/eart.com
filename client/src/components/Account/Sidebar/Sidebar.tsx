import React from "react"
import style from "../Account.module.css"

function Sidebar(props: { setCurrentTab: any, currentTab: string }) {
  
  return (
    <div className={style.sidebarContainer}>
      <h2 style={{ marginTop: 0 }}>John Smith</h2>

      <div className={style.accountSidebar}>
        <div
          className={`${style.accountTab} ${
            props.currentTab == "account" && style.active
          }`}
          onClick={() => props.setCurrentTab("account")}
        >
          <div>Account Info</div>
        </div>
        {/* <!-- For Admin account --> */}
        <div
          className={`${style.accountTab} ${
            props.currentTab == "products" && style.active
          }`}
          onClick={() => props.setCurrentTab("products")}
        >
          <div>My Products</div>
        </div>
        <div
          className={`${style.accountTab} ${
            props.currentTab == "orders" && style.active
          }`}
          onClick={() => props.setCurrentTab("orders")}
        >
          <div>Orders</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
