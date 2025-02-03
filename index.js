const express = require("express");
const app = express();

app.get("/track-pixel", async (req, res) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded || req.socket.remoteAddress;
  console.log("IP Address: ", ip);

  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const { lat, lon, city, country } = response.data;

    console.log(`Location: ${lat}, ${lon}, City: ${city}, Country: ${country}`);
  } catch (error) {
    console.error("Error fetching geolocation data", error);
  }

  res.setHeader("Content-Type", "image/png");
  res.status(200).end(Buffer.alloc(0));
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(3000, () => {
  console.log("Tracking server running on port 3000");
});
