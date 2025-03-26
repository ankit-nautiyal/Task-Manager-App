import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, markAsDone } from "../features/taskSlice.jsx";
import TaskInput from "./TaskInput.jsx";
import { logout } from "../features/authSlice.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function TaskList(){
    const todos= useSelector((state) => state.todo.todos);
    const navigate= useNavigate();
    const dispatch= useDispatch();

    // To ennsure Redux store is in sync with localStorage when the app starts
    useEffect(() => {
        if (todos.length === 0) {
            const savedTodos = localStorage.getItem("todos");
            if (savedTodos) {
                JSON.parse(savedTodos).forEach(todo => dispatch(addTodo(todo.task)));
            }
        }
    }, []);  // Runs only once on first render


    const handleDelete= (id)=>{
        dispatch(deleteTodo(id));
    }

    const handleMarkAsDone= (id)=>{
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