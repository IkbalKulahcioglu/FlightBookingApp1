const https = require("https");

const getFlights = () => {
  const options = {
    method: "GET",
    hostname: "api.schiphol.nl",
    port: null,
    path: "/public-flights/flights", // Add your query parameters if needed
    headers: {
      resourceversion: "v4",
      app_id: "your_app_id", // Replace with your app_id
      app_key: "your_app_key", // Replace with your app_key
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunks = [];

      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks).toString();
        resolve(body); // Resolve the Promise with the API response
      });
    });

    req.on("error", (e) => {
      reject(e); // Reject the Promise on error
    });

    req.end();
  });
};

module.exports = { getFlights }; // Export the function
