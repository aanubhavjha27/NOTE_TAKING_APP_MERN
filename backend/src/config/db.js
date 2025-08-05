const mongoose=require('mongoose')


const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO CONNECTED SUCCESSfully")
    } catch (error) {
        console.error("err connecting to MONGODB",error)
        process.exit(1)//exit with failure
        
    }
}
module.exports={connectdb} 