import {Sequelize} from "sequelize";
import {sequelize} from "../config/db.js";

const {DataTypes} = Sequelize;

const Users = sequelize.define('User', {
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    password:{
        type:DataTypes.STRING
    }
},
{
    freezeTableName:true
});

export default Users;