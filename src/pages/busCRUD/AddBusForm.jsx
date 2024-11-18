/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { addBus } from "../../components/apis/BusesApi";
import Loader from "../../components/utils/Loader";
import { pakistanCities } from "../../components/utils/data";

function AddBusForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
    departureTime: "",
    arrivalTime: "",
    date: "",
    busCapacity: "",
    busDetails: {
      busNumber: "",
      engineNumber: "",
      wifi: false,
      ac: false,
      fuelType: "diesel",
      standard: "economy",
    },
    fare: {
      actualPrice: "",
      discount: "",
      promoCode: "",
    },
    stops: [{ name: "", locationLink: "", timeDuration: "" }],
  });

  const cityOptions = Object.keys(pakistanCities);

  const getAllStops = () => {
    return Object.values(pakistanCities).flatMap((city) => city.busStops);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedInputChange = (e, key, subKey) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        [subKey || name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleAddStop = () => {
    setFormData((prevState) => ({
      ...prevState,
      stops: [
        ...prevState.stops,
        { name: "", locationLink: "", timeDuration: "" },
      ],
    }));
  };

  const handleRemoveStop = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      stops: prevState.stops.filter((_, i) => i !== index),
    }));
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
      const data = {
        adminId,
        route: {
          startCity: formData.startLocation,
          endCity: formData.endLocation,
          stops: formData.stops,
        },
        departureTime: formData.departureTime,
        arrivalTime: formData.arrivalTime,
        date: formData.date,
        busCapacity: formData.busCapacity,
        busDetails: formData.busDetails,
        fare: formData.fare,
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
      <form
        className="mt-2 p-6 bg-main w-full m-5 rounded-xl"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-2xl text-center">Add a New Bus</h1>
        {/* Start City */}
        <div className="mb-4">
          <label
            htmlFor="startCity"
            className="block text-xl font-semibold mb-2"
          >
            Start City:
          </label>
          <select
            id="startCity"
            name="startCity"
            value={formData.startCity}
            onChange={handleInputChange}
            required
            className="border rounded-lg px-4 py-2 w-1/2"
          >
            <option value="">Select Depature City</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {/* End City */}
        <div className="mb-4">
          <label
            htmlFor="endLocation"
            className="block text-xl font-semibold mb-2"
          >
            End City:
          </label>
          <select
            id="endCity"
            name="endCity"
            value={formData.endCity}
            onChange={handleInputChange}
            required
            className="border rounded-lg px-4 py-2 w-1/2"
          >
            <option value="">Select End City</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {/* Departure and Arrival Time */}
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
            className="border rounded-lg h-9 p-2 w-full"
          />
        </div>
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
            className="border rounded-lg h-9 p-2 w-full"
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
            className="border rounded-lg h-9 p-2 w-full"
          />
        </div>
        {/* Stops */}
        <div className="mb-4">
          <label className="block text-xl font-semibold mb-2">Stops:</label>
          {formData.stops.map((stop, index) => {
            const allStops = getAllStops(); // Fetch all stops

            return (
              <div key={index} className="mb-2">
                <select
                  value={stop.name}
                  onChange={(e) => {
                    const selectedStop = allStops.find(
                      (s) => s.name === e.target.value
                    );
                    const stops = [...formData.stops];
                    stops[index].name = selectedStop?.name || "";
                    stops[index].locationLink = selectedStop?.link || "";
                    setFormData({ ...formData, stops });
                  }}
                  required
                  className="border rounded-lg h-9 p-2 mr-2"
                >
                  <option value="">Select Stop</option>
                  {allStops.map((stop) => (
                    <option key={stop.name} value={stop.name}>
                      {stop.name}
                    </option>
                  ))}
                </select>

                <input
                  type="url"
                  placeholder="Location Link"
                  value={stop.locationLink}
                  readOnly
                  className="border rounded-lg h-9 p-2 mr-2"
                />

                <input
                  type="number"
                  placeholder="Duration (mins)"
                  value={stop.timeDuration}
                  onChange={(e) => {
                    const stops = [...formData.stops];
                    stops[index].timeDuration = e.target.value;
                    setFormData({ ...formData, stops });
                  }}
                  className="border rounded-lg h-9 p-2 mr-2"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveStop(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={handleAddStop}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Add Stop
          </button>
        </div>

        {/* AC and WiFi */}
        <div className="mb-4">
          <label htmlFor="ac" className="block text-xl font-semibold mb-2">
            AC:
          </label>
          <input
            type="checkbox"
            id="ac"
            name="ac"
            checked={formData.busDetails.ac}
            onChange={(e) => handleNestedInputChange(e, "busDetails", "ac")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="wifi" className="block text-xl font-semibold mb-2">
            WiFi:
          </label>
          <input
            type="checkbox"
            id="wifi"
            name="wifi"
            checked={formData.busDetails.wifi}
            onChange={(e) => handleNestedInputChange(e, "busDetails", "wifi")}
          />
        </div>
        {/* Standard */}
        <div className="mb-4">
          <label className="block text-xl font-semibold mb-2">Standard:</label>
          <label>
            <input
              type="radio"
              name="standard"
              value="economy"
              checked={formData.busDetails.standard === "economy"}
              onChange={(e) =>
                handleNestedInputChange(e, "busDetails", "standard")
              }
            />
            Economy
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="standard"
              value="executive"
              checked={formData.busDetails.standard === "executive"}
              onChange={(e) =>
                handleNestedInputChange(e, "busDetails", "standard")
              }
            />
            Executive
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="standard"
              value="business"
              checked={formData.busDetails.standard === "business"}
              onChange={(e) =>
                handleNestedInputChange(e, "busDetails", "standard")
              }
            />
            Business
          </label>
        </div>
        {/* Fare */}
        <div className="mb-4">
          <label
            htmlFor="actualPrice"
            className="block text-xl font-semibold mb-2"
          >
            Actual Price:
          </label>
          <input
            type="number"
            id="actualPrice"
            name="actualPrice"
            value={formData.fare.actualPrice}
            onChange={(e) => handleNestedInputChange(e, "fare", "actualPrice")}
            required
            className="border rounded-lg h-9 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discount"
            className="block text-xl font-semibold mb-2"
          >
            Discount:
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.fare.discount}
            onChange={(e) => handleNestedInputChange(e, "fare", "discount")}
            className="border rounded-lg h-9 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="promoCode"
            className="block text-xl font-semibold mb-2"
          >
            Promo Code:
          </label>
          <input
            type="text"
            id="promoCode"
            name="promoCode"
            value={formData.fare.promoCode}
            onChange={(e) => handleNestedInputChange(e, "fare", "promoCode")}
            className="border rounded-lg h-9 p-2 w-full"
          />
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg w-full"
        >
          {isLoading ? <Loader /> : "Add Bus"}
        </button>
      </form>
  );
}

export default AddBusForm;
