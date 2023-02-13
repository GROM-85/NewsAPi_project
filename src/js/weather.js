import { format } from 'date-fns';
import getRefs from './refs';
import { renderWeather } from './renderMarkup';

const refs = getRefs();
let weatherMarkup;
// const refs = {
//   temp: document.querySelector('.weather__temp'),
//   description: document.querySelector('.weather__desc'),
//   city: document.querySelector('.weather__city-name'),
//   icon: document.querySelector('.weather__img'),
//   day: document.querySelector('.weather__day'),
//   year: document.querySelector('.weather__year'),
// };
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
      ({ coords: { latitude, longitude } }).then(({ weather, main, name }) => {
        let item = {
          icon: weather[0].icon,
          main: weather[0].main,
          temp: Math.ceil(main.temp),
          name,
        }
        weatherRender(item);
        console.log(weatherRender(item))
      }));
    
    return;
  }
}

//  export async function getGeoLocation() {
//    if (navigator.geolocation) {
//      await navigator.geolocation.getCurrentPosition(
//        ({ coords: { latitude, longitude } }) => {
//          fetchWeather(latitude, longitude).then(data => {
//            const { icon } = data.weather[0];
//            const parametr = data.weather[0];
//            const { temp } = data.main;
//            refs.temp.textContent = `${Math.ceil(temp)}°`;
//            refs.description.textContent = parametr.main;
//            refs.city.textContent = data.name;
//            refs.icon.setAttribute(
//              'src',
//              `http://openweathermap.org/img/wn/${icon}@4x.png`
//            );
//            refs.day.textContent = format(new Date(), 'eee');
//            refs.year.textContent = format(new Date(), 'dd LLL y');
//          });
//        }
//      );
//      return;
//    }
//  }
/*******renderedWeather******************* */
export function weatherRender(item) {
 const markup = renderWeather(item);
  if (window.matchMedia('(min-width: 1279.98px)').matches) {
    replacedItem = refs.gallery.childNodes[2];  
    console.log(replacedItem)
   
    replacedItem.insertAdjacentHTML(`afterend`, markup);
  } else if (window.matchMedia('(min-width: 767.98px)').matches) {
    replacedItem = refs.gallery.firstElementChild;
    
    replacedItem.insertAdjacentHTML(`afterend`, markup);
  } else {
    replacedItem = refs.gallery.firstElementChild;
 
    replacedItem.insertAdjacentHTML(`beforebegin`, markup);
  }
}



// getGeoLocation();
