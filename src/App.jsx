import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/Landing";
import { Login } from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/Auth/layout";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "./components/ui/sonner";
import { StudentLayout } from "./components/Student/Layout";
import Internships from "./Pages/Student/Internships";
import Profile from "./Pages/Student/Profile";
import Training from "./Pages/Student/Training";
import StudentDashboard from "./Pages/Student/StudentDashboard";
import { useEffect } from "react";
import { checkUser } from "./Store/Auth-Slice/authSlice";
import Loader from "./components/ui/Loader";
import CompanyDashboard from "./Pages/Company/CompanyDashboard";
import PostIntern from "./Pages/Company/PostIntern";
import MyIntern from "./Pages/Company/MyIntern";
import Applicants from "./Pages/Company/Applicants";
import CompanyProfile from "./Pages/Company/CompanyProfile";
import CompanyLayout from "./components/Company/Layout";

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
        <Route
          path="/company"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <CompanyLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="post" element={<PostIntern />} />
          <Route path="internships" element={<MyIntern />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="profile" element={<CompanyProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
