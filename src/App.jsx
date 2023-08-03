import { useState, useEffect } from "react";
import axios from "axios";
function App() {
	const [location, setLocation] = useState("");
	const [data, setData] = useState({});
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c7a7978476b6c2952e9226901aff4450&units=metric`;
	const getWeather = async (event) => {
		if (event.key === "Enter") {
			setLocation(event.target.value);
			const response = await axios.get(url);
			setData(response.data);
			setLocation("");
			console.log(data);
		}
	};
	const today = new Date();
	const date =
		today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
	return (
		<div className="app">
			<div className="container">
				<div className="top">
					<input
						value={location}
						onChange={(event) => setLocation(event.target.value)}
						onKeyDown={getWeather}
						placeholder="Enter location"
						className="input"
						type="text"
					/>
					{data.main && <p className="location">{data.name}</p>}

					<p className="date">{date}</p>
					{data.main && <p className="temp">{data.main.temp}C</p>}
					{data.weather && (
						<p className="desc">{data.weather[0].description}</p>
					)}
				</div>

				<div className="bottom">
					{data.main && (
						<div className="feels">Real Feel:{data.main.feels_like}C</div>
					)}
					{data.wind && (
						<div className="wind">Wind Speed:{data.wind.speed * 3.6}km/h</div>
					)}
					{data.main && (
						<div className="humidity">Humidity:{data.main.humidity}%</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
