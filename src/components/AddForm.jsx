import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/toDo/todoSlice";

export default function AddForm(){
    const [task, setTask] = useState("");
    const dispatch= useDispatch();

    const submitHandler= (event)=>{
        event.preventDefault();
        console.log(task);
        dispatch(addTodo(task));
        setTask("");
    };

    return(
        <>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Enter your task todo" value={task} onChange={(event)=> setTask(event.target.value)} name="" id="" />
                <button>Add Task</button>
            </form>
        </>
    );
}