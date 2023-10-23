import React from "react"
import style from "../Account.module.css"

function Sidebar() {
  return (
    <div className={style.sidebarContainer}>
      <h2 style={{ marginTop: 0 }}>John Smith</h2>

      <div className={style.accountSidebar}>
        <div className={`${style.accountTab} ${style.active}`}>
          <a href="">Account Info</a>
        </div>
        {/* <!-- For Admin account --> */}
        <div className={style.accountTab}>
          <a href="">My Products</a>
        </div>
        <div className={style.accountTab}>
          <a href="">Orders</a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
