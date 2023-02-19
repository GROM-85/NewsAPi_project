import { refs } from './refs';
import { renderWeather, clear } from './renderMarkup';

const WEATHER_KEY = '349c075d2985e4b8a1687be3ae218ac3';
const BASIC_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const fetchWeather = async (lat, lon) => {
  const response =  await fetch(
    `${BASIC_URL}lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}` )
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
};

const fetchDefaultWeather = async () => {
  const response = await fetch(`${BASIC_URL}q=Toronto&units=metric&appid=${WEATHER_KEY}`);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    
};

export async function renderDefaultWeather() {

  try {
    const data = await fetchDefaultWeather();
    const { weather, main, name } = data;

    let item = {
      icon: weather[0].icon,
      main: weather[0].main,
      temp: Math.ceil(main.temp),
      name,
    };
    return renderWeather(item);

  } catch (error) {
    console.log(error.message)
  }
}

export async function getGeoLocation() {
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        fetchWeather(latitude, longitude).then(({ weather, main, name }) => {
          let item = {
            icon: weather[0].icon,
            main: weather[0].main,
            temp: Math.ceil(main.temp),
            name,
          };
          weatherRender(item);
        });
      }
    );
  }
}

