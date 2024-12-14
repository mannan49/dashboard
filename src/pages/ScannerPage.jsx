import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiRfidLine } from "react-icons/ri";
import toast from "react-hot-toast";
import ScannerAnimation from "../components/utils/ScannerAnimation";

const ScannerPage = () => {
  const navigate = useNavigate();

  // Function to handle the RFID scan and navigate
  const handleScan = async (scannedRFID) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/ticket/user/information",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ RFIDCardNumber: scannedRFID }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user details. Please try again.");
      }

      const data = await response.json();
      const userId = data?.[0]?.userId; // Ensure the backend returns `userId`
      if (!userId) {
        throw new Error("Invalid user data received from server.");
      }

      // Navigate to the bookings page
      toast.success("Card scanned successfully!");
      navigate(`/user/bookings/${userId}`);
    } catch (error) {
      toast.error(
        error.message || "An error occurred while scanning the card."
      );
    }
  };

  // Simulate RFID scanning via keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!window.scannerBuffer) window.scannerBuffer = "";
      if (e.key !== "Enter") {
        window.scannerBuffer += e.key; // Accumulate scanned characters
      } else {
        if (window.scannerBuffer) {
          handleScan(window.scannerBuffer); // Pass scanned RFID to the handler
        }
        window.scannerBuffer = ""; // Clear buffer after handling
      }
    };

    // Attach event listener for keyboard input
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      // Cleanup listener on component unmount
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div className="content flex flex-col justify-center items-center gap-4">
      <div className="shadow-xl flex flex-col justify-center items-center p-4 rounded-2xl">
        <div className="p-6 rounded-full bg-gray-200">
          <ScannerAnimation />
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
