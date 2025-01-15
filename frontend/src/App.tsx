import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import Dashboard from "./pages/dashboard"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/brain" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
