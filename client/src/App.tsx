import { Routes, Route, BrowserRouter as Router } from "react-router-dom" // Import the appropriate router
import Nav from "./components/Nav/Nav"
import AppRouter from "./AppRouter"
import "./App.css"
import Shop from "./components/Shop/Shop"
import Signup from "./components/Auth/Signup/Signup"

function App() {
  return (
    <Router>
      <Nav />
      {/* <AppRouter /> */}
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
