import React from "react"
import "../Auth.css"

function Login() {
  return (
    <div className="authContainer">
      <h2>Log in</h2>

      <form className="forms" action="">
        <label htmlFor="email">Email</label>
        <br />
        <input type="email" name="email" id="" required />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" name="password" id="" required />
        <br />
        <input type="submit" value="Log In" />
      </form>
    </div>
  )
}

export default Login
