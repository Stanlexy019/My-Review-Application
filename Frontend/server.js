const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Serve static files (your frontend)
app.use(express.static(path.join(__dirname)));

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Frontend running at http://0.0.0.0:${port}`);
});
