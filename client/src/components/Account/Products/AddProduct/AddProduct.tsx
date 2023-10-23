import React from "react"


function AddProduct() {
  return (
    <form className="forms" action="">
      <label htmlFor="">Product Name</label>
      <br />
      <input type="text" name="name" id="" />
      <br />
      <label htmlFor="">Price</label>
      <br />
      <input type="number" name="price" id="" />
      <br />
      <label htmlFor="">Available Quantity</label>
      <br />
      <input type="number" name="quantity" id="" />
      <br />
      <label htmlFor="">Product Image</label>
      <br />
      <input type="file" name="image" id="" style={{ paddingLeft: 0}} />
      <br />

      <input type="submit" value="Submit" />
    </form>
  )
}

export default AddProduct
