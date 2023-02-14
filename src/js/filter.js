import { NewsAPI } from './API/fetchAPI';
import { refs } from './refs';
import { renderMarkup, clear, renderWeather } from './renderMarkup';
import * as key from './const';
import * as storage from './storageLogic';
import * as newsCard from './newsCard';
import format from 'date-fns/format';
import { selectedDate } from './calendar';
import { addToFavorite } from './addToFavorites/addToFavorites';
import { onloadToRead } from './addToRead/addToRead';
import { clearNavCurrent } from './navLogic/navLogic';

const newsFetch = new NewsAPI();

refs.filter.addEventListener(`submit`, filterQuery);

async function filterQuery(e) {
  e.preventDefault();
  newsFetch.resetPage();
  //повертає значення з імпуту
  const form = e.currentTarget.elements.searchArt.value;
  // не здійснює пошук, якщо нічого не введено
  if (!form) {
    return;
  }
  newsFetch.query = form;
  const { docs, meta } = await newsFetch.getNewsByQuery();
  //якщо не знайдено даних по запиту, вертає NOT A FOUND
  if (docs.length === 0) {
    console.log('NOT A FOUND');
  }

  let collectionByQuery = [];
  console.log('docsQuery', docs);
  collectionByQuery = docs.map(result => {
    const {
      abstract,
      pub_date,
      uri,
      web_url,
      multimedia,
      section_name,
      headline,
    } = result;
    console.log('result', result);
    let imgUrl;
    if (multimedia.length !== 0) {
      imgUrl = 'https://www.nytimes.com/' + multimedia[2]['url'];
      console.log(imgUrl);
    } else {
      imgUrl =
        'https://static01.nyt.com/images/2022/10/30/nyregion/30sandy-anniversary-intro/merlin_192440457_cbe91abf-e7f4-467f-b83d-4e7815ef45b7-articleLarge.jpg?quality=75&auto=webp&disable=upscale';
    }

    const newDateFormat = corectDate(pub_date);
    console.log('newDateFormat', newDateFormat);

    let obj = {
      imgUrl,
      title: headline.main,
      text: abstract,
      date: newDateFormat,
      url: web_url,
      categorie: section_name,
      id: uri,
    };
    return obj;
  });

  clear(refs.gallery);
  clear(refs.accordion);
  clearNavCurrent(refs.nav.children);
  refs.HomeBtn.parentNode.classList.add("current-list__item");
  storage.saveToLocal(key.KEY_COLLECTION, collectionByQuery.slice(0, 9));

  categoriesOnPageLoadGallery();
}

// function categoriesOnResizeGallery() {
//   window.addEventListener('resize', e => {
//     let collection = storage.loadFromLocal(key.KEY_COLLECTION);
//     if (e.currentTarget.innerWidth <= 768) {
//       collection = collection.slice(0, 3);
//     } else if (e.currentTarget.innerWidth <= 1280) {
//       collection = collection.slice(0, 7);
//     } else {
//       collection = collection.slice(0, 8);
//     }
//     clear(refs.gallery);
//     let collectionByPopular = collection.map(renderMarkup).join(``);
//     renderGallery(collectionByPopular);
//     onloadToRead();
//     // weatherRender();
//   });
// }

function categoriesOnPageLoadGallery() {
  let collection = storage.loadFromLocal(key.KEY_COLLECTION);
  let collectionByPopular;
  if (window.matchMedia('(max-width: 768px)').matches) {
    collection = collection.slice(0, 3);
    //   collectionByPopular = collection.map(renderMarkup).join(``);
    //   renderGallery(collectionByPopular);
  } else if (window.matchMedia('(max-width: 1280px)').matches) {
    collection = collection.slice(0, 7);
  } else {
    collection = collection.slice(0, 8);
  }
  collectionByPopular = collection.map(renderMarkup).join(``);
  renderGallery(collectionByPopular);
  onloadToRead();
  //   weather.renderDefaultWeather();
}
function renderGallery(markup) {
  refs.gallery.insertAdjacentHTML(`beforeend`, markup);
  refs.gallery.addEventListener('click', addToFavorite);
}
//*******renderedWether******************* */
function weatherRender() {
  let replacedItem;
  if (window.matchMedia('(min-width: 1279.98px)').matches) {
    replacedItem = refs.gallery.childNodes[1];
    console.log(replacedItem);
    const markup = renderWeather();
    replacedItem.insertAdjacentHTML(`afterend`, markup);
  } else if (window.matchMedia('(min-width: 767.98px)').matches) {
    replacedItem = refs.gallery.firstElementChild;
    const markup = renderWeather();
    replacedItem.insertAdjacentHTML(`afterend`, markup);
  } else {
    replacedItem = refs.gallery.firstElementChild;
    const markup = renderWeather();
    replacedItem.insertAdjacentHTML(`beforebegin`, markup);
  }
}
function corectDate(date) {
  let newDateFormat = date.split('-');
  let maxElement = { index: length };

  newDateFormat.forEach((el, index) => {
    maxElement.index = index;
    maxElement.length = length;
    console.log(el.length, index);
  });
  newDateFormat[maxElement.index] = newDateFormat[maxElement.index].slice(0, 2);
  newDateFormat = newDateFormat.slice(0, 3);
  newDateFormat = newDateFormat.join('/');

  return newDateFormat;
}
//************************ *//
