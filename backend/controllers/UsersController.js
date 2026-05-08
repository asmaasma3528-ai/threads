import Users from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try{

        const user = await Users.findAll({where:{email:req.body.email}});
        if(user.length === 0){
            return res.status(404).json({success:false, message:"User not found"});
        }

    
       const match = await bcrypt.compare(req.body.password, user[0].password);
       if(!match){
        return res.status(404).json({success:false, message:"Wrong password"});
       }

       const userId = user[0].id;
       const name = user[0].name;
       const email = user[0].email;
       const token = jwt.sign({userId, name, email}, 'SECRET_KEY_123', {expiresIn:'1d'});

       res.cookie('token', token, {httpOnly:true, maxAge:24 * 60 * 60 * 1000});
       res.json({msg:"Login was successfull", name});

    }catch(err){
        res.status(500).json({success:false, message:"Internal server error",error: err.message});
    }
}