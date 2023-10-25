import { Routes, Route, BrowserRouter as Router } from "react-router-dom" // Import the appropriate router
import Nav from "./components/Nav/Nav"
import AppRouter from "./AppRouter"
import "./App.css"
import Shop from "./components/Shop/Shop"
import Signup from "./components/Auth/Signup/Signup"
import Login from "./components/Auth/Login/Login"
import Account from "./components/Account/Account"
import ShopItemPage from "./components/Shop/ShopItemPage/ShopItemPage"

function App() {
  return (
    <Router>
      <Nav />
      {/* <AppRouter /> */}
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/products" element={<ShopItemPage />} />
      </Routes>
    </Router>
  )
}

export default App
