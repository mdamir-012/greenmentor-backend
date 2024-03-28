const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId:{type:String,required:true}
});


const taskModel= mongoose.model("taskdata",taskSchema);

module.exports={taskModel};