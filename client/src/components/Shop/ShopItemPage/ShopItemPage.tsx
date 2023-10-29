import React from 'react'
import style from "../Shop.module.css"
import shopImg from "../../../assets/images/shopImg.jpg"

function ShopItemPage() {
  return (
      <div className={`mainContainer ${style.singleItemContainer}`}>
            <div className={style.imgContainer}><img src={shopImg} className={style.itemImg} alt="product" /></div>
            <div className={style.itemInfo}>
                <div className={style.itemName}><h2>Carl #1</h2></div>
                <div className={style.itemPrice}>$50.00</div>

                <div className={style.itemSize}>
                    <label htmlFor="">Size:</label><br />
                    <select name="" className={`${style.itemSelector} ${style.sizeSelector}`}>
                        <option value="">10" x 8"</option>
                        <option value="">24" x 10"</option>
                        <option value="">20" x 16"</option>
                        <option value="">20" x 30"</option>
                        <option value="">24" x 36"</option>
                    </select>
                </div>

                <div className={style.itemQuantity}>
                    <label htmlFor="">Quantity:</label><br />
                    <select name="" className={`${style.itemSelector} ${style.sizeSelector}`}>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                    </select>
                </div>

                <div className={style.addToCartContainer}>
                    <button className={style.addToCart}>Add To Cart</button>
                </div>

                <div className="description" style={{marginTop: "50px"}}>
                    <h2>Description</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

    
            </div>
        </div>

  )
}

export default ShopItemPage