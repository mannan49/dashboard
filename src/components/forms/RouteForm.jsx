import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiBaseUrl } from "../apis/setting";
import Loader from "../utils/Loader";
import { jwtDecode } from "jwt-decode";
import { pakistanCities } from "../utils/data";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";

function RouteForm() {
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [routeId, setRouteId] = useState(null);
  const [formData, setFormData] = useState({
    startCity: "",
    endCity: "",
    stops: [{ name: "", locationLink: "", duration: "" }],
  });

  const { id } = useParams();
  const cityOptions = Object.keys(pakistanCities);

  const getAllStops = () => {
    return Object.values(pakistanCities).flatMap((city) => city.busStops);
  };

  // Fetch Route Data for Editing
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      setRouteId(id);
      fetchRouteData(id);
    }
  }, [id]);

  const fetchRouteData = async (routeId) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/route/${routeId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch route data");
      }
      setFormData({
        startCity: data.startCity,
        endCity: data.endCity,
        stops: data.stops,
      });
    } catch (error) {
      toast.error(`Error fetching route: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStop = () => {
    setFormData((prevState) => ({
      ...prevState,
      stops: [...prevState.stops, { name: "", locationLink: "", duration: "" }],
    }));
  };

  const handleRemoveStop = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      stops: prevState.stops.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      const apiUrl = isEditMode
        ? `${apiBaseUrl}/route/${routeId}`
        : `${apiBaseUrl}/route`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(apiUrl, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminId: decodedToken?.sub,
          startCity: formData.startCity,
          endCity: formData.endCity,
          stops: formData.stops,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to save route");
      }

      toast.success(data.message || "Route saved successfully!");
      if (!isEditMode) {
        setFormData({
          startCity: "",
          endCity: "",
          stops: [{ name: "", locationLink: "", duration: "" }],
        });
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center m-3 w-2/4">
      <form
        onSubmit={handleSubmit}
        className="border-primary border-solid border-2 w-full rounded-lg h-fit m-3 px-4 lg:px-10 py-3 bg-main"
      >
        <h2 className="text-xl italic font-bold text-center mb-0.5">
          {isEditMode ? "Edit Route" : "Add Route"}
        </h2>

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
            className="border rounded-lg px-4 py-2 w-full"
          >
            <option value="">Select Departure City</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* End City */}
        <div className="mb-4">
          <label htmlFor="endCity" className="block text-xl font-semibold mb-2">
            End City:
          </label>
          <select
            id="endCity"
            name="endCity"
            value={formData.endCity}
            onChange={handleInputChange}
            required
            className="border rounded-lg px-4 py-2 w-full"
          >
            <option value="">Select End City</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xl font-semibold mb-2">Stops:</label>
          {formData.stops.map((stop, index) => {
            const allStops = getAllStops();
            return (
              <div key={index} className="mb-2 grid grid-cols-3">
                {/* Stop Name */}
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
                  className="border rounded-lg h-9 px-2 mr-2"
                >
                  <option value="">Select Stop</option>
                  {allStops.map((stop) => (
                    <option key={stop.name} value={stop.name}>
                      {stop.name}
                    </option>
                  ))}
                </select>

                {/* Time Duration */}
                <input
                  type="number"
                  placeholder="Duration (mins)"
                  value={stop.duration}
                  onChange={(e) => {
                    const stops = [...formData.stops];
                    stops[index].duration = e.target.value;
                    setFormData({ ...formData, stops });
                  }}
                  className="border rounded-lg h-9 px-4 mr-2"
                />

                <div className="flex justify-center items-center gap-2">
                  <button type="button" onClick={handleAddStop}>
                    <FaCirclePlus className="text-green-700 text-2xl" />
                  </button>

                  <button type="button" onClick={() => handleRemoveStop(index)}>
                    <FaCircleMinus className="text-red-700 text-2xl" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="bg-primary mx-auto my-2 border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-1/2">
            <button
              className="text-main text-lg w-full flex justify-center items-center gap-2"
              type="submit"
            >
              {loading ? <Loader /> : isEditMode ? "Update Route" : "Add Route"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RouteForm;
