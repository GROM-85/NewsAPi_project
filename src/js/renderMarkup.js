import format from "date-fns/format";

export function renderMarkup({ imgUrl, title, text, date, url, id, categorie }) {
    return `<li class="card__item"  id=${id}>
            <div class="thumb" style="background-image: url('${imgUrl}')">
              <span 
                class="thumb__item" >${categorie}
              </span>
                <button type="button" 
                        data-action="favorite-btn" 
                        class="favorite-btn">
                              Add to favorite
                  <svg class="favorite-icon" width="16" height="16">
                      <use href="/icons.adfc4680.svg#heart_empty"/>
                  </svg>
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
