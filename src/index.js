// require('dotenv').config()
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: './env'
})


connectDB();












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