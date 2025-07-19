import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { apiConfig } from "../utils/apiConfig";
import { useAuth } from "../context/AuthContext";
import Button from "../components/form/Button";
import LightboxGallery from "../components/Lightbox";

const InfoBlock = ({ label, value }) => {
  return (
    <div className="flex flex-col items-start">
      <span className="text-dark/60 text-lg">{label}</span>
      <span className="text-xl">{value}</span>
    </div>
  );
};

const AlbumDetails = () => {
  const { albumId } = useParams();
  const { token } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState([]);

  const fetchPhotos = async () => {
    try {
      const res = await axiosInstance.get(
        apiConfig.photos.getPhotosByAlbum(albumId)
      );
      const { photos } = res.data.data;
      setPhotos(photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
      toast.error(error.response.data.message || "Error fetching photos");
    }
  };

  const getAlbumDetails = async () => {
    try {
      const res = await axiosInstance.get(
        apiConfig.albums.getAlbumById(albumId)
      );
      const { album } = res.data.data;
      setAlbum(album);
    } catch (error) {
      console.error("Error fetching album details:", error);
      toast.error(
        error.response.data.message || "Error fetching album details"
      );
    }
  };

  useEffect(() => {
    fetchPhotos();
    getAlbumDetails();
  }, [albumId]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full px-4 md:px-8 lg:px-16">
      <div className="h-auto flex flex-col md:flex-row items-start md:items-end justify-between  w-full py-8">
        <h1 className="w-full md:w-1/2 text-3xl md:text-5xl font-semibold  md:text-left">
          {album?.title}
        </h1>
        <div className="w-full md:w-1/2 space-y-4 mt-2 md:mt-0">
          <p className="text-base md:text-xl">{album?.desc}</p>
          <div className="flex justify-start gap-20">
            {album.year && <InfoBlock label={"Year"} value={album.year} />}
            {album.location && (
              <InfoBlock label={"Location"} value={album.location} />
            )}
            {album.shotOn && (
              <InfoBlock label={"Shot On"} value={album.shotOn} />
            )}
          </div>
        </div>
      </div>
      {photos.length === 0 ? (
        <div className="w-full h-auto flex flex-col items-center justify-center gap-2">
          <p className="text-xl">No photos found</p>
          {token && <Button label={"Add Photos"} navTo={`/upload`} />}
        </div>
      ) : (
        <LightboxGallery images={photos} fetchPhotos={fetchPhotos} />
      )}
    </div>
  );
};

export default AlbumDetails;
