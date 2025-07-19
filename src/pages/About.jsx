import React from "react";
import { useAuth } from "../context/AuthContext";
import { Instagram, Mail, MapPin } from "lucide-react";

const About = () => {
  const { admin } = useAuth();

  const instagramLink = admin?.links?.find((l) => l.title === "Instagram");
  const instagramUsername = instagramLink?.url
    ?.split("instagram.com/")[1]
    ?.replaceAll("/", "");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-5 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <h1 className="text-4xl font-bold text-gray-900 md:w-1/2">
          A little bit about me
        </h1>
        <p className="text-gray-700 leading-relaxed md:w-1/2">{admin?.about}</p>
      </div>

      {/* Image */}
      {admin?.aboutPageUrl && (
        <div className="w-full flex justify-center">
          <div className="max-w-[80vw] max-h-[70vh] w-auto h-auto overflow-hidden rounded-xl shadow-lg">
            <img
              src={admin.aboutPageUrl}
              alt="About"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="flex flex-col gap-4 text-gray-700 text-base">
        {admin?.location && (
          <div className="flex items-center gap-3">
            <MapPin strokeWidth={1.5} className="text-gray-500" />
            <span>{admin.location}</span>
          </div>
        )}
        {admin?.email && (
          <div className="flex items-center gap-3">
            <Mail strokeWidth={1.5} className="text-gray-500" />
            <a
              href={`mailto:${admin.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {admin.email}
            </a>
          </div>
        )}
        {instagramLink && (
          <div className="flex items-center gap-3">
            <Instagram strokeWidth={1.5} className="text-gray-500" />
            <a
              href={instagramLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @{instagramUsername || "Instagram"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
