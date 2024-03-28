const express=require("express");
const cors=require("cors");
const { connection } = require("./config/db");
const { userController } = require("./routes/user.route");
const { authentication } = require("./middlewares/authentication");
const { taskController } = require("./routes/task.route");
const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome to greenmentor Api");
})

app.use(cors())

app.use("/user",userController);
app.use(authentication)

app.use("/task",taskController)

app.listen(8000, async()=>{
    try{
        await connection;
        console.log("connected to mongoDB !")

    }
    catch(error){
        console.log(error)
        console.log("error while connecting to mongoDB")
    }
    console.log("listening on port 8000");
})