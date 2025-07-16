import React from "react";
import PageHeader from "../../components/PageHeader";
import { useState } from "react";
import ModalComponent from "../../components/ModalComponent";
import DynamicForm from "../../components/form/DynamicForm";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { apiConfig } from "../../utils/apiConfig";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import AlbumCard from "../../components/AlbumCard";
import AdminAlbumCard from "../../components/admin/AdminAlbumCard";

const ManageAlbums = () => {
  const { setLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    year: "",
    location: "",
    shotOn: "",
    coverImage: "",
  });
  console.log("formData", formData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleCancel = () => {
    setOpen(false);
    setFormData({
      title: "",
      desc: "",
      coverImage: "",
    });
    setErrors({});
  };

  const validateForm = () => {
    const err = {};
    if (!formData.title) err.title = "Title is required";
    if (!formData.desc) err.desc = "Description is required";
    if (!formData.coverImage) err.coverImage = "Cover image is required";
    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    console.log("formData from handlesubmit", formData);
    if (!validateForm())
      return toast.error(
        "error.response.data.message || Please fill all the required fields"
      );

    try {
      setLoading(true);
      await axiosInstance.post(apiConfig.albums.createAlbum, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Album created successfully");
      handleCancel();
      fetchAlbums();
    } catch (error) {
      console.error("Error creating album:", error);
      toast.error(error.response.data.message || "Error creating album");
    } finally {
      setLoading(false);
    }
  };

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

  const handleEdit = (album) => {};

  const handleDelete = async (album) => {
    try {
      setLoading(true);
      await axiosInstance.delete(apiConfig.albums.deleteAlbum(album._id));
      toast.success("Album deleted successfully");
      fetchAlbums();
      setDeleteModal(null);
    } catch (error) {
      console.error("Error deleting album:", error);
      toast.error(error.response.data.message || "Error deleting album");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const formOptions = [
    {
      fields: [
        {
          formType: "input",
          label: "Title",
          name: "title",
          type: "text",
          placeholder: "Title",
          value: formData.title,
          onChange: handleInputChange,
          required: true,
          error: errors.title,
        },
        {
          formType: "input",
          label: "Description",
          name: "desc",
          type: "text",
          placeholder: "Description",
          value: formData.desc,
          onChange: handleInputChange,
          required: true,
          error: errors.desc,
        },
        {
          formType: "input",
          label: "Year",
          name: "year",
          type: "text",
          placeholder: "Year",
          value: formData.year,
          onChange: handleInputChange,
          error: errors.year,
        },
        {
          formType: "input",
          label: "Location",
          name: "location",
          type: "text",
          placeholder: "Location",
          value: formData.location,
          onChange: handleInputChange,
          error: errors.location,
        },
        {
          formType: "input",
          label: "Shot On",
          name: "shotOn",
          type: "text",
          placeholder: "Shot On",
          value: formData.shotOn,
          onChange: handleInputChange,
          error: errors.shotOn,
        },

        {
          formType: "file",
          label: "Cover Image",
          name: "coverImage",
          value: formData.coverImage,
          onChange: handleFileChange,
          required: true,
          error: errors.coverImage,
        },
      ],
    },
  ];

  const modalButtons = [
    {
      label: "Cancel",
      variant: "secondary",
      onClick: handleCancel,
      className: "md:!text-xl ",
    },
    {
      label: "Submit",
      onClick: handleSubmit,
      className: "md:!text-xl ",
    },
  ];

  const deleteButtons = [
    {
      label: "Cancel",
      onClick: () => setDeleteModal(null),
      variant: "secondary",
    },
    {
      label: "Delete",
      variant: "danger",
      onClick: () => handleDelete(deleteModal),
    },
  ];

  const headerButtons = [
    {
      label: "Add New Album",
      onClick: () => setOpen(true),
      className: "md:!text-xl ",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <PageHeader
        title={"Manage Albums"}
        buttons={headerButtons}
        backTo="/albums"
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {albums.length === 0 ? (
          <p className="text-gray-700 text-sm">No albums found</p>
        ) : (
          albums.map((album) => (
            <AdminAlbumCard
              key={album._id}
              album={album}
              handleDelete={(album) => setDeleteModal(album)}
              handleEdit={handleEdit}
            />
          ))
        )}
      </div>

      <ModalComponent
        isOpen={open}
        setIsOpen={setOpen}
        title="Add New Album"
        buttons={modalButtons}
      >
        <DynamicForm options={formOptions} />
      </ModalComponent>

      <ModalComponent
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        title={`Delete ${deleteModal?.title}?`}
        message={
          "Are you sure you want to delete this album? This action cannot be undone."
        }
        buttons={deleteButtons}
      />
    </div>
  );
};

export default ManageAlbums;
