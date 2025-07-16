import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navButtons = [
  { label: "gallery", to: "/gallery" },
  { label: "albums", to: "/albums" },
  { label: "about", to: "/about" },
];

const adminButtons = [{ label: "settings", to: "/settings" }];

const Navbar = () => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <nav className="sticky top-0 z-50 w-full bg-light border-b border-border p-3">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-light">
          <Link to="/" className="">
            {token && <span className="text-md">admin.</span>}framesby
            <span className="font-medium">ashwin</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-5">
          {navButtons.map((button) => (
            <NavLink
              key={button.to}
              to={button.to}
              className={({ isActive }) =>
                `text-lg px-2 py-1 opacity-60 hover:opacity-100 transition-opacity ${
                  isActive ? "underline underline-offset-2 opacity-100" : ""
                }`
              }
            >
              {button.label}
            </NavLink>
          ))}

          {token && (
            <>
              {adminButtons.map((button) => (
                <NavLink
                  key={button.to}
                  to={button.to}
                  className={({ isActive }) =>
                    `text-lg px-2 py-1 opacity-60 hover:opacity-100 transition-opacity ${
                      isActive ? "underline underline-offset-2 opacity-100" : ""
                    }`
                  }
                >
                  {button.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={logout}
                className="text-lg px-2 py-1 opacity-60 hover:opacity-100 transition-opacity"
              >
                logout
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="md:hidden text-lg focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "close" : "menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col gap-8 bg-dark text-light text-2xl font-normal">
          <div className="w-full flex items-center justify-between p-3 border-b border-border">
            <div className="text-2xl font-light">
              <Link to="/" className="" onClick={() => setOpen(false)}>
                {token && <span className="text-md">admin.</span>}framesby
                <span className="font-medium">ashwin</span>
              </Link>
            </div>
            <button
              type="button"
              className="text-lg focus:outline-none"
              onClick={() => setOpen(false)}
              aria-label="Toggle menu"
            >
              close
            </button>
          </div>
          {navButtons.map((button) => (
            <NavLink
              key={button.to}
              to={button.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-2 py-1 ${isActive ? "underline underline-offset-2" : ""}`
              }
            >
              {button.label}
            </NavLink>
          ))}
          {token && (
            <>
              {adminButtons.map((button) => (
                <NavLink
                  key={button.to}
                  to={button.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-2 py-1 ${
                      isActive ? "underline underline-offset-2" : ""
                    }`
                  }
                >
                  {button.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="px-2 py-1 self-start"
              >
                logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
