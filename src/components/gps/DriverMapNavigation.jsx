/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import LocationDemographics from "./LocationDemographics";
import { BiSolidEditLocation } from "react-icons/bi";
import { apiBaseUrl } from "../apis/setting";
import Loader from "../utils/Loader";
import { jwtDecode } from "jwt-decode";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const DriverMapNavigation = () => {
  const { busId } = useParams();

  const [userLocation, setUserLocation] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [busData, setBusData] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // Function to update driver's location in the backend
  const updateDriverLocation = async (latitude, longitude) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const response = await fetch(`${apiBaseUrl}/location/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          busId,
          driverId: decodedToken?.sub,
          latitude,
          longitude,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update driver location");
      }
    } catch (error) {
      console.error("Error updating driver location:", error);
    }
  };

  // Function to fetch bus data
  const fetchBusData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiBaseUrl}/bus/bus-advance-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          _id: busId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch buses");
      }

      const data = await response.json();
      setBusData(data.data[0]);
    } catch (error) {
      console.error("Error fetching driver's buses:", error);
    }
  };

  // Fetch bus data on component mount
  useEffect(() => {
    fetchBusData();
  }, []);

  // Fetch destination coordinates once bus data is available
  useEffect(() => {
    if (busData) {
      const fetchDestinationCoords = async () => {
        try {
          const { data } = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
              params: {
                address: `${busData.route.endCity}`,
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              },
            }
          );
          const location = data.results[0]?.geometry.location;
          setDestinationCoords(location);
        } catch (error) {
          console.error("Error fetching destination coordinates:", error);
        }
      };

      fetchDestinationCoords();
    }
  }, [busData]);

  // Geolocation watcher to track location in real time
  useEffect(() => {
    let watchId;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude }); // Update user's location
          updateDriverLocation(latitude, longitude); // Send location to the backend
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
      }
    };
  }, []);

  // Calculate the route once both userLocation and destinationCoords are ready
  useEffect(() => {
    if (userLocation && destinationCoords) {
      const calculateRoute = async () => {
        try {
          const directionsService = new window.google.maps.DirectionsService();
          const results = await directionsService.route({
            origin: userLocation,
            destination: destinationCoords,
            travelMode: window.google.maps.TravelMode.DRIVING,
          });
          setDirectionsResponse(results);
          setDistance(results.routes[0].legs[0].distance.text);
          setDuration(results.routes[0].legs[0].duration.text);
        } catch (error) {
          console.error("Error calculating route:", error);
        }
      };

      calculateRoute();
    }
  }, [userLocation, destinationCoords]);

  // Handle destination change
  const handleSelectDestination = async (stopName) => {
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: stopName,
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          },
        }
      );
      const location = data.results[0]?.geometry.location;
      setDestinationCoords(location);
    } catch (error) {
      console.error("Error fetching stop coordinates:", error);
    }
  };

  if (!isLoaded)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className="w-full py-10">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={15}
        center={userLocation || destinationCoords}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>

      <LocationDemographics distance={distance} duration={duration} />

      <div>
        <h3 className="text-center text-xl font-semibold flex justify-center items-center gap-1">
          Switch Destination <BiSolidEditLocation className="text-2xl" />
        </h3>

        {busData?.route.stops.map((stop, index) => (
          <div
            key={index}
            className="bg-white flex justify-between items-center px-4 py-2 rounded-xl gap-4 mb-6"
          >
            <p>
              Stop {index + 1}: {stop.name}
            </p>
            <p>Duration: {stop.duration} minutes</p>
            <button
              onClick={() => handleSelectDestination(stop.name)}
              className="bg-primary text-white px-4 py-1 rounded-full"
            >
              Select Route
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverMapNavigation;
