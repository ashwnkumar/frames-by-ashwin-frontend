import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { admin } = useAuth();
  return (
    <footer className="w-full flex flex-col items-center justify-center p-2">
      <div className="w-full bg-dark text-light flex flex-col items-center justify-center p-6 rounded-xl">
        <h3 className="text-4xl  ">
          I'm just a guy who loves to capture moments.
        </h3>
        <p className="mt-4 text-light/70 text-xl">
          If you've got thoughts, stories or just want to say hey, I'd love to
          hear from you!
        </p>
        <div className="flex items-center justify-center gap-6 mt-4 border-b border-light/50 w-full pb-6">
          {admin?.links?.map((link) => (
            <a
              href={link.url}
              key={link.url}
              target="_blank"
              className="text-lg group  opacity-60 hover:opacity-100 transition-all border border-light px-4 py-1 hover:bg-light hover:text-dark"
            >
              {link.title}
            </a>
          ))}
        </div>
        <div className="mt-4 text-center text-light/70 text-sm md:text-base">
          <p >
            I don't know who needs to hear this, but: You're doing just fine.
            Also, thanks for stopping by
          </p>
          <p >&copy; 2025 Ashwin Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
