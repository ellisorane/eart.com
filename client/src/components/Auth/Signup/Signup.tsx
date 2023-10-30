import React from "react"
import "../Auth.css"

function Signup() {
  return (
    <div className="authContainer">
      <h2>Sign Up</h2>

      <form className="forms" action="">
        <label htmlFor="name">Name</label>
        <br />
        <input type="text" name="name" id="" required />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input type="email" name="email" id="" required />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" name="password" id="" required />
        <br />
        <label htmlFor="confirm password">Re-enter Password</label>
        <br />
        <input type="password" name="confirm password" id="" required />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  )
}

export default Signup
