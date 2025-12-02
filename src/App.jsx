import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/Landing";
import { Login } from "./Pages/Login";
import Register from "./Pages/Register";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/Auth/layout";
import { Navbar } from "./components/common/Navbar";
import { useSelector } from "react-redux";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <div className="text-black">
      <Toaster />
      <Navbar />
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
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
