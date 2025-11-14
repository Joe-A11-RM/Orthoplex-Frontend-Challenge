import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";
import Dashboard from "./components/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
