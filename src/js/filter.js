import { NewsAPI } from './API/fetchAPI';
import { refs } from './refs';
import { renderMarkup, clear, renderWeather } from './renderMarkup';
import { corectDate } from './newsCard';
import * as weather from './weather';
import * as key from './const';
import * as storage from './storageLogic';

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
    if (refs.notFoundEl.classList.contains('hidden')) {
      refs.notFoundEl.classList.remove('hidden');
    }
    clear(refs.gallery);
  } else {
    if (!refs.notFoundEl.classList.contains('hidden')) {
      refs.notFoundEl.classList.add('hidden');
    }

    let collectionByQuery = [];

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

      if (multimedia.length !== 0) {
        imgUrl = 'https://www.nytimes.com/' + multimedia[2]['url'];
      } else {
        imgUrl = 'https://media4.giphy.com/media/h52OM8Rr5fLiZRqUBD/giphy.gif';
      }

      const newDateFormat = corectDate(pub_date);
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

    storage.saveToLocal(key.KEY_COLLECTION, collectionByQuery.slice(0, 9));

    categoriesOnPageLoadGallery();
  }
}
function categoriesOnResizeGallery() {
  window.addEventListener('resize', e => {
    let collection = storage.loadFromLocal(key.KEY_COLLECTION);
    if (e.currentTarget.innerWidth <= 768) {
      collection = collection.slice(0, 3);
    } else if (e.currentTarget.innerWidth <= 1280) {
      collection = collection.slice(0, 7);
    } else {
      collection = collection.slice(0, 8);
    }
    clear(refs.gallery);
    let collectionByPopular = collection.map(renderMarkup).join(``);

    renderGallery(collectionByPopular);
  });
}
function categoriesOnPageLoadGallery() {
  let collection = storage.loadFromLocal(key.KEY_COLLECTION);
  let collectionByPopular;
  if (window.matchMedia('(max-width: 768px)').matches) {
    collection = collection.slice(0, 4);
    //   collectionByPopular = collection.map(renderMarkup).join(``);
    //   renderGallery(collectionByPopular);
  } else if (window.matchMedia('(max-width: 1280px)').matches) {
    collection = collection.slice(0, 8);
  } else {
    collection = collection.slice(0, 9);
  }
  collectionByPopular = collection.map(renderMarkup).join(``);
  renderGallery(collectionByPopular);
}
function renderGallery(markup) {
  refs.gallery.insertAdjacentHTML(`beforeend`, markup);
}
