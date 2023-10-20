import React from "react"
import style from "../../Account.module.css"
import shopImg from "../../../../assets/images/shopImg.jpg"

function OrderItem() {
  return (
    <div className={style.order}>
      {/* <!-- 1st col: item img  --> */}
      <div className={style.orderItemImgContainer}>
        <img src={shopImg} className={style.orderItemImg} alt="product" />
      </div>

      {/* <!--2nd col: item name, size quantity --> */}
      <div className={style.orderCol2}>
        <div className={style.orderItemName}>Carl #1</div>
        <div className="">Size: 10" x 16"</div>
        <div className="">Qunatity: 1</div>
        <div className="">Total: $50.00</div>
      </div>
    </div>
  )
}

export default OrderItem
