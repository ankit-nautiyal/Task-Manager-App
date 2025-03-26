import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice.jsx";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useState } from "react";


const Auth = () => {
    const [username, setUsername] = useState("");
    const [city, setCity] = useState("");  // Store user's city
    const [error, setError] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!city || !username){
            setError(true); // Show error if city is empty
            return;
        };  // Ensure city is provided
        
        dispatch(login({city}));
        navigate("/");
    };



    return (

            <div className="login-container">
                <h2>Login into Todo List App</h2>
                
                <TextField label="Username" onChange={(e) => setUsername(e.target.value)} required />
                <TextField label="City" onChange={(e) => setCity(e.target.value)} required error={error} />
                <Button variant="contained" onClick={handleLogin}>Login</Button>
            </div>

    );
};

export default Auth;
