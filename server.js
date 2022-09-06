import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import todoRouter from "./routers/todoRouter.js";
dotenv.config();

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));
app.get("/",(req,res)=>{
    res.send("server is running now using get");
});
app.use("/api/todos",todoRouter)

// const sch={
//     task:String,
//     id:String
// }
// const monmodel=mongoose.model("todo",sch);
// app.post("/post",async(req,res)=>{
//     res.send(" Post server is running");

//     console.log("post request");
//     const data= new monmodel(
//         {
//             task:req.body.task,
//             id:req.body.id
//         }
    
//     );
//     const value=await data.save();
//     console.log(value)
//     res.json(value);
// })
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
