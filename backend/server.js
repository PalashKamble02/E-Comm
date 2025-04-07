const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkouRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productsAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ New CORS configuration
const allowedOrigins = [
  'https://e-comm-uy1a.vercel.app',  // Frontend deployed URL
  'http://localhost:3000'           // Local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to E-Comm API!");
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkouRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);

// Admin routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productsAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// ❌ Old way (for normal servers, not Vercel):
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port : ${PORT}`);
// });

// ✅ New way for Vercel (serverless export)
module.exports = app;
