import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


export const signUp = async(req, res) => {
    try{
        const {name, email, password} = req.body
        const existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message: "Email already exists !"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"password must be at least 6 characters !"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, password:hashedPassword,email
        })

        const token =  genToken(user._id)

        res.cookie("token", token, {
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:true
        })

        // return res.status(200).json(user)
        const userResponse = user.toObject();
        delete userResponse.password; // Remove password from response

        return res.status(200).json(userResponse);
    }
    catch(error){
        return res.status(500).json({message:`Sign up Error: ${error}`})
    }
}

export const Login = async(req, res) => {
    try{
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Email does not exist !"})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "Incorrect Password"})
        }

        const token =  genToken(user._id)

        console.log("LOGIN TOKEN:", token) // ← log


        res.cookie("token", token, {
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:true
        })


        // return res.status(200).json(user)
        const userResponse = user.toObject();
        delete userResponse.password;
        return res.status(200).json(userResponse);
    }
    catch(error){
        return res.status(500).json({message:`Login Error: ${error}`})
    }
}

export const LogOut = async (req, res) => {
    try{
        res.clearCookie("token")
        return res.status(200).json({message: "log out successfully"})
    }catch(error){
        return res.status(500).json({message:`logOut Error: ${error}`})
    }
}
