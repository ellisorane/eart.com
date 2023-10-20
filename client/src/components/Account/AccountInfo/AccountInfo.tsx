import React from "react"
import style from "../Account.module.css"

function AccountInfo() {
  const [toggleInfo, setToggleInfo] = React.useState({
    changeName: false,
    changeEmail: false,
    changePassword: false,
  })

  return (
    <div className="accountInfo">
      <h2 style={{ marginTop: 0 }}>My Account Info</h2>

      <div className={style.accInfo}>
        Name: John Smith{" "}
        <button
          className="submit"
          onClick={() => setToggleInfo({ ...toggleInfo, changeName: !toggleInfo.changeName })}
        >
          Change
        </button>
      </div>
      {toggleInfo.changeName && (
        <div className="forms profileForms">
          <input
            type="text"
            name="name"
            id=""
            placeholder="First and Last Name"
          />
          <button className="submit">Update</button>
        </div>
      )}
      <div className={style.accInfo}>
        Email: jsmith@smith.com <button className="submit">Change</button>
      </div>
      <div className="forms profileForms">
        <input type="email" name="email" id="" placeholder="Email" />
        <button className="submit">Update</button>
      </div>
      <div className={style.accInfo}>
        Password: ********* <button className="submit">Change</button>
      </div>
      <div className="forms">
        <input type="password" name="password" id="" placeholder="Password" />
        <input
          type="password"
          name="confirm password"
          id=""
          placeholder="Confirm Password"
        />
        <button className="submit">Update</button>
      </div>
    </div>
  )
}

export default AccountInfo
