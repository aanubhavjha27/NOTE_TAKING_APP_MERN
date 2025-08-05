const ratelimit =require("../config/upstash.js")

const rateLimiter= async(req,res,next)=>{
     try {
         const {success}= await ratelimit.limit("my-limit-key")
        if(!success){
            return res.status(429).json({
                message:"rate limit exceeded"
            })
            }
            next();
     } catch (error) {
        console.log("rate limit error",error)
        next(error);
        
     }
}

module.exports=rateLimiter