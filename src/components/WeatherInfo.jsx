import React from "react";

export default function WeatherInfo({ weather }) {

    console.log("Weather Data in WeatherInfo.jsx:", weather); // Debugging log

    if (!weather || !weather.main || !weather.weather) {
        return <p>Loading weather...</p>; // Handle case where weather data is not ready
    }

    return (
        <div style={styles.container}>
            <h3>🌤️ Outdoor Task Alert - Weather in Your City</h3>
            <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
            <p><strong>Feels Like:</strong> {weather.main.feels_like}°C</p>
            <p><strong>Condition:</strong> {weather.weather[0].description}</p>
        
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: "#f1f1f1",
        padding: "10px",
        borderRadius: "8px",
        marginTop: "10px",
        textAlign: "center",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
    }
};
