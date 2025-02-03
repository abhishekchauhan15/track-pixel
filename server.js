const express = require("express");
const app = express();

app.get("/track-pixel", (req, res) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded || req.socket.remoteAddress;

  // Log the real IP (handle IPv6 cases)
  console.log(`IP: ${ip}`);

  res.setHeader("Content-Type", "image/png");
  res.status(200).end(Buffer.alloc(0));
});


app.get("/", (req, res) => {
  
  res.status(200).send("Hello World");
});

app.listen(3000, () => {
  console.log("Tracking server running on port 3000");
});
