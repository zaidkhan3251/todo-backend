import expressAsyncHandler from "express-async-handler";
import express from "express";
import Todo from "../model/todoModel.js";



const todoRouter = express.Router();

todoRouter.get("/", expressAsyncHandler(async (req, res) => {
    const todos = await Todo.find();
    res.send(todos);
    console.log(todos)
}));
todoRouter.post('/add', expressAsyncHandler(async (req, res) => {
    const newtodo = new Todo({
        task: req.body.task,

    })
    await newtodo.save();
    res.send(newtodo);
}
))
todoRouter.put('/update', expressAsyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.body.id);
    if(todo){
        todo.task=req.body.task||todo.task
        const updatedtodo = await todo.save();
        res.send({message:"Task updated",todo:updatedtodo})
    }
    else{
        res.send({message:"Task not found"})
    }
}))
todoRouter.delete('/delete', expressAsyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.body.id);
    if(todo){
        await todo.remove();
        res.send({message:"Task deleted"})
    }
    else{
        res.send({message:"Task not found"})
    }
}))
export default todoRouter;