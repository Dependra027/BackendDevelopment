import dotenv from "dotenv";
import connectDB from "./db/index.js";

// Load environment variables
dotenv.config();

// import express from "express";

// const app=express()

// //making connection
//   ( async()=>{
   
//     //use try catch every time u use db
//     try {
//     //   connection db
//       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//       //using some feature of express
//       app.on("error",(error)=>{
//         console.log(error);
//         throw error
//       })
//       //we can use listen as well
//       app.listen(proces.env.PORT,()=>{
//         console.log("server is running on port 3000");
//       })

//     }
//     catch(error){
//       console.error("Eoor", error)
//       throw error
//     }
//   })()

//* 2nd method- just import the db file and connect

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running on port: ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.error("Error", error);
})







