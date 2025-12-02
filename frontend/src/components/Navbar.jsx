import { Link, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import api from "../lib/apiClient";

export default function Navbar() {
  const { user, setUser } = useAuthUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (err) {
      console.log("Logout error:", err);
    }

    setUser(null);
    navigate("/");
  };

  return (
    <header className="border-b border-slate-200 bg-app-bg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LEFT — Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-500">
            <span className="text-base font-semibold text-white">P</span>
          </div>
          <span className="text-xl font-semibold text-slate-900">
            PlayAgainstMe
          </span>
        </div>

        {/* RIGHT — Auth Controls */}
        {!user ? (
          // Not logged in → Sign In button
          <Link
            to="/login"
            className="rounded-2xl bg-purple-500 px-5 py-2 text-sm font-medium text-white shadow hover:bg-purple-600"
          >
            Sign In
          </Link>
        ) : (
          // Logged in → Profile + Logout
          <div className="flex items-center gap-5">
            {/* CLICKABLE PROFILE SECTION */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <img
                src={user.profilePic}
                alt={user.name}
                className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="font-medium text-slate-900">{user.name}</span>
            </div>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
