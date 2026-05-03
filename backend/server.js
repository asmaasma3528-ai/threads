import express from "express";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db.js";
import products from "./models/ProductModel.js";
import productRouter from "./routes/ProductRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working!!");
});

app.use("/api/products", productRouter);

const startApp = async () => {
  try {
    await connectDB();
    await sequelize.sync();
    await sequelize.sync({ alter: true });
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
