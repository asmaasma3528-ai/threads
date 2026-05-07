import express from "express";
import {getProducts, createProduct, deleteOneProduct, getProductById, deleteAllProducts, search} from "../controllers/ProductController.js";

const productRoute = express.Router();

productRoute.get("/", getProducts);
productRoute.post("/", createProduct);
productRoute.get("/:id", getProductById);
productRoute.delete("/:id", deleteOneProduct);
productRoute.delete("/delete-all", deleteAllProducts);
productRoute.get("/search/filters", search);

export default productRoute;