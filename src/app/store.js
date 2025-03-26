import { configureStore } from '@reduxjs/toolkit';
import todoReducer from "../features/taskSlice.jsx";
import authReducer from "../features/authSlice.jsx";

export const store= configureStore({
    reducer: {
        todo: todoReducer,
        auth: authReducer 
    }
});