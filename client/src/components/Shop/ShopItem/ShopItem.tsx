// import React from 'react'
import style from "../Shop.module.css"
import shopImg from "../../../assets/images/shopImg.jpg"

function ShopItem() {
  return (
    <div className={style.itemContainer}>
      <div className={style.imgContainer}>
        <img src={shopImg} className={style.itemImg} alt="product" />
      </div>
      <a href="singleItem.html">
        <div className="itemInfo">
          <div className="itemName">
            <h2>Carl #1</h2>
          </div>
          <div className="itemPrice">$50.00</div>
        </div>
      </a>
    </div>
  )
}

export default ShopItem
