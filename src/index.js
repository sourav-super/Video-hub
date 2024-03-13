import mongoose from "mongoose";
import connectDb from "./db/db.js"
import dotenv from "dotenv";
import { app } from "./app.js";

// const app = express();
// import { DB_NAME} from "./constants";

dotenv.config({
    path:"./env"
})
connectDb()
.then(()=>{
    app.on("Error",(error)=>{
        console.log("DATABAS IS NOT CONNECT ::",error)
    })
    
    app.listen(process.env.PORT||8000,()=>{
        console.log("SERVER IS RUNING :: PORT: ",process.env.PORT)

    })
})
.catch((error)=>{
    console.log("ERROR ::",error)

}
)


/*
(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("Error",(error)=>{
            console.log("DATABASE DO NOT CONNECT EXPRESS :",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`APP is listening  on PORT :${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Error :",error)
        throw error;        
    }
})()
*/