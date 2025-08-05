const { Ratelimit }= require ("@upstash/ratelimit");
const {Redis} =require ("@upstash/redis");
const dotenv =require("dotenv")
dotenv.config()

//create a limiter for 10 req for 20 seconds
const ratelimit= new Ratelimit ({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(500,"20 s")
})

module.exports=ratelimit;