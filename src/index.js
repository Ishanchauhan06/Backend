// require('dotenv').config()
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import {app} from "./app.js" 
dotenv.config({
    path: './.env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at Port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo DB connection fail!!", err);
})












/*
const app = express()
(async ()=>{
   try{
    await mongoose.connect(`${process.env.MONGODB_URI}
    / ${DB_NAME}`)
    app.on("err", (err)=>{
        console.log("Error", err)
    })

    app.listen(process.env.PORT, ()=>{
        console.log(`App is listening on Port ${process.env.PORT}`);
    })


   }catch(err){
    console.log("Error", err);
    throw err
   }
})()
*/