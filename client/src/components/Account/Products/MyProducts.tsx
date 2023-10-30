import React from "react"
import style from "../Account.module.css"
import shopImg from "../../../assets/images/shopImg.jpg"
import AddProduct from "./AddProduct/AddProduct"

function Products() {
  const [addProdForm, setAddProdForm] = React.useState(false)
  return (
    <div>
      <h2>My Products</h2>
      <div className={style.order}>
        {/* <!-- 1st col: item img  --> */}
        <div className={style.orderItemImgContainer}>
          <img src={shopImg} className={style.orderItemImg} alt="product" />
        </div>

        {/* <!--2nd col: item name, size quantity --> */}
        <div className={style.orderCol2}>
          <div className={style.orderItemName}>Carl #1</div>
          <div className="">Price: $50.00</div>
        </div>
      </div>
      <div className={style.checkoutBtn} style={{ margin: "30px auto", cursor: "pointer" }} onClick={() => setAddProdForm(!addProdForm)}>
        Add Product
      </div>

      {addProdForm && <AddProduct />}
    </div>
  )
}

export default Products
