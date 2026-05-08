import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB, sequelize } from "./config/db.js";
import products from "./models/ProductModel.js";
import Banner from "./models/BannerModel.js";
import productRouter from "./routes/ProductRoute.js";
import BannerRoute from "./routes/BannerRoute.js";
import userRouter from "./routes/UserRouter.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("API is working!!");
});

app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/banners", BannerRoute);

const startApp = async () => {
  try {
    await connectDB();
    await sequelize.sync();
    await sequelize.sync({ alter: true });
    console.log("Banner Model: ", Object.keys(sequelize.models));
    console.log("Data base connected");
    console.log("Sequelize synced");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on the port ${PORT}`);
    });
  } catch (err) {
    console.error("Error in starting the app", err.message);
  }
};

startApp();
