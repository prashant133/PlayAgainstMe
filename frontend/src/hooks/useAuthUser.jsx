import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    api
      .get("/auth/profile")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuthUser() {
  return useContext(AuthContext);
}
