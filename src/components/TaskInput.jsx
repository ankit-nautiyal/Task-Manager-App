import Button from '@mui/material/Button';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/Todo/taskSlice";

export default function AddForm(){
    const [task, setTask] = useState("");
    const dispatch= useDispatch();

    const submitHandler= (event)=>{
        event.preventDefault();
        dispatch(addTodo(task));
        setTask("");
    };

    return(
        <>
            <form onSubmit={submitHandler}>
                <input required type="text" placeholder="Enter your task " value={task} onChange={(event)=> setTask(event.target.value)} name="" id="" />
                <Button variant="contained">Add Task</Button>
            </form>
        </>
    );
}