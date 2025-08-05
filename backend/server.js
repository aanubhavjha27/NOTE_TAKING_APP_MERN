const dotenv=require('dotenv');
const cors=require('cors')
const express=require('express')
const app=express();
const notesroutes=require('./src/routes/notesRoutes.js');
const { connectdb } = require('./src/config/db.js');
const rateLimiter = require('./src/middleware/ratelimiter.js');
dotenv.config()


const port=process.env.PORT



//middleware
app.use(cors({

    origin:"http://localhost:5173",
}
))
app.use(express.json());
app.use(rateLimiter);

app.use((req,res,next)=>{
    console.log(`request method is ${req.method} and request url is ${req.url}`)
    next();
})

app.use("/api/notes",notesroutes);

connectdb().then(()=>{

    app.listen( port,()=>{
        console.log(`listening on ${port}`);
    })
});
app.use(express.json())

 //mongodb+srv://aanubhavjha101:oi2eebaiVio3Aih1@clusterone.pmifk6n.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne
