import Button from '@mui/material/Button';
import { useState } from "react";
import { useDispatch } from "react-redux";
import {addTodo} from "../features/taskSlice"
import { TextField } from '@mui/material';

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
                <TextField  required type="text" placeholder="Enter your task " value={task} onChange={(event)=> setTask(event.target.value)}></TextField>
                <Button sx={{margin: '7px 0px 0px 10px'}} variant="contained" onClick={handleSubmit}>Add Task</Button>
            </form>
        </>
    );
}