import React from "react";
import PageHeader from "../../components/PageHeader";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { apiConfig } from "../../utils/apiConfig";
import { useEffect } from "react";
import DynamicForm from "../../components/form/DynamicForm";
import toast from "react-hot-toast";
import Toggle from "../../components/form/Toggle";
import Button from "../../components/form/Button";

const AdminSettings = () => {
  const { setLoading, logout } = useAuth();
  const [siteData, setSiteData] = useState({
    name: "",
    email: "",
    about: "",
    links: [],
    homepage: "",
    aboutpage: "",
    location: "",
  });
  const [changePassword, setChangePassword] = useState(false);
  const [passwordConfig, setPasswordConfig] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  console.log("siteData", siteData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSiteData({
      ...siteData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await axiosInstance.put(apiConfig.admin.updateAdmin, siteData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Details updated successfully");
      setIsEditing(false);
      fetchDetails();
    } catch (error) {
      console.error("Error updating details:", error);
      toast.error(error.response.data.message || "Error updating details");
    } finally {
      setLoading(false);
    }
  };

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(apiConfig.admin.getAdmin);
      const { admin } = res.data.data;
      setSiteData({
        ...siteData,
        name: admin.name,
        email: admin.email,
        about: admin.about,
        links: admin.links || [],
        homepage: admin.homePageUrl,
        aboutpage: admin.aboutPageUrl,
        location: admin.location,
      });
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    const err = {};
    if (!passwordConfig.currentPassword) {
      err.currentPassword = "Current password is required";
    }
    if (!passwordConfig.newPassword) {
      err.newPassword = "New password is required";
    }
    if (!passwordConfig.confirmPassword) {
      err.confirmPassword = "Confirm password is required";
    }
    if (passwordConfig.newPassword !== passwordConfig.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    if (passwordConfig.newPassword !== passwordConfig.confirmPassword) {
      return toast.error(
        error.response.data.message || "Passwords do not match"
      );
    }

    try {
      setLoading(true);
      await axiosInstance.put(apiConfig.admin.updatePassword, {
        currentPassword: passwordConfig.currentPassword,
        newPassword: passwordConfig.newPassword,
      });
      toast.success("Password updated successfully");
      setChangePassword(false);
      setPasswordConfig({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
      logout();
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response.data.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSiteData({
      ...siteData,
      [name]: files[0],
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const formOptions = [
    {
      title: "Admin Details",
      desc: "Enter the details of the admin. This will be visible to the users.",
      fields: [
        {
          formType: "input",
          label: "Name",
          name: "name",
          type: "text",
          placeholder: "Name",
          value: siteData.name,
          onChange: handleInputChange,
          error: errors.title,
          disabled: !isEditing,
        },
        {
          formType: "input",
          label: "Email",
          name: "email",
          type: "email",
          placeholder: "Email",
          value: siteData.email,
          onChange: handleInputChange,
          error: errors.email,
          disabled: !isEditing,
        },
        {
          formType: "input",
          label: "About",
          name: "about",
          type: "text",
          placeholder: "About",
          value: siteData.about,
          onChange: handleInputChange,
          error: errors.about,
          disabled: !isEditing,
        },
        {
          formType: "input",
          label: "Location",
          name: "location",
          type: "text",
          placeholder: "Location",
          value: siteData.location,
          onChange: handleInputChange,
          error: errors.location,
          disabled: !isEditing,
        },
      ],
    },
    {
      title: "Social Links",
      desc: "Add links to your social profiles. These will be visible to the users.",
      fields: siteData.links.map((link) => ({
        formType: "input",
        label: link.title || "Link",
        name: `link-${link._id}`,
        type: "text",
        placeholder: "Link",
        value: link.url,
        onChange: (e) => {
          const updatedLinks = siteData.links.map((l) =>
            l._id === link._id ? { ...l, url: e.target.value } : l
          );
          setSiteData({ ...siteData, links: updatedLinks });
        },
        error: errors[`link-${link._id}`],
        disabled: !isEditing,
      })),
    },
    {
      title: "Images",
      desc: "Manage the images shown on the app.",
      fields: [
        {
          formType: "file",
          label: "Home Screeen",
          name: "homepage",
          onChange: handleFileChange,
          previewUrl: siteData.homepage,
          error: errors.image,
        },
        {
          formType: "file",
          label: "About Page",
          name: "aboutpage",
          onChange: handleFileChange,
          previewUrl: siteData.aboutpage,
          error: errors.image,
        },
      ],
    },
  ];

  const passwordOptions = [
    {
      fields: [
        {
          formType: "input",
          label: "Current Password",
          name: "currentPassword",
          type: "password",
          placeholder: "Current Password",
          value: passwordConfig.currentPassword,
          onChange: (e) =>
            setPasswordConfig({
              ...passwordConfig,
              currentPassword: e.target.value,
            }),
          error: errors.currentPassword,
        },
        {
          formType: "input",
          label: "New Password",
          name: "newPassword",
          type: "password",
          placeholder: "New Password",
          value: passwordConfig.newPassword,
          onChange: (e) =>
            setPasswordConfig({
              ...passwordConfig,
              newPassword: e.target.value,
            }),
          error: errors.newPassword,
        },
        {
          formType: "input",
          label: "Confirm Password",
          name: "confirmPassword",
          type: "password",
          placeholder: "Confirm Password",
          value: passwordConfig.confirmPassword,
          onChange: (e) =>
            setPasswordConfig({
              ...passwordConfig,
              confirmPassword: e.target.value,
            }),
          error: errors.confirmPassword,
        },
      ],
    },
  ];

  const headerButtons = isEditing
    ? [
        {
          label: "Cancel",
          onClick: () => setIsEditing(false),
          variant: "secondary",
        },
        { label: "Save Changes", onClick: handleSaveChanges },
      ]
    : [{ label: "Edit Details", onClick: () => setIsEditing(true) }];

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <PageHeader title="Site Settings" buttons={headerButtons} />
      <DynamicForm options={formOptions} />
      <div className="w-full md:w-1/2 self-end space-y-2">
        <Toggle
          checked={changePassword}
          onChange={() => setChangePassword(!changePassword)}
          label="Change Password"
        />
        {changePassword && (
          <>
            <DynamicForm options={passwordOptions} />
            <div className="flex justify-end">
              <Button
                label={"Update Password"}
                onClick={handleUpdatePassword}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
