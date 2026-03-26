import jwt from "jsonwebtoken"

const isAuth = async(req,res, next) => {
    try{
        // console.log("ALL COOKIES:", req.cookies)  // ← add this line

        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message:"Token not found"})
        }
        const verifyToken =  jwt.verify(token, process.env.JWT_SECRET)
        req.userId = verifyToken.userId

        next()
    } catch(error){
        console.log(error)
        return res.status(401).json({message:"is Auth error"})
    }
}

export default isAuth