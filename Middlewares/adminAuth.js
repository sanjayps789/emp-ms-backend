const jwt = require('jsonwebtoken')

const adminAuthentication = (req,res,next)=>{
    console.log("Inside Admin Auth Middleware!!!");
    const token = req.headers['authorization'].split(" ")[1]
    try {
       if(token){
        const jwtResponse = jwt.verify(token,process.env.JWT_ADMIN_SECRET_KEY)
        req.admin = jwtResponse.id
        next()
       }else{
        res.status(401).json("Please Provide Token!!!")
       } 
    } catch (error) {
        res.status(500).json({error:"Internal Server Error", message:error.message}) 
    }
}


module.exports = adminAuthentication