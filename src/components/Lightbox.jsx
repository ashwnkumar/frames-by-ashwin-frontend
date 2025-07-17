import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { apiConfig } from "../utils/apiConfig";
import ModalComponent from "./ModalComponent";

function Lightbox({ images = [], initialIndex = 0, onClose }) {
 
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const { loading, setLoading } = useAuth();

  useEffect(() => {
    setLoading(true);
  }, [currentIndex]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowRight") {
        setCurrentIndex((i) => (i + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i - 1 + images.length) % images.length);
      } else if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  useEffect(() => {
    const preload = (src) => {
      const img = new Image();
      img.src = src;
    };

    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    preload(images[nextIndex].imageUrl);
    preload(images[prevIndex].imageUrl);
  }, [currentIndex, images]);

  if (!images.length) return null;

  const { title, desc, imageUrl } = images[currentIndex];

  return (
    <div
      className="fixed inset-0 bg-black/85 flex flex-col items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 text-white text-3xl font-bold"
        aria-label="Close"
      >
        <X size={32} />
      </button>

      <div className="relative max-h-[80vh] max-w-full rounded shadow-lg">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className={`rounded max-h-[80vh] max-w-full ${
            loading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onLoad={() => setLoading(false)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <p className="text-light text-sm absolute bottom-4 items-center justify-center gap-2 hidden md:flex">
        <span>Use</span>
        <span className="border border-light p-0.5 rounded">
          <ArrowLeft />
        </span>
        <span className="border border-light p-0.5 rounded">
          <ArrowRight />
        </span>
        <span>to Navigate.</span>
        <span>Press</span>
        <span className="border border-light p-1 rounded">Esc</span>
        <span>to Close.</span>
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIndex((i) => (i - 1 + images.length) % images.length);
        }}
        className="absolute top-1/2 left-4 bg-light text-dark rounded-full pe-0.5 text-3xl"
        aria-label="Previous image"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIndex((i) => (i + 1) % images.length);
        }}
        className="absolute top-1/2 right-4 bg-light text-dark rounded-full ps-0.5 text-3xl"
        aria-label="Next image"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}

export default function LightboxGallery({ images = [] }) {
  const { token } = useAuth();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [deleteItem, setDeleteItem] = useState(null);

  if (!images.length) return null;

  const handleDeletePhoto = async (photo) => {
    try {
      setLoading(true);
      await axiosInstance.delete(apiConfig.photos.deletePhoto(photo._id));
      toast.success("Photo deleted successfully");
      setDeleteItem(null);
      fetchPhotos();
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error(error.response.data.message || "Error deleting photo");
    } finally {
      setLoading(false);
    }   
  };

  const deleteModalButtons = [
    {
      label: "Cancel",
      variant: "secondary",
      onClick: () => setDeleteItem(null),
    },
    {
      label: "Delete",
      variant: "danger",
      onClick: () => handleDeletePhoto(deleteItem),
    },
  ];

  return (
    <>
      {/* Masonry grid using columns */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((photo, i) => (
          <div
            key={photo._id}
            className="relative break-inside-avoid overflow-hidden rounded shadow-sm cursor-pointer transition duration-300 hover:scale-[1.02]"
            onClick={() => {
              setStartIndex(i);
              setLightboxOpen(true);
            }}
          >
            <img
              src={photo.previewUrl}
              alt={photo.title}
              loading="lazy"
              className="w-full h-auto object-cover rounded"
            />
            {token && (
              <button
                type="button"
                className="bg-danger text-light absolute top-2 right-2 "
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteItem(photo);
                }}
              >
                <X />
              </button>
            )}
          </div>
        ))}
      </div>

      <ModalComponent
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        title={`Delete ${deleteItem?.title}`}
        message={"Are you sure you want to delete this photo?"}
        buttons={deleteModalButtons}
      />

      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={startIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
