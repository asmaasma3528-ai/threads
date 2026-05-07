import {Op} from "sequelize";
import Product from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createProduct = async (req, res) => {
  console.log("Model check: ", Product);
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteOneProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const deleted = await Product.destroy({ where: { id: id } });
    if (deleted === 0) {
      res.status(404).json({ message: "Product not found" });
    }
    res.json({message:`Product with ID ${id} deleted successfully`});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProductById = async(req, res) => {
  try{

    const product = await Product.findByPk(req.params.id);

    if(!product){
      res.sttaus(404).json({message:"Product not found"});
    }
    res.json(product);
  }catch(err){
    res.status(500).json({success:false, message:err.message});
  }
}

export const deleteAllProducts = async(req, res) => {
  try{

    await Product.destroy({
      where:{},
      truncate:false
    })
    res.json({message:"All the products deleted successfully"});
  }catch(err){
    res.status(500).json({success:false, message:err.message});
  }
}

export const search = async(req, res) => {
  try{

    const {category, minPrice, maxPrice, search} = req.params;
    const queryOptions = {where:{}};

    if(category){
      queryOptions.where.category = category;
    }

    if(minPrice || maxPrice){

      queryOptions.where.price = {
        [Op.between] : [minPrice || 0, maxPrice || 999999]
      }

      if(search){
        queryOptions.where.name = {
          [Op.like]:`%${search}%`
        }
      }
      const products = await Product.findAll(queryOptions);
      res.json(products);
    }
  }catch(err){
    res.status(500).json({success:false, message:err.message});
  }
}