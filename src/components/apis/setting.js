// Create an array of base URLs
export const multipleApiBaseUrls = [
  "https://tap-and-travel-backend.vercel.app/api/v1",
  "http://localhost:5000/api/v1",
];

// Determine the index of the base URL to use based on the environment
const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";
const baseUrlIndex = environment === "production" ? 0 : 1;

// Select the appropriate base URL based on the index
export const apiBaseUrl = multipleApiBaseUrls[baseUrlIndex];

// export const apiBaseUrl = "http://localhost:8080";
