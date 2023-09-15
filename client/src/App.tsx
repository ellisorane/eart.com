// import { Router, Route, Switch } from "react-router-dom"

import Nav from "./components/Nav/Nav"
import AppRouter from "./AppRouter"
import "./App.css"

function App() {
  return (
    <div className="App">
      <Nav />
      <AppRouter />
    </div>
  )
}

export default App
