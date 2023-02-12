import { NewsAPI } from './API/fetchAPI';
import getRefs from './refs';
import { renderMarkup, clear,renderWether } from './renderMarkup';
import * as storage from './storageLogic';
import * as key from './const';
import * as newsCard from './newsCard'; 

const newsFetch = new NewsAPI();
const REFS = getRefs();


const arrCategories = JSON.parse(localStorage.getItem('results'));
const refs = {
  categoriesBtnMenu: document.querySelector('.categories__btn-menu'),
  categoriesBox: document.querySelector('.categories'),
  categoriesList: document.querySelector('.categories__list'),
  categoriesMenu: document.querySelector('.categories__menu'),
  categoriesIconUp: document.querySelector('.categories__icon-up'),
  categoriesIconDown: document.querySelector('.categories__icon-down'),
  categoriesBtnList: document.querySelector('.categories__btn-list'),
};

saveCategories();
categoriesOnResize();
categoriesOnPageLoad();
refs.categoriesBtnMenu.addEventListener('click', showCategoriesList);

function saveCategories() {
  newsFetch.getCategories().then(results => {
    localStorage.setItem('results', JSON.stringify(results));
  });
}

function categoriesOnResize() {
  window.addEventListener('resize', e => {
    if (e.currentTarget.innerWidth >= 1279.98) {
      clearCategories();
      markupDesktop();
    } else if (e.currentTarget.innerWidth >= 767.98) {
      clearCategories();
      markupTablet();
    } else {
      clearCategories();
      markupMobile();
    }
  });
}

function categoriesOnPageLoad() {
  if (window.matchMedia('(min-width: 1279.98px)').matches) {
    clearCategories();
    markupDesktop();
  } else if (window.matchMedia('(min-width: 767.98px)').matches) {
    clearCategories();
    markupTablet();
  } else {
    clearCategories();
    markupMobile();
  }
}

function clearCategories() {
  refs.categoriesBtnList.innerHTML = '';
  refs.categoriesList.innerHTML = '';
}

function markupTablet() {
  refs.categoriesBtnList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInBtn(arrCategories, 0, 4)
  );
  refs.categoriesList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInList(arrCategories, 4)
  );
}

function markupDesktop() {
  refs.categoriesBtnList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInBtn(arrCategories, 0, 6)
  );
  refs.categoriesList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInList(arrCategories, 6)
  );
}

function markupMobile() {
  refs.categoriesList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInList(arrCategories)
  );
  refs.categoriesBtnMenu.textContent = 'Categories';
  // refs.categoriesBtnMenu.insertAdjacentHTML(
  //   'beforeend',
  //   '<svg class="categories__icon-up invisible" width="14" height="14"><use href="./images/icons.svg#arrowDown"></use></svg>'
  // );
}

function markupCategoriesInBtn(arrCategories, begin, end) {
  return arrCategories
    .slice(begin, end)
    .map(
      result =>
        `<li> <button class="categories__btn" data-value="${result.section}">${result.display_name}
    </button> </li>`
    )
    .join(' ');
}

function markupCategoriesInList(arrCategories, begin, end) {
  return arrCategories
    .slice(begin, end)
    .map(result => `<li class="categories__item" data-value="${result.section}">${result.display_name}</li>`)
    .join(' ');
}

function showCategoriesList() {
  refs.categoriesIconUp.classList.toggle("invisible");
  refs.categoriesIconDown.classList.toggle("invisible");
  refs.categoriesMenu.classList.toggle("invisible");
}


//*****filter categories Btn*****************/
refs.categoriesBox.addEventListener(`click`, onCategoriesBtnClick);
 async function onCategoriesBtnClick(e) {
  e.preventDefault();
  // if (e.target.nodeName !== 'BUTTON') {
  //   return;
  //  }
   newsFetch.resetOffset();
   
   newsFetch.category = e.target.dataset.value
   const docs = await newsFetch.getNewsByCategories();

   
 
     let collectionByCategorie = [];
   collectionByCategorie = docs.results.map(result => {
     const {abstract,published_date,uri,url,multimedia,section,title} = result;
    console.log('result',result)
    
     if (multimedia) {
      
       imgUrl = multimedia[2]['url'];
       
       console.log(imgUrl)
     } else {
      imgUrl =
        'https://www.shutterstock.com/image-photo/canadian-national-flag-overlay-false-260nw-1720481365.jpg';
  }

    const newDateFormat= corectDateInCategories(published_date);

     let obj = {
     imgUrl,
      title,
       text: abstract,
       date: newDateFormat,
     url,
      categorie: section,
       id: uri,
    };
     return obj;
   });

   clear(REFS.gallery)
 
 
 storage.saveToLocal(key.KEY_COLLECTION, collectionByCategorie.slice(0, 9));
  
    categoriesOnPageLoadGallery();
   categoriesOnResizeGallery();
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
        collectionByPopular = collection.map(renderMarkup).join(``);
           renderGallery(collectionByPopular);
      
             wetherRender(); 
     });
    }
  function categoriesOnPageLoadGallery() {
     let collection = storage.loadFromLocal(key.KEY_COLLECTION);
     let collectionByPopular;
     if (window.matchMedia('(max-width: 768px)').matches) {
         collection = collection.slice(0, 3);
      //   collectionByPopular = collection.map(renderMarkup).join(``);
       //   renderGallery(collectionByPopular);         
    }  else if (window.matchMedia('(max-width: 1280px)').matches) {
       collection = collection.slice(0, 7);
     } else {
         collection = collection.slice(0, 8);
     }
     collectionByPopular = collection.map(renderMarkup).join(``);
      renderGallery(collectionByPopular);
       wetherRender();  
   }

function renderGallery(markup) {
  REFS.gallery.insertAdjacentHTML(`beforeend`, markup);
}
//*******renderedWether******************* */
function wetherRender() {
   
    if (window.matchMedia('(min-width: 1279.98px)').matches) { 
        replacedItem = REFS.gallery.childNodes[1]; 
        console.log(replacedItem)
        const markup = renderWether(); 
        replacedItem.insertAdjacentHTML(`afterend`, markup);
        
    } else if(window.matchMedia('(min-width: 767.98px)').matches){
        replacedItem = REFs.gallery.firstElementChild;
        const markup = renderWether(); 
                replacedItem.insertAdjacentHTML(`afterend`, markup);
    } else {
        replacedItem =REFS.gallery.firstElementChild; 
        const markup = renderWether(); 
        replacedItem.insertAdjacentHTML(`beforebegin`, markup);
    }
      
}

function corectDateInCategories(date) {
   let newDateFormat = date.split('-');
   
     if (newDateFormat.length > 3) {
       newDateFormat[2] = newDateFormat[2].slice(0, 2)
       newDateFormat = newDateFormat.slice(0, 3);
         
    newDateFormat = newDateFormat.join('/');
     }
  return newDateFormat;
}