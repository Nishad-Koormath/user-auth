import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Otp from "../pages/Otp";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
