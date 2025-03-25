import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, markAsDone } from "../features/Todo/taskSlice.jsx";
import TaskInput from "./TaskInput.jsx";
import { logout } from "../features/Auth/authSlice.jsx";
import { useNavigate } from "react-router-dom";


export default function TaskList(){
    const todos= useSelector((state) => state.todo.todos);
    const navigate= useNavigate();

    const dispatch= useDispatch();

    const handleDelete= (id)=>{
        console.log(`Deleted the task with ID: ${id}` );
        dispatch(deleteTodo(id));
    }

    const handleMarkAsDone= (id)=>{
        console.log(`Task done with ID: ${id}` );
        dispatch(markAsDone(id));
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate("/auth");
    };
    

    return(
        <>  
            <Button variant="contained" onClick={handleLogout}> Logout</Button>

            <h2>Todo List App</h2>
            <TaskInput/>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span style={todo.isDone ? {textDecoration: "line-through"} : {}}> {todo.task} </span> 
                        <Button variant="contained" onClick={() => handleDelete(todo.id)}> Delete</Button>
                        <Button variant="contained" onClick={() => handleMarkAsDone(todo.id)}> Mark As Done</Button>
                    </li>
                ))}
            </ul>
        </>
    );
}