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
      console.log("LOGOUT ERROR:", err?.response?.status);
    }

    setUser(null);
    navigate("/");
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600">
            <span className="text-base font-semibold text-white">P</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">
            PlayAgainstMe
          </span>
        </div>

        {/* Right side */}
        {!user ? (
          <Link
            to="/login"
            className="rounded-xl bg-purple-600 px-5 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            Sign In
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <img
              src={user.profilePic}
              alt={user.name}
              className="h-9 w-9 rounded-full object-cover border"
              referrerPolicy="no-referrer"
            />

            <span className="font-medium">{user.name}</span>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
