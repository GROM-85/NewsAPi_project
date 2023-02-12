import { format } from 'date-fns';

const refs = {
  temp: document.querySelector('.weather__temp'),
  description: document.querySelector('.weather__desc'),
  city: document.querySelector('.weather__city-name'),
  icon: document.querySelector('.weather__img'),
  day: document.querySelector('.weather__day'),
  year: document.querySelector('.weather__year'),
};
const WEATHER_KEY = '349c075d2985e4b8a1687be3ae218ac3';
const BASIC_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const fetchWeather = async (lat, lon) => {
  return await fetch(
    `${BASIC_URL}lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`
  )
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {});
};

const fetchDefaultWeather = async () => {
  return await fetch(`${BASIC_URL}q=Kyiv&units=metric&appid=${WEATHER_KEY}`)
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {});
};

async function renderDefaultWeather() {
  const data = await fetchDefaultWeather();
  const { icon } = data.weather[0];
  const parametr = data.weather[0];
  const { temp } = data.main;
  refs.temp.textContent = `${Math.ceil(temp)}°`;
  refs.description.textContent = parametr.main;

  refs.city.textContent = data.name;
  refs.icon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${icon}@4x.png`
  );

  refs.day.textContent = format(new Date(), 'eee');
  refs.year.textContent = format(new Date(), 'dd LLL y');
}

async function getGeoLocation() {
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        fetchWeather(latitude, longitude).then(data => {
          const { icon } = data.weather[0];
          const parametr = data.weather[0];
          const { temp } = data.main;
          refs.temp.textContent = `${Math.ceil(temp)}°`;
          refs.description.textContent = parametr.main;

          refs.city.textContent = data.name;
          refs.icon.setAttribute(
            'src',
            `http://openweathermap.org/img/wn/${icon}@4x.png`
          );

          refs.day.textContent = format(new Date(), 'eee');
          refs.year.textContent = format(new Date(), 'dd LLL y');
        });
      }
    );
    return;
  }
}

renderDefaultWeather();

getGeoLocation();