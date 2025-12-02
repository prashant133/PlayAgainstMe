import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreateMatch from "./pages/CreateMatch.jsx";
import EditMatch from "./pages/EditMatch.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-match"
          element={
            <ProtectedRoute>
              <CreateMatch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-match/:id"
          element={
            <ProtectedRoute>
              <EditMatch />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
