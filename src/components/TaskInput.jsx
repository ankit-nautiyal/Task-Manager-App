import Button from '@mui/material/Button';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/Todo/taskSlice";

export default function TaskInput(){
    const [task, setTask] = useState("");
    const dispatch= useDispatch();

    const handleSubmit= (event)=>{
        event.preventDefault();
        if (task.trim() !== "") {
            dispatch(addTodo(task));
            setTask("");
        };
    }
        

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder="Enter your task " value={task} onChange={(event)=> setTask(event.target.value)} name="" id="" />
                <Button variant="contained" onClick={handleSubmit}>Add Task</Button>
            </form>
        </>
    );
}