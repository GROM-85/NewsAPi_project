import { refs } from './refs';
import { renderWeather, clear } from './renderMarkup';

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

export async function renderDefaultWeather() {
  const data = await fetchDefaultWeather();
  const { weather, main, name } = data;

  let item = {
    icon: weather[0].icon,
    main: weather[0].main,
    temp: Math.ceil(main.temp),
    name,
  };
  weatherRender(item);
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

/*******renderedWeather******************* */
export function weatherRender(item) {
  const markup = renderWeather(item);
  if (window.innerWidth >= 1280) {
    clear(markup);
    replacedItem = refs.gallery.childNodes[2];
    replacedItem.insertAdjacentHTML(`afterend`, markup);
  } else if (window.innerWidth >= 767.98 && window.innerWidth <= 1279.98) {
    replacedItem = refs.gallery.firstElementChild;
    replacedItem.insertAdjacentHTML(`afterend`, markup);
  } else {
    replacedItem = refs.gallery.firstElementChild;
    replacedItem.insertAdjacentHTML(`beforebegin`, markup);
  }
}
