import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import DynamicForm from "../../components/form/DynamicForm";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { apiConfig } from "../../utils/apiConfig";
import { useAuth } from "../../context/AuthContext";
import Toggle from "../../components/form/Toggle";

const UploadPhoto = () => {
  const { setLoading } = useAuth();
  const [formData, setFormData] = useState({
    image: "",
    isFeatured: false,
    albumId: null,
  });
  const [errors, setErrors] = useState({});
  const [albums, setAlbums] = useState([]);

  const validateForm = () => {
    const err = {};
    if (!formData.image) err.image = "Image is required";
    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleUpload = async () => {
    if (!validateForm())
      return toast.error(
        "error.response.data.message || Please fill all the required fields"
      );

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        apiConfig.photos.createPhoto,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Photo uploaded successfully");
      setFormData({
        image: "",
        isFeatured: false,
        albumId: null,
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error(error.response.data.message || "Error uploading photo");
    } finally {
      setLoading(false);
    }
  };

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

  const handleDropdownChange = (option, name) => {
    if (option) {
      setFormData({
        ...formData,
        [name]: option.value,
      });
      setErrors({
        ...errors,
        [name]: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: null,
      });
    }
  };

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(apiConfig.albums.getAlbums);
      const { albums } = res.data.data;
      const data = albums.map((album) => ({
        value: album._id,
        label: album.title,
      }));
      setAlbums(data);
    } catch (error) {
      console.error("Error fetching albums:", error);
      toast.error(error.response.data.message || "Error fetching albums");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const formOptions = [
    {
      title: "Upload Photo",
      desc: "Upload a photo to the app",
      fields: [
        {
          formType: "file",
          label: "Cover Image",
          name: "image",
          value: formData.image,
          onChange: handleFileChange,
          required: true,
          error: errors.image,
        },
        {
          formType: "dropdown",
          label: "Select Album",
          name: "albumId",
          options: albums,
          value: formData.albumId,
          onChange: (option) => handleDropdownChange(option, "albumId"),
          error: errors.albumId,
        },
        {
          formType: "toggle",
          label: "Featured Photo",
          desc: "Featured photos are displayed on the homepage",
          name: "isFeatured",
          checked: formData.isFeatured,
          onChange: (e) =>
            setFormData({
              ...formData,
              isFeatured: e.target.checked,
            }),
        },
      ],
    },
  ];


  const headerButtons = [
    { label: "Add Photo", onClick: handleUpload, className: "md:!text-xl " },
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <PageHeader
        title={"Upload Photo"}
        buttons={headerButtons}
        backTo={"/gallery"}
      />
      <DynamicForm options={formOptions} />
    </div>
  );
};

export default UploadPhoto;
