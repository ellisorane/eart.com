import React from "react"
import style from "../Account.module.css"

interface ToggleInfo {
  [key: string]: boolean
}

function AccountInfo() {
  const [toggleInfo, setToggleInfo] = React.useState<ToggleInfo>({
    changeName: false,
    changeEmail: false,
    changePassword: false,
  })

  const toggleInfoHandler = (fieldName: string) => {
    setToggleInfo({ ...toggleInfo, [fieldName]: !toggleInfo[fieldName] })
  }

  return (
    <div className="accountInfo">
      <h2 style={{ marginTop: 0 }}>My Account Info</h2>
      {/* Name */}
      <div className={style.accInfo}>
        Name: John Smith{" "}
        <button
          className="submit"
          onClick={() => toggleInfoHandler("changeName")}
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
      {/* Name ends  */}

      {/* Email */}
      <div className={style.accInfo}>
        Email: jsmith@smith.com{" "}
        <button
          className="submit"
          onClick={() => toggleInfoHandler("changeEmail")}
        >
          Change
        </button>
      </div>
      {toggleInfo.changeEmail && (
        <div className="forms profileForms">
          <input type="email" name="email" id="" placeholder="Email" />
          <button className="submit">Update</button>
        </div>
      )}
      {/* Email ends */}

      {/* Password */}
      <div className={style.accInfo}>
        Password: ********* <button className="submit" onClick={() => toggleInfoHandler("changePassword")}>Change</button>
      </div>
      {toggleInfo.changePassword && (
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
      )}
      {/* Password ends */}
    </div>
  )
}

export default AccountInfo
