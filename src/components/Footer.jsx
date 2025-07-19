import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { admin } = useAuth();
  return (
    <footer className="w-full  flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full  bg-dark text-light flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl">
        <h3 className="text-2xl sm:text-3xl md:text-4xl text-center">
          I'm just a guy who loves to capture moments.
        </h3>
        <p className="mt-4 text-light/70 text-base sm:text-lg text-center px-4">
          If you've got thoughts, stories or just want to say hey, I'd love to
          hear from you!
        </p>

        <div className=" flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 border-b border-light/50 w-full pb-6">
          {admin?.links?.map((link) => (
            <a
              href={link.url}
              key={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base  group opacity-60 hover:opacity-100 transition-all border border-light px-3 sm:px-4 py-1 hover:bg-light hover:text-dark"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="mt-6 text-center text-light/70 text-xs sm:text-sm md:text-base px-4">
          <p>
            I don't know who needs to hear this, but: You're doing just fine.
            Also, thanks for stopping by
          </p>
          <p className="mt-1">&copy; 2025 Ashwin Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
