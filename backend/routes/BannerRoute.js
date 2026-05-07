import express from "express";
import {getBanners} from "../controllers/BannerController.js";

const BannerRoute = express.Router();

BannerRoute.get("/", getBanners);

export default BannerRoute;