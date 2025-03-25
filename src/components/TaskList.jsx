import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, markAsDone } from "../features/Todo/taskSlice.jsx";
import AddForm from "./TaskInput.jsx";


export default function Todo(){
    const todos= useSelector((state) => state.todo.todos);
    console.log(todos);

    const dispatch= useDispatch();

    const deleteHandler= (id)=>{
        console.log(`Deleted the task with ID: ${id}` );
        dispatch(deleteTodo(id));
    }

    const markDoneHandler= (id)=>{
        console.log(`Task done with ID: ${id}` );
        dispatch(markAsDone(id));
    }
    

    return(
        <>
            <h2>Todo List App</h2>
            <AddForm/>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span style={todo.isDone ? {textDecoration: "line-through"} : {}}> {todo.task} </span> 
                        <Button variant="contained" onClick={() => deleteHandler(todo.id)}> Delete</Button>
                        <Button variant="contained" onClick={() => markDoneHandler(todo.id)}> Mark As Done</Button>
                    </li>
                ))}
            </ul>
        </>
    );
}