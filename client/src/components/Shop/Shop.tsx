import React from "react"
import style from "./Shop.module.css"

import ShopItem from "./ShopItem/ShopItem"

function Shop() {
  return (
    <div className={style.shop}>
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
    </div>
  )
}

export default Shop
