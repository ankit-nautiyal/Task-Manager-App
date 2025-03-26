import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        dispatch(login());
        navigate("/");
    };



    return (
        <>
            <h2>Login into the Todo List App</h2>
            <Button variant="contained" onClick={handleLogin}> Login</Button>

            


        </>
    );
};

export default Auth;
