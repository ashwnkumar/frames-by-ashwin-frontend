import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/form/Button";
import { ArrowUpRight } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { apiConfig } from "../utils/apiConfig";
import Lightbox from "../components/Lightbox";
import LightboxGallery from "../components/Lightbox";

const Home = () => {
  const { admin, setLoading } = useAuth();
  const imageUrl = admin?.homePageUrl ?? "/fallback-image.jpg";
  const [featured, setFeatured] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const fetchFeaturedPhotos = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(apiConfig.photos.getFeaturedPhotos);
      const { photos } = res.data.data;
      setFeatured(photos);
    } catch (error) {
      console.error("Error fetching featured photos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedPhotos();
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start gap-20">
      {/* Hero Section */}
      <section className="w-full xl:h-[60vh] flex flex-col md:flex-row items-center justify-between overflow-hidden">
        {/* Text Content */}
        <div className="w-full md:w-1/2 px-6 py-10 md:px-10 md:py-8 flex flex-col justify-center">
          <h3 className="text-2xl uppercase tracking-wide text-dark">
            Welcome to
          </h3>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-light text-dark mt-2 ">
            <span className="block">frames</span>
            <span className="block">by</span>
            <span className="block font-normal">ashwin.</span>
          </h1>
          <p className="text-lg md:text-xl text-dark/70 mt-4">
            I build apps for a living. And capture moments for the love of it.
          </p>
          <p className="text-lg md:text-xl text-dark/70 mt-2">
            Welcome to my little gallery of moments.
          </p>
          <Button
            label="Explore Gallery"
            navTo="/gallery"
            className="!mt-4 !text-2xl"
            icon={ArrowUpRight}
          />
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 min-h-[250px] md:h-full relative group">
          <img
            src={imageUrl}
            alt="Gallery cover"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 pointer-events-none transition-all duration-500 ease-in-out group-hover:rounded-3xl" />
        </div>
      </section>

      <section className="w-full flex flex-col items-start justify-center gap-6">
        <h2 className="text-3xl md:text-5xl font-medium">Gallery Picks</h2>

        <LightboxGallery images={featured} fetchPhotos={fetchFeaturedPhotos} />
      </section>
    </main>
  );
};

export default Home;
