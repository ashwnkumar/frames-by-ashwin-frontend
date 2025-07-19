import React from "react";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";
import PhotoCard from "../components/PhotoCard";
import { useState } from "react";
import { apiConfig } from "../utils/apiConfig";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import LightboxGallery from "../components/Lightbox";

const Gallery = () => {
  const { token, setLoading } = useAuth();
  const [photos, setPhotos] = useState([]);

  const getPhotos = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(apiConfig.photos.getPhotos);
      console.log("res from fetch call", res);
      const { photos } = res.data.data;
      setPhotos(photos);
    } catch (error) {
      console.error("Error fetching photos:", error.response);
      toast.error(error.response.data.message || "Error fetching photos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const headerButtons = [
    { label: "Add Photos", navTo: "/upload", className: "md:!text-xl" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <PageHeader title="Gallery" buttons={token ? headerButtons : []} />
      {photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[40vh] w-full mt-6 px-4 text-center text-gray-700">
          <h2 className="text-2xl font-semibold mb-2">
            No photos to display yet
          </h2>
          <p className="max-w-md">
            The gallery is currently empty — the photographer is busy capturing
            amazing moments. Please check back soon for beautiful photos!
          </p>
        </div>
      ) : (
        <LightboxGallery images={photos} fetchPhotos={getPhotos} />
      )}
    </div>
  );
};

export default Gallery;
