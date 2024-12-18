/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { apiBaseUrl } from "../components/apis/setting";

const BusesPage = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.toLocaleDateString("en-US", { year: "numeric" });

    // Add suffix to the day
    const daySuffix = (day) => {
      const j = day % 10;
      const k = day % 100;
      if (j === 1 && k !== 11) return day + "st";
      if (j === 2 && k !== 12) return day + "nd";
      if (j === 3 && k !== 13) return day + "rd";
      return day + "th";
    };

    return `${daySuffix(day)} ${month} ${year}`;
  };



  const handleEditClick = (busId) => {
     navigate(`/edit-bus/${busId}`);
    console.log("Edit bus with ID:", busId);
  };


  const handleDeleteClick = (busId) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      deleteBus(busId);
    }
  };

  const deleteBus = async (busId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/bus/${busId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete bus");

      setBuses(buses.filter(bus => bus._id !== busId));
      toast.success("Bus deleted successfully");
    } catch (error) {
      console.error("Error deleting bus:", error);
      toast.error("Failed to delete bus");
    }
  };


  const getAllBuses = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/bus`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch buses");
      }

      const data = await response.json();
      console.log("All Buses:", data);
      setBuses(data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };
  useEffect(() => {
    getAllBuses();
  }, []);

  // Add bus page 
  const handleAddBusClick = () => {
    navigate("/add-bus"); 
  };
  return (
    <div className="content p-6 pb-16 bg-main min-h-screen w-full m-5 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Available Buses</h1>
        <button
          className="bg-primary text-white px-4 py-2 rounded-md shadow-sm "
          onClick={handleAddBusClick}
        >
          Add New Bus
        </button>
      </div>

      {/* Bus Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
        {buses.map((bus, _id) => (
          <div
            key={_id}
            className="bg-white rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:shadow-xl"
          >
            <p className="text-gray-600 mb-2 app-btn text-center">
              {bus.route.startCity + " to " + bus.route.endCity}
            </p>
            <p className="text-gray-600 mb-2">{formatDate(bus.date)}</p>
            <p className="text-gray-600 mb-2 ">
              Time: {bus.departureTime + " to " + bus.arrivalTime}
            </p>
            <p className="text-gray-600 mb-2">Total Seats: {bus.busCapacity}</p>
            <p className="text-gray-600 mb-2">Details: {bus.busDetails.busNumber}</p>
            <p className="text-gray-600 mb-2">Fare: {bus.fare.actualPrice}</p>
            <div className="mt-4 flex justify-between">
              <button className="bg-green-800 text-white  px-8 py-2 rounded-full flex items-center"  onClick={() => handleEditClick(bus._id)}>
              <FaEdit className="mr-2" />
              Edit
              </button>
              <button className="bg-red-700 text-white py-2 px-8 rounded-full hover:bg-red-500 flex items-center" onClick={() => handleDeleteClick(bus._id)}>
                <FaTrashAlt className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BusesPage;
