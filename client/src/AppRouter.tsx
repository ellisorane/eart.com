// src/AppRouter.js
import React from "react"
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"
import Shop from "./components/Shop/Shop"

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Shop />,
    },
  ])
  //   console.log(router.basename)

  return (
    <div className={`mainContainer ${router.basename === "/" && "home"}`}>
      <RouterProvider router={router} />
    </div>
  )
}

export default AppRouter
