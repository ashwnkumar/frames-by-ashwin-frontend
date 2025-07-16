import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";

createRoot(document.getElementById("root")).render(
  <>
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
        <Loader />
      </AuthProvider>
    </StrictMode>
  </>
);
