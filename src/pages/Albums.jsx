import React from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/form/Button";
import PageHeader from "../components/PageHeader";
import AlbumCard from "../components/AlbumCard";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { apiConfig } from "../utils/apiConfig";

const Albums = () => {
  const { token, setLoading } = useAuth();
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(apiConfig.albums.getAlbums);
      const { albums } = res.data.data;
      setAlbums(albums);
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const headerButtons = [
    { label: "Manage", navTo: "/manage-albums", className: "!text-xl" },
  ];
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <PageHeader title="Albums" buttons={token ? headerButtons : []} />

      {albums.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[40vh] w-full mt-4">
          <h2 className="text-2xl font-semibold">Nothing to see here... yet!</h2>
          <p className="max-w-xs text-center">
            The photographer is still working on creating albums to showcase
            their work. Check back soon for stunning photos and stories.
          </p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Albums;
