/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { addBus } from "../../components/apis/BusesApi";
import Loader from "../../components/utils/Loader";

function AddBusForm() {
  // const token = localStorage.getItem("token");
  let adminId = "";
  // let role = "";
  // if (token) {
  //   const decodedToken = jwtDecode(token);
  //   adminId = decodedToken.sub; // Ensure the adminId exists in the token payload

  // }
  // const [email, setEmail] = useState()

  // Form state for all fields
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
    departureTime: "",
    arrivalTime: "",
    date: "",
    busCapacity: "",
    busDetails: "",
    fare: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    let adminId = "";
    if (token) {
      const decodedToken = jwtDecode(token);
      adminId = decodedToken.sub;
    }

    if (!adminId) {
      throw new Error("Error: No admin ID found. Please log in again.");
    }

    setIsLoading(true);

    try {
      // Upload the image to Cloudinary
      // let imageUrl = "";
      // if (selectedFile) {
      //   const formData = new FormData();
      //   formData.append("file", selectedFile);
      //   formData.append("upload_preset", "your_cloudinary_preset"); // Your Cloudinary upload preset

      //   const cloudinaryResponse = await fetch(
      //     "https://api.cloudinary.com/v1_1/dyoql4rkm/image/upload",
      //     {
      //       method: "POST",
      //       body: formData,
      //     }
      //   );
      //   const cloudinaryData = await cloudinaryResponse.json();
      //   imageUrl = cloudinaryData.secure_url;
      // }

      // Prepare bus data with the Cloudinary image URL
      const data = {
        adminId,
        startLocation: formData.startLocation,
        endLocation: formData.endLocation,
        departureTime: formData.departureTime,
        arrivalTime: formData.arrivalTime,
        date: formData.date,
        busCapacity: formData.busCapacity,
        busDetails: formData.busDetails,
        fare: formData.fare,
        // image: imageUrl, // Attach uploaded image URL
      };

      const response = await addBus(data);

      if (response.success) {
        toast.success("Bus has been added successfully!");
      } else {
        toast.error("Failed to add bus");
      }
    } catch (error) {
      toast.error("An error occurred while adding the bus");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content m-5">
      <form
        className="mt-2 p-6 bg-main w-full m-5 rounded-xl"
        onSubmit={handleFormSubmit}
        style={{
          // height: "85vh", // Fixed height for form container
          // overflowY: "scroll", // Enables scroll when content overflows
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
      
        {/* Start Location */}
        <div className="mb-4">
          <label
            htmlFor="startLocation"
            className="block text-xl font-semibold mb-2"
          >
            Start Location:
          </label>
          <input
            type="text"
            id="startLocation"
            name="startLocation"
            value={formData.startLocation}
            onChange={handleInputChange}
            required
            className="border rounded-lg h-9 p-2 w-full focus:outline-none focus:border-primary transition duration-300"
          />
        </div>
        {/* End Location */}
        <div className="mb-4">
          <label
            htmlFor="endLocation"
            className="block text-xl font-semibold mb-2"
          >
            End Location:
          </label>
          <input
            type="text"
            id="endLocation"
            name="endLocation"
            value={formData.endLocation}
            onChange={handleInputChange}
            required
            className="border rounded-lg h-9 p-2 w-full focus:outline-none focus:border-primary transition duration-300"
          />
        </div>
        {/* Departure Time */}
        <div className="mb-4">
          <label
            htmlFor="departureTime"
            className="block text-xl font-semibold mb-2"
          >
            Departure Time:
          </label>
          <input
            type="time"
            id="departureTime"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleInputChange}
            required
            className="border rounded-lg h-9 p-2 w-full focus:outline-none focus:border-primary transition duration-300"
          />
        </div>
        {/* Arrival Time */}
        <div className="mb-4">
          <label
            htmlFor="arrivalTime"
            className="block text-xl font-semibold mb-2"
          >
            Arrival Time:
          </label>
          <input
            type="time"
            id="arrivalTime"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleInputChange}
            required
            className="border rounded-lg h-9 p-2 w-full focus:outline-none focus:border-primary transition duration-300"
          />
        </div>
        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-xl font-semibold mb-2">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="border rounded-lg h-9 p-2 w-full focus:outline-none focus:border-primary transition duration-300"
          />
        </div>
        {/* Bus Capacity */}
        <div className="mb-4">
          <label
            htmlFor="busCapacity"
            className="block text-xl font-semibold mb-2"
          >
            Bus Capacity:
          </label>
          <input
            type="number"
            id="busCapacity"
            name="busCapacity"
            value={formData.busCapacity}
            onChange={handleInputChange}
            required
            className="border rounded-lg h-9 p-2 w-full focus:outline-none focus:border-primary transition duration-300"
          />
        </div>
        {/* Bus Details */}
        <div className="mb-4">
          <label
            htmlFor="busDetails"
            className="block text-xl font-semibold mb-2"
          >
            Bus Details:
          </label>
          <textarea
            id="busDetails"
            name="busDetails"
            value={formData.busDetails}
            onChange={handleInputChange}
            required
            className="border rounded-lg p-2 w-full focus:outline-none focus:border-primary transition duration-300 h-24 resize-none"
          />
        </div>
        {/* Fare */}
        <div className="mb-4">
          <label htmlFor="fare" className="block text-xl font-semibold mb-2">
            Fare:
          </label>
          <input
            type="number"
            id="fare"
            name="fare"
            value={formData.fare}
            onChange={handleInputChange}
            required
            className="border rounded-lg h-9 p-2 w-full focus:outline-none focus:border-primary transition duration-300"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-primary-dark transition duration-300"
        >
          {isLoading ? <Loader /> : "Add Bus"}
        </button>
      </form>
    </div>
  );
}

export default AddBusForm;
