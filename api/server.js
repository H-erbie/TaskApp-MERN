require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskModel = require("./models/task");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/api/v1/tasks", async (req, res) => {
  const tasks = await TaskModel.find();
  res.json(tasks);
});

app.post("/api/v1/tasks/new", async (req, res) => {
  const { task } = req.body;
  const tasks = await TaskModel.create({
    task,
  });
  res.json(tasks);
});

app.delete("/api/v1/tasks/:id", async (req, res) => {
  const tasks = await TaskModel.findByIdAndDelete(req.params.id);
  // if (!tasks) {
  //   throw new Error("task not found");
  //   res.status(404);
  // }
  // res.json(tasks);
});



app.put("/api/v1/tasks/:id", async (req, res) => {
  const task = await TaskModel.findById(req.params.id)  

  const updateTask = await TaskModel.findByIdAndUpdate(
    req.params.id,
    { complete: !task.complete },
    { new: true, runValidators: true }
  );


  // if (!tasks) {
  //   throw new Error("task not found");
  //   res.status(404);
  // }
  res.json(updateTask);
});

// app.put('/api/v1/tasks/:id', async(req, res)=>{
//     const tasks = await TaskModel.findOne({req.params.id,
//         complete: !tasks.complete
//     })
//     if(!tasks){
//         throw new Error('task not found')
//         res.status(404)
//     }
//     res.json(tasks)
// })

const start = async () => {
  try {
    mongoose.connect(process.env.CONNECTION_STRING);
    app.listen(port, () => console.log(`server dey run for ${port} in top`));
  } catch (error) {
    console.log(error);
  }
};

start();
// app.listen()
