/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { apiBaseUrl } from "../components/apis/setting";
import { jwtDecode } from "jwt-decode";
import { GrUserWorker } from "react-icons/gr";

const BusesPage = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.toLocaleDateString("en-US", { year: "numeric" });

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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete bus");

      setBuses(buses.filter((bus) => bus._id !== busId));
      toast.success("Bus deleted successfully");
    } catch (error) {
      console.error("Error deleting bus:", error);
      toast.error("Failed to delete bus");
    }
  };

  const getAllBuses = async () => {
    try {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      const response = await fetch(
        `${apiBaseUrl}/bus/ad-bus?adminId=${decodedToken?.sub}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch buses");
      }

      const data = await response.json();
      setBuses(data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      const response = await fetch(
        `${apiBaseUrl}/admin?adminId=${decodedToken?.sub}`
      );

      if (!response.ok) throw new Error("Failed to fetch drivers");

      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    getAllBuses();
    fetchDrivers();
  }, []);

  const handleDriverAddClick = (bus) => {
    setSelectedBus(bus);
    setIsModalOpen(true);
  };

  const handleSubmitDriver = async () => {
    if (!selectedDriver) {
      toast.error("Please select a driver.");
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/bus/${selectedBus._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ driverId: selectedDriver }),
      });

      if (!response.ok) throw new Error("Failed to assign driver");

      setIsModalOpen(false);
      toast.success("Driver assigned successfully!");
      getAllBuses();
    } catch (error) {
      console.error("Error assigning driver:", error);
      toast.error("Failed to assign driver");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDriver("");
  };

  const handleAddBusClick = () => {
    navigate("/add-bus");
  };

  return (
    <div className="content px-6 py-4 pb-16 min-h-screen w-full rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Available Buses</h1>
        <button
          className="bg-primary text-white px-6 py-2 rounded-full shadow-sm"
          onClick={handleAddBusClick}
        >
          Add New Bus
        </button>
      </div>

      {/* Bus Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((bus) => (
          <div
            key={bus._id}
            className="bg-white rounded-xl shadow-lg p-6 transition transform hover:scale-105 hover:shadow-xl"
          >
            <p className="text-gray-600 mb-2 app-btn text-center">
              {bus?.route?.startCity + " to " + bus?.route?.endCity}
            </p>
            <p className="text-gray-600 mb-2">{formatDate(bus?.date)}</p>
            <p className="text-gray-600 mb-2">
              Time: {bus?.departureTime + " to " + bus?.arrivalTime}
            </p>
            <p className="text-gray-600 mb-2">
              Total Seats: {bus?.busDetails?.busCapacity}
            </p>
            <p className="text-gray-600 mb-2">
              Details: {bus?.busDetails?.busNumber}
            </p>
            <p className="text-gray-600 mb-2">Fare: {bus?.fare?.actualPrice}</p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-green-800 text-white px-8 py-2 rounded-full flex items-center"
                onClick={() => handleEditClick(bus._id)}
              >
                <FaEdit className="mr-2" />
                Edit
              </button>
              <button
                className="bg-red-700 text-white py-2 px-8 rounded-full hover:bg-red-500 flex items-center"
                onClick={() => handleDeleteClick(bus._id)}
              >
                <FaTrashAlt className="mr-2" />
                Delete
              </button>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className={`${`px-4 py-2 text-white w-full rounded-full flex justify-center items-center gap-2`} ${
                  bus.driverId ? "bg-green-700" : "bg-gray-500"
                }`}
                onClick={() => handleDriverAddClick(bus)}
              >
                {bus.driverId ? "Driver Assigned" : "Add a Driver"}
                <GrUserWorker className="mr-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h1 className="text-lg font-bold mb-4">
              Choose Driver for Bus#{selectedBus?.busDetails?.busNumber} going
              from {selectedBus?.route?.startCity} to{" "}
              {selectedBus?.route?.endCity}
            </h1>
            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
            >
              <option value="">Select a driver</option>
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmitDriver}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusesPage;
