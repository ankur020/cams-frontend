import React, { useState } from "react";
import axios from "axios";
import { ToastError, ToastSuccess } from "@/services/toastNotification";

const UpdateCarForm = ({ car }) => {
  const [title, setTitle] = useState(car.title);
  const [description, setDescription] = useState(car.description);
  const [tags, setTags] = useState(car.tags); // Convert array to string for input
  const [existingImages, setExistingImages] = useState(car.images); // Existing images
  const [newFiles, setNewFiles] = useState([]); // New images to upload
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setNewFiles([...newFiles, ...e.target.files]);
  };

  const handleDeleteImage = (image) => {
    setExistingImages(existingImages.filter((img) => img !== image));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newFiles.length + existingImages.length > 10) {
      setMessage("You cannot have more than 10 images.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);

    // Include the IDs/URLs of the existing images to retain
    formData.append("existingImages", JSON.stringify(existingImages));

    // Include new images
    Array.from(newFiles).forEach((file) => {
      formData.append("newImages", file);
    });

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}cars/updateCar/${car._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      console.log(response);
      setMessage(response.data.message || "Car updated successfully!");
      ToastSuccess(message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to update car. Please try again.",
      );
      ToastError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Update Car</h3>
      </div>
      <div className="p-7">
        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mb-5.5">
            <label
              htmlFor="title"
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Enter car title"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-5.5">
            <label
              htmlFor="description"
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              rows="4"
              placeholder="Enter car description"
              required
            ></textarea>
          </div>

          {/* Tags Field */}
          <div className="mb-5.5">
            <label
              htmlFor="tags"
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="e.g., SUV, Electric, Luxury"
            />
          </div>

          {/* Existing Images */}
          <div className="mb-5.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Existing Images
            </label>
            <div className="grid grid-cols-3 gap-2">
              {existingImages?.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image} // Assuming these are URLs
                    alt={`Car Image ${index + 1}`}
                    className="h-20 w-full rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(image)}
                    className="bg-red-500 absolute right-1 top-1 rounded-full px-2 text-xs text-white"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-5.5">
            <label
              htmlFor="newImages"
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Add New Images (Max 10)
            </label>
            <input
              type="file"
              id="newImages"
              multiple
              onChange={handleFileChange}
              className="w-full rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4.5">
            <button
              type="reset"
              className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Car"}
            </button>
          </div>
        </form>

        {/* Feedback Message */}
        {message && (
          <div className="text-red-600 mt-4 text-center text-sm font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateCarForm;
