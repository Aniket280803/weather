import { useEffect, useState } from "react";
import hotBg from "./assets/hot.jpg"
import normalBg from "./assets/spring.jpg"
import coldBg from "./assets/winter.jpg"
import Description from "./components/Description";
import  {getFormattedWeatherData}  from "./weatherService";
function App() {
  const [city, setCity] = useState("Paris");
  const [bg, setBg] = useState(normalBg);
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric')
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      //dynamic bg
      if (((units === 'metric') && (data.temp <= 20)) || ((units === 'imperial') && (data.temp <= 60))) setBg(coldBg);
      else if (((units === 'metric') && (data.temp <= 27)) || ((units === 'imperial') && (data.temp <= 67))) setBg(normalBg)
      else setBg(hotBg);
    };
    fetchWeatherData();
  }, [units, city]);


  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur()
    }
  }
  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {
          weather && (<div className="container">
            <div className="section section__input">
              <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter city name" />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">{`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`} </div>
            </div>
            {/* {bottom description} */}
            <Description weather={weather} units={units} />
          </div>)
        }
      </div>
    </div>


  );
}

export default App;
