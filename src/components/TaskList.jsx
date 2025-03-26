import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, markAsDone } from "../features/taskSlice.jsx";
import { setPriority } from "../features/taskSlice.jsx";
import TaskInput from "./TaskInput.jsx";
import { logout } from "../features/authSlice.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo.jsx";
import { fetchWeather } from "../features/weatherSlice.jsx";

const outdoorKeywords = ["swim", "walk", "run", "office", "school", "market", "meet", "go", "drive", "gym", "attend"];

    
export default function TaskList(){
    console.log("TaskList component rendered!");
    const todos= useSelector((state) => state.todo.todos);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const city = useSelector((state) => state.auth.city);  // Get user city from Redux store
    const weather = useSelector((state) => state.weather?.data);  // to handle undefined case also
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const [outdoorTaskDetected, setOutdoorTaskDetected] = useState(false);

    useEffect(() => {
        console.log("TaskList component mounted!");
    }, []);
    
    // To ennsure Redux store is in sync with localStorage when the app starts
    useEffect(() => {
        if (todos.length === 0) {
            const savedTodos = localStorage.getItem("todos");
            if (savedTodos) {
                JSON.parse(savedTodos).forEach(todo => dispatch(addTodo(todo.task)));
            }
        }
    }, []);  // Runs only once on first render

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));

         // Save authentication status to localStorage
        localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }, [todos, isAuthenticated]);

    
    //  Check if there's any outdoor task & fetch weather
    useEffect(() => {
        console.log("Checking for outdoor tasks...");
        if (!city) {
            console.log("City is missing! Weather fetch skipped.");
            return;
        };  

        const hasOutdoorTask = todos.some(todo =>
            outdoorKeywords.some(keyword => todo.task.toLowerCase().includes(keyword))
        );

        console.log("Has Outdoor Task:", hasOutdoorTask);

        if (hasOutdoorTask && city) {
            console.log(`Fetching weather for city: ${city}`); // Debugging log
            dispatch(fetchWeather(city));
            setOutdoorTaskDetected(true);
        } else {
            setOutdoorTaskDetected(false);
        }
    }, [todos, city]);

    useEffect(() => {
        console.log("Current Weather State:", weather);
    }, [weather]);

    useEffect(() => {
        console.log("City from Redux:", city);
    }, [city]);
    


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

    const handlePriorityChange = (id, priority) => {
        dispatch(setPriority({ id, priority }));
    };

    //  Sorting tasks based on priority
    const sortedTodos = [...todos].sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    });
    

    return(
        <>  
            <Button variant="contained" onClick={handleLogout}> Logout</Button>

            <h2>Todo List App</h2>
            <TaskInput/>

            {outdoorTaskDetected && weather && <WeatherInfo weather={weather} />}

            <ul>
                {sortedTodos.map((todo) => (
                    <li key={todo.id}>
                        <span style={todo.isDone ? {textDecoration: "line-through"} : {}}> {todo.task} </span> 
                        <Button variant="contained" onClick={() => handleDelete(todo.id)}> Delete</Button>
                        <Button variant="contained" onClick={() => handleMarkAsDone(todo.id)}> Mark As Done</Button>

                        {/* Priority Selection Buttons */}
                        <Button 
                            variant="contained" 
                            style={{ color:" black", backgroundColor: todo.priority === "High" ? "red" : "white" }}
                            onClick={() => handlePriorityChange(todo.id, "High")}
                        >
                            High
                        </Button>

                        <Button 
                            variant="contained" 
                            style={{ color:" black", backgroundColor: todo.priority === "Medium" ? "orange" : "white" }}
                            onClick={() => handlePriorityChange(todo.id, "Medium")}
                        >
                            Medium
                        </Button>

                        <Button 
                            variant="contained" 
                            style={{ color:" black", backgroundColor: todo.priority === "Low" ? "green" : "white" }}
                            onClick={() => handlePriorityChange(todo.id, "Low")}
                        >
                            Low
                        </Button>
                    </li>
                ))}
            </ul>
        </>
    );
}