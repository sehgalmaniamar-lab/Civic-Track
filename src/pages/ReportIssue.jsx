import React, { useState } from "react";
import SectionHeading from "../components/SectionHeading";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Upload, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { addComplaint } from "../services/complaintService";

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setFormData({
      ...formData,
      image: file,
    });

    setPreview(
      URL.createObjectURL(file)
    );
  }
};

  const handleLocationDetect = () => {
  if (!navigator.geolocation) {
    toast.error("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      toast.success("Location detected!");
    },

    () => {
      toast.error("Unable to fetch location.");
    }
  );
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formDataToSend =
      new FormData();

    formDataToSend.append(
      "title",
      formData.title
    );

    formDataToSend.append(
      "category",
      formData.category
    );

    formDataToSend.append(
      "description",
      formData.description
    );

    formDataToSend.append(
      "status",
      "open"
    );

    formDataToSend.append(
      "latitude",
      formData.latitude
    );

    formDataToSend.append(
      "longitude",
      formData.longitude
    );

    if (formData.image) {
      formDataToSend.append(
        "image",
        formData.image
      );
    }

    await addComplaint(
      formDataToSend
    );

    alert(
      "Complaint submitted successfully!"
    );

    setFormData({
      title: "",
      category: "",
      description: "",
      image: null,
      latitude: "",
      longitude: "",
    });

  } catch (error) {
    console.error(error);

    alert(
      "Failed to submit complaint"
    );
  }
};

  return (
    <div className="max-w-3xl mx-auto">
      <SectionHeading
        title="Report an Issue"
        subtitle="Help improve your city by reporting road and infrastructure problems."
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 md:p-8 mt-8 space-y-6"
      >
        {/* Issue Title */}
        <InputField
          label="Issue Title"
          id="title"
          placeholder="e.g. Large pothole near metro station"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Category */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Issue Category
          </label>

          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select Category</option>

            <option value="Pothole">
              Pothole
            </option>

            <option value="Waterlogging">
              Waterlogging
            </option>

            <option value="Streetlight">
              Broken Streetlight
            </option>

            <option value="Road Damage">
              Road Damage
            </option>

            <option value="Drainage">
              Open Drainage
            </option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            id="description"
            rows="5"
            placeholder="Describe the issue..."
            value={formData.description}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
        </div>

        {/* Upload Image */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Upload Image
          </label>

          <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 transition">
            <Upload className="w-8 h-8 text-primary-600 mb-2" />

            <span className="text-sm text-gray-500">
              Click to upload complaint image
            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {formData.image && (
            <p className="text-sm text-green-600">
              Selected: {formData.image.name}
            </p>
          )}

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl mt-4"
            />
          )}
        </div>

        {/* Location Section */}
        <div className="bg-gray-100 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <MapPin className="text-primary-600" />

            <span className="text-sm text-gray-700">
              Your live location will be attached automatically
            </span>
          </div>

          <Button
  type="button"
  variant="outline"
  onClick={handleLocationDetect}
>
            GPS Enabled
          </Button>
        </div>
        {location && (
  <p className="text-sm text-green-600 mt-2">
    Latitude: {location.latitude.toFixed(4)} | Longitude:{" "}
    {location.longitude.toFixed(4)}
  </p>
)}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 text-lg"
        >
          Submit Complaint
        </Button>
      </form>
    </div>
  );
}