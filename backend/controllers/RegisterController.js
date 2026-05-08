import Users from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const Register = async(req, res) => {
        const {name, email, password, confPassword} = req.body;

     if(password != confPassword){
        return res.status(404).json({success:false, message:"Password doesnot match"});
     }
    try{

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        await Users.create({
            name:name,
            email:email,
            password:hashPassword
        });

        res.status(200).json({success:true, message:"Registration was successful"});

    }catch(err){
        res.status(400).json({success:false, message:"Email already exists or database error"});
    }
}