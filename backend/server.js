const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.json({ message: "Landing Page" });
});
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express.js backend!" });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`🚀 Backend berjalan di http://localhost:${PORT}`);
});