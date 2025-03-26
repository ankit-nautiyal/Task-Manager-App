import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const API_KEY = import.meta.env.VITE_API_KEY;

// Thunk to fetch weather
export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        return data;
    }
);

const initialState= {
    data: null,  //  Set to null initially to avoid undefined errors
    status: "idle",
    error: null,
}

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchWeather.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchWeather.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
        })
        .addCase(fetchWeather.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    }
});

export default weatherSlice.reducer;
