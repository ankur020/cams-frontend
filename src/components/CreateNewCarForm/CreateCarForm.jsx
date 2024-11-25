import React, { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { ToastError, ToastSuccess } from "@/services/toastNotification";

const CreateCarForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 10) {
      setMessage("You cannot upload more than 10 images.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    setLoading(true);
    setMessage("");

    try {
      console.log(formData)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}cars/addcar`, // Replace with your API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Include cookies in the request
        },
      );
      console.log(response.data)
      setMessage(response.data.message || "Car created successfully!");
      ToastSuccess(message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to create car. Please try again.",
      );
      ToastError(message)
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Create Car</h3>
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

          {/* File Upload */}
          <div className="mb-5.5">
            <label
              htmlFor="images"
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Upload Images (Max 10)
            </label>
            <input
              type="file"
              id="images"
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
              {loading ? "Creating..." : "Create Car"}
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

export default CreateCarForm;
