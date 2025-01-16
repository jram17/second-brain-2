import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import Dashboard from "./pages/dashboard"
import WebLayout from "./layouts/web-layout"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="brain" element={<Dashboard />} />
        </Route>

        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />

      </Routes>
    </BrowserRouter >
  )
}

export default App
