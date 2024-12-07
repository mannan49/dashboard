import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { apiBaseUrl } from "../apis/setting";
import { jwtDecode } from "jwt-decode";

const DriverMap = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [riderLocation, setRiderLocation] = useState(null);

  useEffect(() => {
    // Fetch and update driver location every 5 seconds
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;

    if (!decodedToken) {
      console.error("No token found or token is invalid.");
      return;
    }

    const fetchDriverLocation = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Update driver location in the backend
          await axios.post(`${apiBaseUrl}/location/update`, {
            adminId: decodedToken?.sub,
            latitude,
            longitude,
            role: "admin",
            busId: "671e58cb2794757a101bc483",
          });

          setDriverLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error("Error fetching location: ", error),
        { enableHighAccuracy: true }
      );
    };

    // Fetch rider location
    const fetchRiderLocation = async () => {
      const response = await axios.post(`${apiBaseUrl}/location/fetch`, {
        busId: "671e58cb2794757a101bc483",
        adminId: decodedToken?.sub,
      });
      const riderData = response.data.data;
      console.log("RIDER DATA", riderData);

      if (riderData?.userLatitude && riderData?.userLongitude) {
        setRiderLocation({
          lat: riderData?.userLatitude,
          lng: riderData?.userLongitude,
        });
      }
    };

    fetchDriverLocation();
    fetchRiderLocation();
    const interval = setInterval(() => {
      fetchDriverLocation();
      fetchRiderLocation();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {driverLocation && (
        <MapContainer
          center={driverLocation}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {/* Driver Marker */}
          <Marker position={driverLocation} />
          {/* Rider Marker */}
          {riderLocation && <Marker position={riderLocation} />}
          {/* Polyline */}
          <Polyline positions={[driverLocation, riderLocation]} color="blue" />
        </MapContainer>
      )}
    </div>
  );
};

export default DriverMap;
