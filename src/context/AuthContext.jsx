import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { apiConfig } from "../utils/apiConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAdmin = async () => {
    try {
      const res = await axiosInstance.get(apiConfig.admin.getAdmin);
      const { admin } = res.data.data;
      setAdmin(admin);
    } catch (error) {
      console.error("Error getting admin:", error);
      toast.error(error.response.data.message || "Error getting admin");
    }
  };

  const login = async (password) => {
    try {
      const res = await axiosInstance.post(apiConfig.admin.login, { password });
      const { token } = res.data.data;
      localStorage.setItem("token", token);
      setToken(token);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error logging in:", error);

      toast.error(error.response.data.message || "Error logging in");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAdmin(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    getAdmin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, admin, login, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
