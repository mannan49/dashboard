// EditBus.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // or react-toastify
import { fetchBusById, updateBus } from '../../components/apis/BusesApi'; // Assuming you have these API functions

function EditBus() {
    //we are getting busId dynamically
  const { busId } = useParams(); 
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: '',
    departureTime: '',
    arrivalTime: '',
    date: '',
    busCapacity: '',
    busDetails: '',
    fare: '',
  });

  useEffect(() => {
    // Fetch bus details by ID when component mounts
    const getBusDetails = async () => {
      try {
        const data = await fetchBusById(busId);
        setBus(data);
        setFormData(data);
      } catch (error) {
        toast.error('Failed to load bus details');
      }
    };

    getBusDetails();
  }, [busId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBus(busId, formData);
      toast.success('Bus updated successfully');
      navigate('/buses');
    } catch (error) {
      toast.error('Failed to update bus');
    }
  };

  if (!bus) return <p>Loading...</p>;

  return (
    <div className="content m-5 bg-main rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 pl-10 pt-4">Edit Bus</h1>
      <form onSubmit={handleSubmit} className="mt-2 p-6 bg-main w-full m-5 rounded-xl">
        {/* Form fields here */}
        <div className="mb-4">
          <label htmlFor="startLocation" className="text-xl">Start Location:</label>
          <input
            type="text"
            id="startLocation"
            name="startLocation"
            value={formData.startLocation}
            onChange={handleInputChange}
            required
            className="border mt-1 rounded-lg h-9 p-2 w-full"
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
        {/* Repeat for other fields */}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditBus;
