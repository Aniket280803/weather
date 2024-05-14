const API_Key = 'c4860da63391db5bdc084cb3fb11758d'

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`
const getFormattedWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=${units}`;
    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data);

    const { weather,
        main: { temp, feels_like, humidity, temp_min, temp_max, pressure },
        wind: { speed }, sys: { country }, name, } = data;
    const { description, icon } = weather[0];
    return {
        description,
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        humidity,
        temp_min,
        temp_max,
        pressure,
        speed,
        country,
        name,
    };
}
export { getFormattedWeatherData };