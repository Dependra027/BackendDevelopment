import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app=express();

//configuring cors
app.use(cors({
    //options
    origin: process.env.CORS_ORIGIN,
    credentials: true  
}))
//configuring coming json limit
app.use(express.json({limit: "16kb"}))

//configuring json coming from url
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

//Serves static files (HTML, CSS, JS, images, PDFs, etc.) from the public folder.
app.use(express.static("public"))

// configuring cookie parser-> it has only work to get and set cookie from user browser and perform curd operation in my server
app.use(cookieParser())



export { app }