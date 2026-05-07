import { DataTypes } from "sequelize";
import { sequelize } from "./../config/db.js";

const Banner = sequelize.define("Banner", {
 title:{
    type:DataTypes.STRING,
    allowNull:false
 },
 subTitle:{
    type:DataTypes.STRING
 },
 bgColor:{
    type:DataTypes.STRING,
    defaultValue:"#333"
 },
 imageIcon:{
    type:DataTypes.STRING
 },
 isActive:{
    type:DataTypes.BOOLEAN,
    defaultValue:true
 }
});

export default Banner;
