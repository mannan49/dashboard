import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { apiBaseUrl } from "../apis/setting";
import { formatDateToDayMonth } from "../utils/HelperFunctions";
import { useNavigate } from "react-router-dom";

const DriverDashboard = () => {
  const [driverBuses, setDriverBuses] = useState([]);
  const [filter, setFilter] = useState("Upcoming");
  const navigate = useNavigate();
  const today = new Date();
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const tomorrowMidnight = new Date(todayMidnight);
  tomorrowMidnight.setDate(todayMidnight.getDate() + 1);
  const dayAfterTomorrow = new Date(todayMidnight);
  dayAfterTomorrow.setDate(todayMidnight.getDate() + 2);

  useEffect(() => {
    fetchDriverBuses();
  }, []);

  const fetchDriverBuses = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const response = await fetch(`${apiBaseUrl}/bus/bus-advance-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          driverId: decodedToken?.sub,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch buses");
      }

      const data = await response.json();
      setDriverBuses(data.data);
    } catch (error) {
      console.error("Error fetching driver's buses:", error);
    }
  };

  const filterBuses = () => {
    if (filter === "Today") {
      return driverBuses.filter(
        (bus) =>
          new Date(bus.date).toDateString() === todayMidnight.toDateString()
      );
    }

    if (filter === "Tomorrow") {
      return driverBuses.filter(
        (bus) =>
          new Date(bus.date).toDateString() === tomorrowMidnight.toDateString()
      );
    }

    if (filter === "UpcomingDates") {
      return driverBuses.filter(
        (bus) =>
          new Date(bus.date).toDateString() === dayAfterTomorrow.toDateString()
      );
    }

    if (filter === "Upcoming") {
      return driverBuses.filter((bus) => new Date(bus.date) >= todayMidnight);
    }

    if (filter === "Past") {
      return driverBuses.filter((bus) => new Date(bus.date) < todayMidnight);
    }

    return driverBuses;
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const isStartDriveAvailable = (departureTime, arrivalTime) => {
    const [depHours, depMinutes] = departureTime.split(":").map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(":").map(Number);

    const now = new Date();

    // Create a Date object for the departure time
    const departure = new Date();
    departure.setHours(depHours, depMinutes, 0, 0);

    // Create a Date object for the arrival time
    const arrival = new Date();
    arrival.setHours(arrHours, arrMinutes, 0, 0);

    // Calculate the end of the "availability window" (4 hours after arrival)
    const availabilityEnd = new Date(arrival);
    availabilityEnd.setHours(arrival.getHours() + 4);

    // Check if current time is within the allowed window
    return now >= departure - 30 * 60 * 1000 && now <= availabilityEnd;
  };

  const handleStartDrive = (busId) => {
    navigate(`driver/map/${busId}`);
  };

  return (
    <div className="content lg:p-4">
      <div className="m-auto lg:px-8 lg:py-2">
        <h1 className="font-bold text-3xl">Driver Dashboard</h1>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Assigned Buses</h1>
          <div className="flex justify-center items-center gap-2">
            <h1>Filter</h1>
            <select
              className="bg-gray-100 p-2 border rounded-md"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="Today">
                Today,{" "}
                {todayMidnight.toLocaleDateString("en-US", { weekday: "long" })}
              </option>
              <option value="Tomorrow">
                Tomorrow,{" "}
                {tomorrowMidnight.toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </option>
              <option value="UpcomingDates">
                {dayAfterTomorrow.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  weekday: "long",
                })}
              </option>
              <option value="Upcoming">Upcoming Buses</option>
              <option value="Past">Past Buses</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterBuses().length === 0 ? (
            <h1 className="text-center text-lg font-semibold">
              No bus drives for {filter.toLowerCase()}.
            </h1>
          ) : (
            filterBuses().map((bus, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:shadow-xl"
              >
                <p className="text-gray-600 mb-2 text-center">
                  {bus?.route?.startCity + " to " + bus?.route?.endCity}
                </p>
                <p className="text-gray-600 mb-2">
                  {formatDateToDayMonth(bus?.date)}
                </p>
                <p className="text-gray-600 mb-2">
                  Time: {bus?.departureTime + " to " + bus?.arrivalTime}
                </p>
                <p className="text-gray-600 mb-2">
                  Total Seats: {bus?.busDetails?.busCapacity}
                </p>
                <p className="text-gray-600 mb-2">
                  Details: {bus?.busDetails?.busNumber}
                </p>
                <p className="text-gray-600 mb-2">
                  Fare: {bus?.fare?.actualPrice}
                </p>
                {filter === "Today" &&
                  isStartDriveAvailable(bus.departureTime, bus.arrivalTime) && (
                    <button
                      className="bg-green-500 text-white p-2 rounded-md"
                      onClick={() => handleStartDrive(bus._id)}
                    >
                      Start Drive
                    </button>
                  )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
