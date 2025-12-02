import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/Landing";
import { Login } from "./Pages/Login";
import Register from "./Pages/Register";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/Auth/layout";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "./components/ui/sonner";
import { StudentLayout } from "./components/Student/Layout";
import Internships from "./Pages/Internships";
import Profile from "./Pages/Profile";
import Training from "./Pages/Training";
import StudentDashboard from "./Pages/StudentDashboard";
import { useEffect } from "react";
import { checkUser } from "./Store/Auth-Slice/authSlice";
import Loader from "./components/ui/Loader";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="text-black">
      <Toaster />
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
        <Route
          path="/student"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <StudentLayout />
            </CheckAuth>
          }
        >
          <Route element={<StudentDashboard />} path="dashboard" />
          <Route element={<Internships />} path="internships" />
          <Route element={<Profile />} path="profile" />
          <Route element={<Training />} path="training" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
