import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Thunk to fetch weather
export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (city, {rejectWithValue}) => {
        try {
            const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch weather data");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
        
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
    reducers: {  
        clearWeatherError: (state) => {
            state.error = null;
        }
    },
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
            state.error = action.error.message; // Store the error message
        });
    }
});

export const { clearWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;
