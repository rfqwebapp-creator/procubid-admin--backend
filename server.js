  require("dotenv").config();
  const express = require("express");
  const authRoutes = require("./routes/authRoutes");
  const userRoutes = require("./routes/userRoutes");
  const roleRoutes = require("./routes/roleRoutes");
  const permissionRoutes = require("./routes/permissionRoutes");
  const adminRoutes = require("./routes/adminRoutes");
  const orgRoutes = require("./routes/organization");
  const subscriptionRoutes = require("./routes/subscriptionRoutes");
  const tenderRoutes = require("./routes/tenderRoutes");
  ;


  const cors = require("cors");
  require("dotenv").config();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", authRoutes);
  app.use("/api", userRoutes);


  app.use("/api", roleRoutes);
  app.use("/api", permissionRoutes);

  app.use("/api/organizations", orgRoutes);
  app.use("/api/subscriptions", subscriptionRoutes);
  app.use("/api/tenders", tenderRoutes);
  app.use("/api/admin", adminRoutes);

  app.get("/", (req, res) => {
    res.send("Procubid Admin Backend Running");
  });

  const PORT = process.env.PORT || 5000;

  // app.listen(PORT, () => {
  //   console.log(`Server running on http://localhost:${PORT}`);
  // });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on ${PORT}`);
  });