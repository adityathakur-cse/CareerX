import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/Landing";
import { Login } from "./Pages/Login";
import Register from "./Pages/Register";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/Auth/layout";
import { Navbar } from "./components/common/Navbar";

function App() {
  return (
    <div className="text-black">
      <Navbar />
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route
          element={
            <CheckAuth>
              <AuthLayout />
            </CheckAuth>
          }
          path="/auth"
        >
          <Route element={<Login />} path="login" />
          <Route element={<Register />} path="register" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
