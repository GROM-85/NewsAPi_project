import format from 'date-fns/format';
import * as key from './const';
import * as storage from './storageLogic';
const favorites = storage.loadFromLocal(key.KEY_FAVORITE);
const favoritesId = favorites.map(({ id }) => id);

export function renderMarkup({
  imgUrl,
  title,
  text,
  date,
  url,
  id,
  categorie,
}) {
  return `<li class="card__item"  id=${id}>
  <div class="thumb" style="background-image: url('${imgUrl}')">
    <span
      class="thumb__item" >${categorie}
    </span>
    <button type="button" class="favorite-btn">
       <span class="icon-span add-favorite">Add to favorite
       <svg class="icon add-favorite-icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.66658 2C2.82592 2 1.33325 3.47733 1.33325 5.3C1.33325 6.77133 1.91659 10.2633 7.65859 13.7933C7.76144 13.8559 7.87952 13.889 7.99992 13.889C8.12032 13.889 8.2384 13.8559 8.34125 13.7933C14.0833 10.2633 14.6666 6.77133 14.6666 5.3C14.6666 3.47733 13.1739 2 11.3333 2C9.49259 2 7.99992 4 7.99992 4C7.99992 4 6.50725 2 4.66658 2Z"/>
   </svg></span>
       <span class="icon-span remove-favorite">Remove from favorite <svg class="icon remove-favorite-icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
       <path d="M4.66658 2C2.82592 2 1.33325 3.47733 1.33325 5.3C1.33325 6.77133 1.91659 10.2633 7.65859 13.7933C7.76144 13.8559 7.87952 13.889 7.99992 13.889C8.12032 13.889 8.2384 13.8559 8.34125 13.7933C14.0833 10.2633 14.6666 6.77133 14.6666 5.3C14.6666 3.47733 13.1739 2 11.3333 2C9.49259 2 7.99992 4 7.99992 4C7.99992 4 6.50725 2 4.66658 2Z"/>
   </svg></span>
           </button>
      <p class="read">Already read
      <svg class="tick" width="17" height="12" viewBox="0 0 16 12" fill="" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.1885 0.594133C15.0326 0.598778 14.8847 0.663925 14.776 0.775774L5.6002 9.95155L1.82442 6.17577C1.76913 6.11819 1.70291 6.07222 1.62963 6.04054C1.55635 6.00887 1.47749 5.99214 1.39767 5.99133C1.31784 5.99052 1.23866 6.00564 1.16475 6.03581C1.09085 6.06599 1.0237 6.11061 0.967257 6.16705C0.91081 6.2235 0.866193 6.29064 0.83602 6.36455C0.805846 6.43846 0.790723 6.51764 0.791535 6.59746C0.792347 6.67729 0.809079 6.75615 0.84075 6.82943C0.872421 6.9027 0.918394 6.96892 0.975978 7.02421L5.17598 11.2242C5.2885 11.3367 5.44109 11.3999 5.6002 11.3999C5.7593 11.3999 5.91189 11.3367 6.02442 11.2242L15.6244 1.62421C15.7111 1.53993 15.7703 1.43143 15.7943 1.31292C15.8183 1.19441 15.8059 1.07141 15.7588 0.960063C15.7117 0.848712 15.632 0.754194 15.5302 0.688897C15.4285 0.623599 15.3093 0.590569 15.1885 0.594133Z" fill="#00DD73"/>
      </svg>
</p>
  </div>
  <div class="info__helper">
      <h2 class="info__title">${text}</h2>
        <div class="info__helper">
          <p class="info__text">${formatText(text)}
          </p>
          <div class=info__meta>
            <p class="info__date">${date}
            </p>
            <a class="info__link" target="_blank" href="${url}">Read more
            </a>
          </div>
        </div>
  </div>
   
</li>`;
}

export function renderWeather({ temp, icon, main, name }) {
  return `<li class="card__item card__item__weather">
    <div class="weather__container">
      <div class="weather__info">
        <span class="weather__temp">${temp}°</span>
        <div class="weather__location">
          <p class="weather__desc">${main}</p>
          <div class="weather__city">
            <svg width="19" height="25" viewBox="0 0 19 25" fill="" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.50001 0.6875C7.03936 0.690403 4.68032 1.66918 2.94038 3.40912C1.20044 5.14906 0.221663 7.5081 0.21876 9.96875C0.215813 11.9796 0.87265 13.9359 2.08851 15.5375C2.08851 15.5375 2.34163 15.8708 2.38298 15.9189L9.50001 24.3125L16.6204 15.9147C16.6575 15.8699 16.9115 15.5375 16.9115 15.5375L16.9124 15.535C18.1276 13.934 18.7841 11.9787 18.7813 9.96875C18.7784 7.5081 17.7996 5.14906 16.0596 3.40912C14.3197 1.66918 11.9607 0.690403 9.50001 0.6875ZM9.50001 13.3438C8.8325 13.3438 8.17998 13.1458 7.62496 12.775C7.06994 12.4041 6.63736 11.877 6.38192 11.2603C6.12647 10.6436 6.05963 9.96501 6.18986 9.31032C6.32008 8.65563 6.64152 8.05427 7.11352 7.58226C7.58553 7.11026 8.18689 6.78882 8.84158 6.6586C9.49627 6.52837 10.1749 6.59521 10.7916 6.85066C11.4083 7.1061 11.9354 7.53868 12.3062 8.0937C12.6771 8.64872 12.875 9.30124 12.875 9.96875C12.8739 10.8635 12.518 11.7213 11.8853 12.354C11.2526 12.9867 10.3948 13.3426 9.50001 13.3438Z" fill="white"/>
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
        >weather for week</a>
    </div>
</li>`;
}

export function renderAccordion(date) {
  return `<div class="accord__title"> 
  <div class="date__cont">
      <p class="date">${date}</p>
      <span class="accord__arrow">
          <svg class="arrow-js" width="15" height="9" viewBox="0 0 15 9" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.7625 9.53674e-07L0 1.71255L7.5 9L15 1.71255L13.2375 9.53674e-07L7.5 5.56275L1.7625 9.53674e-07Z" fill=""/>
          </svg>
        </span>
      
  </div>
  <span class="line"></span>
  `;
}

function formatText(text) {
  let result;
  // Change code below this line
  if (text.length > key.MAXLENGHT) {
    text = text.slice(0, key.MAXLENGHT);
    result = text + '...';
  } else {
    result = text;
  }
  return result;
}

export function clear(item) {
  item.innerHTML = '';
}
