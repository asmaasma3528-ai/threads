import Banner from "../models/BannerModel.js";

export const getBanners = async (req, res) => {
    try{

        const banners = await Banner.findAll();
        res.status(201).json(banners);
    }catch(err){
        res.status(500).json({success:false, message:err.message});
    }
}