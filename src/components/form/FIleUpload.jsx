import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

const FileUpload = ({
  className = "",
  label,
  name,
  required = false,
  error,
  disabled = false,
  handleUpload,
  previewUrl = null,
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(previewUrl);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!file && previewUrl) {
      setPreview(previewUrl);
    }
  }, [previewUrl, file]);

  const updatePreview = (file) => {
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
      updatePreview(file);
      handleUpload(e);
    }
    e.target.value = null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFile(file);
      updatePreview(file);
      handleUpload({ target: { files: e.dataTransfer.files } });
      e.dataTransfer.clearData();
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
    handleUpload({ target: { files: [] } });
  };

  const borderColor = disabled
    ? "border-disabled"
    : error
    ? "border-danger"
    : isDragging
    ? "border-dark"
    : "border-border";

  return (
    <div
      className={`${className} flex flex-col items-start justify-center w-full`}
    >
      {label && (
        <label className="text-md font-medium mb-2">
          {label}{" "}
          {required && (
            <span className="text-danger text-lg font-medium">*</span>
          )}
        </label>
      )}

      {preview ? (
        <div className="w-full flex flex-col items-center gap-4">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full max-h-64 rounded-md object-contain"
          />
          <Button
            variant="danger"
            label="Remove"
            onClick={handleRemove}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            disabled={disabled}
          />
        </div>
      ) : (
        <label
          className={`w-full flex flex-col items-center justify-center p-15 text-center border-2 ${borderColor} hover:border-dark border-dashed rounded-md cursor-pointer transition hover:border-brand bg-main ${
            disabled ? "cursor-not-allowed opacity-60" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={() => {
            if (!disabled) setIsDragging(false);
          }}
          onDrop={disabled ? undefined : handleDrop}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          htmlFor="file-upload"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-base font-medium">
              Drag and drop or{" "}
              <span className="text-brand">click to upload</span>
            </p>
            <p className="text-sm text-heading/70">Maximum file size: 100MB</p>
          </div>
          <input
            id="file-upload"
            type="file"
            ref={inputRef}
            name={name}
            disabled={disabled}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}

      {error && (
        <span className="text-red-500 text-sm font-medium mt-1">{error}</span>
      )}
    </div>
  );
};

export default FileUpload;
