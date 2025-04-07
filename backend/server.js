const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkouRoutes = require("./routes/checkoutRoutes")
const orderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscribeRoute = require("./routes/subscribeRoutes")
const adminRoutes = require("./routes/adminRoutes")
const productsAdminRoutes = require("./routes/productAdminRoutes")
const adminOrderRoutes = require("./routes/adminOrderRoutes")

const app=express();
app.use(express.json());
app.use(cors());

dotenv.config();
// console.log(process.env.PORT);
connectDB();



const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send("Welcome to E-Comm api!");
});

//API Routes

app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",checkouRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api",subscribeRoute);


//Admin
app.use("/api/admin/users",adminRoutes);
app.use("/api/admin/products",productsAdminRoutes);
app.use("/api/admin/orders",adminOrderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
    
});