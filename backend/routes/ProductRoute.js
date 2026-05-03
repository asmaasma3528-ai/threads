import express from "express";
import {getProducts, createProduct} from "../controllers/ProductController.js";

const productRoute = express.Router();

productRoute.get("/", getProducts);
productRoute.post("/", createProduct);

export default productRoute;