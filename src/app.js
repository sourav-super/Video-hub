import express  from "express"
import cors from "cors"
import cookieParser from "cookie-parser"; 


const app = express();
app.use(cors({
    origin:process.env.CORS_ORGIN,
    credentials:true
}))
app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

//Router
import userRouter from "./routes/user.routes.js";
app.use("/users",userRouter)




export {app}
