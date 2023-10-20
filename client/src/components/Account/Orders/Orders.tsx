import React from "react"
import style from "../Account.module.css"
import shopImg from "../../../assets/images/shopImg.jpg"
import OrderItem from "./OrderItem/OrderItem"

function Orders() {
  return (
    <div className={style.orders}>
      <h2>Orders</h2>
      <OrderItem />
    </div>
  )
}

export default Orders
