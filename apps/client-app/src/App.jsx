import { Routes, Route } from "react-router";
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import './App.css'

function App() {
  

  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
  </Routes>
  )
}

export default App
