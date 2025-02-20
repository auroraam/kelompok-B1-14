const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

// API Route contoh
server.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express.js backend!" });
});

// Next.js akan menangani semua halaman lainnya
server.all("*", (req, res) => {
  return handle(req, res);
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.prepare().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
});
