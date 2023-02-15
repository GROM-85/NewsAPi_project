import {KEY_CURRENT_PAGE} from "../const";
import { refs } from '../refs';
import * as storage from '../storageLogic';
import * as render from '../renderMarkup';

// import in index.js


refs.nav.addEventListener("click",(e) => {
    let curr = e.target.parentNode;
    let list = e.currentTarget.children;
    let currPage = e.target.textContent
    clearNavCurrent(list);
    curr.classList.add("current-list__item");
    console.log(KEY_CURRENT_PAGE); // undefined
    storage.saveToLocal("currentPage", currPage);
    toHideCategories(currPage);
})

export function clearNavCurrent(list){
    Array.from(list).forEach(elem => {
        if(elem.classList.contains("current-list__item")) elem.classList.remove("current-list__item");
    })
}


function toHideCategories(currentPage) {
    const navArray = ['Favorite', 'Read'];
  if (navArray.includes(currentPage)) {
    refs.categoriesContainer.classList.add('hidden-categories');
  } else {
    refs.categoriesContainer.classList.remove('hidden-categories');
  }
}

// NAV LOGIC

 refs.navMobile.addEventListener("click",(e)=>{
    let currPage = e.target.dataset.value;

    if(e.target.nodeName === "SPAN" ) {
    let list = e.target.parentNode.parentNode.children;
    Array.from(list).forEach(elem => {
        if(elem.classList.contains("menu-current__item")) elem.classList.remove("menu-current__item");
    })
    e.target.parentNode.classList.add("menu-current__item")
    storage.saveToLocal("currentPage", currPage);
    toHideCategories(currPage);
    refs.mobileMenu.classList.remove('is-open');
    } 
 
 })


