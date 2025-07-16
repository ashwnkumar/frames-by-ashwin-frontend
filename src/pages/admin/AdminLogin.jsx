import { Lock, ArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { apiConfig } from "../../utils/apiConfig";
import { envConfig } from "../../utils/envConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    console.log("envConfig", envConfig);

    if (!password) {
      setError("Please enter the password");
      toast.error(error.response.data.message || "Please enter the password");
      return;
    }

    try {
      await login(password);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.response.data.message || "Error logging in");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="p-5 flex flex-col items-center justify-center gap-2 border border-border rounded-lg">
        <div className="rounded-full p-3 flex items-center justify-center bg-dark/8">
          <Lock size={30} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl ">This section is password-protected.</h3>
        <p className="text-lg">Enter the password to continue</p>

        <Input
          placeholder="Enter the password"
          type="password"
          name="password"
          id="password"
          className="w-full"
          error={error}
          onChange={handleInputChange}
        />
        <Button
          label="Continue"
          icon={ArrowUpRight}
          className="!w-full"
          onClick={handleSubmit}
        />
        <Button
          label="Go Back Home"
          className="!w-full"
          navTo={"/"}
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
