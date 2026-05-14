const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/Auth.routes");
const investorRoutes = require("./routes/Investor.routes");
const fundRoutes = require("./routes/Fund.routes");
const sipRoutes = require("./routes/Sip.routes");
const { errorHandler } = require("./middleware/Errorhandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "SIP Tracker Backend Running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/investors", investorRoutes);
app.use("/api/funds", fundRoutes);
app.use("/api/sips", sipRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

app.use(errorHandler);

module.exports = app;
