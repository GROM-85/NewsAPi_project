import format from "date-fns/format";
import * as key from './const';
import * as storage from './storageLogic';

const favorites = storage.loadFromLocal(key.KEY_FAVORITE);
export function renderMarkup({ imgUrl, title, text, date, url, id, categorie }) {
    return `<li class="card__item"  id=${id}>
            <div class="thumb" style="background-image: url('${imgUrl}')">
              <span
                class="thumb__item" >${categorie}
              </span>
              <button type="button" class="favorite-btn ${
                favorites.includes(id) ? 'hidden-span' : ''
              }">
                 <span class="icon-span add-favorite">Add to favorite
                 <svg class="icon add-favorite-icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.66658 2C2.82592 2 1.33325 3.47733 1.33325 5.3C1.33325 6.77133 1.91659 10.2633 7.65859 13.7933C7.76144 13.8559 7.87952 13.889 7.99992 13.889C8.12032 13.889 8.2384 13.8559 8.34125 13.7933C14.0833 10.2633 14.6666 6.77133 14.6666 5.3C14.6666 3.47733 13.1739 2 11.3333 2C9.49259 2 7.99992 4 7.99992 4C7.99992 4 6.50725 2 4.66658 2Z"/>
             </svg></span>
                 <span class="icon-span remove-favorite">Remove from favorite <svg class="icon remove-favorite-icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                 <path d="M4.66658 2C2.82592 2 1.33325 3.47733 1.33325 5.3C1.33325 6.77133 1.91659 10.2633 7.65859 13.7933C7.76144 13.8559 7.87952 13.889 7.99992 13.889C8.12032 13.889 8.2384 13.8559 8.34125 13.7933C14.0833 10.2633 14.6666 6.77133 14.6666 5.3C14.6666 3.47733 13.1739 2 11.3333 2C9.49259 2 7.99992 4 7.99992 4C7.99992 4 6.50725 2 4.66658 2Z"/>
             </svg></span>
                     </button>
            </div>
            <div class="info__helper">
                <h2 class="info__title">${text}</h2>
                  <div class="info__helper">
                    <p class="info__text">${formatText(text)}
                    </p>
                    <div class=info__meta>
                      <p class="info__date">${date}
                      </p>
                      <a class="info__link" href="${url}">Read more
                      </a>
                    </div>
                  </div>
            </div>
  </li>`
}

export function renderWeather({temp, icon, main, name }) {
  return `<li class="card__item card__item__weather">
    <div class="weather__container">
      <div class="weather__info">
        <span class="weather__temp">${temp}°</span>
        <div class="weather__location">
          <p class="weather__desc">${main}</p>
          <div class="weather__city">
            <svg class="weather__location-svg" width="18" height="18">
              <use href="./images/icons.svg#location"></use>
            </svg>
            <span class="weather__city-name">${name}</span>
          </div>
        </div>
      </div>
      <img
        src="http://openweathermap.org/img/wn/${icon}@4x.png"
        alt="Weather Icon"
        class="weather__img"
      />
      <div class="weather__date">
        <p class="weather__day">${format(new Date(), 'eee')}</p>
        <p class="weather__year">${format(new Date(), 'dd LLL y')}</p>
      </div>
      <a
        href="https://www.accuweather.com/"
        class="weather__link"
        target="_blank"

        rel="noreferrer noopener"
        >Weather for week</a>
    </div>
</li>`
}



function formatText(text) {
  const maxLength = 110;
  let result;
  // Change code below this line

  if(text.length > maxLength){
   text= text.slice(0, maxLength);
    result= text + `...`;
  }else{
    result=text;
  }
  return result;
}

export function clear(item) {
  item.innerHTML = ``;
}

