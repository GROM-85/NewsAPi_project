import { renderMarkup, clear, renderWether } from './renderMarkup';
import { categoriesOnPageLoad } from './newsCard';
import * as key from './const';
import * as storage from './storageLogic';
import * as newsCard from './newsCard';
import format from 'date-fns/format';
import { ApiService } from './API/fetchAPI';
import { refs } from './refs';

const pg = document.getElementById('pagination');
const pgChild = pg.children;
const btnPg = document.querySelector('.pg-link');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');
let pgLastPage; 

let arrPopular;

pgBtn();
savePopular();
btnPgOnResize();
btnPgOnPageLoad();
pg.addEventListener('click', renderPopular);
pg.addEventListener('click', activBtnPg);
btnNextPg.addEventListener('click', onNextPage);
btnPrevPg.addEventListener('click', onPrevPage);

function savePopular() {
  ApiService.getPopularNews().then(results => {
    localStorage.setItem('popular', JSON.stringify(results));
  });
}

function pgBtn() {
  if (ApiService.currentPage === 1) {
    btnPrevPg.disabled = true;
    btnNextPg.disabled = false;
    return;
  }

  if (ApiService.isTheLastPage()) {
    btnPrevPg.disabled = false;
    btnNextPg.disabled = true;
    return;
  }

  btnPrevPg.disabled = false;
  btnNextPg.disabled = false;
}

function activBtnPg(e) {
  const pgChild = [...document.querySelectorAll('.pg-link')];
  pgChild.forEach(elem => {
    if (elem.classList.contains('active')) {
      elem.classList.remove('active');
    }
    e.target.classList.add('active');
  });
}

function pgOnPageLoad(arrPopular) {
  let collectionByPopular;
  if (window.matchMedia('(max-width: 768px)').matches) {
    arrPopular = arrPopular.slice(0, 4);
  } else if (window.matchMedia('(max-width: 1280px)').matches) {
    arrPopular = arrPopular.slice(0, 8);
  } else {
    arrPopular = arrPopular.slice(0, 9);
  }

  arrPopular = arrPopular.map(result => {
    const { uri, section, title, abstract, published_date, url, media } =
      result;
    let newDateFormat = published_date.split('-');
    newDateFormat = newDateFormat.join('/');
    let imgUrl;
    if (result.media[0] !== undefined) {
      imgUrl = result.media[0]['media-metadata'][2]['url'];
    } else {
      imgUrl = 'https://media4.giphy.com/media/h52OM8Rr5fLiZRqUBD/giphy.gif';
    }
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

  collectionByPopular = arrPopular.map(renderMarkup).join('');

  newsCard.renderGallery(collectionByPopular);
}

function renderPopular(e) {
  e.preventDefault();
  arrPopular = JSON.parse(localStorage.getItem('popular'));
  let newCollectionOfPopular;

  pg.addEventListener('click', setCurPage);
  if (ApiService.currentPage === 1) {
    newCollectionOfPopular = arrPopular.slice(0, 8);
  }
  if (ApiService.currentPage === 2) {
    newCollectionOfPopular = arrPopular.slice(8, 16);
  }
  if (ApiService.currentPage === 3) {
    newCollectionOfPopular = arrPopular.slice(16);
  }
  clear(refs.gallery);
  pgOnPageLoad(newCollectionOfPopular);
  return;
}

function onNextPage(e) {
  e.preventDefault();
  if (ApiService.currentPage === 1) {
  pgLastPage=ApiService.lastPage()
}
  if (ApiService.currentPage >= ApiService.lastPage()) { 
    pgBtn();
    return;
  }

  ApiService.currentPage += 1;

  pgBtn();
  btnPgOnPageLoad();

  if (!!ApiService.lastAction) {
    ApiService.lastAction.action(ApiService.lastAction.arg).then();
  }
}

function onPrevPage(e) {
  e.preventDefault();

  if (ApiService.currentPage <= 1) {
    return;
  }

  ApiService.currentPage -= 1;

  pgBtn();
  btnPgOnPageLoad();

  if (!!ApiService.lastAction) {
    ApiService.lastAction.action(ApiService.lastAction.arg).then();
  }
}

function btnPgOnResize() {
  window.addEventListener('resize', e => {
    if (e.currentTarget.innerWidth >= 767.98) {
      clearPgContainer();
      renderPgBtn();
    } else {
      clearPgContainer();
      renderPgBtnMobile();
    }
  });
}

function btnPgOnPageLoad() {
  //  const markup = {
  //   numOfPageFirst: ` <li class="pg-item" data-page="">
  //       <a class="pg-link" href="#">1</a>
  //   </li>`,
  //   numOfPageLast: `<li class="pg-item" data-page="">
  //       <a class="pg-link" href="#">${ApiService.lastPage()}</a>
  //   </li>`,
  //   numOfPageStart: `<li class="pg-item" data-page="">
  //       <a class="pg-link" href="#">1</a>
  //   </li><li class="pg-item" data-page="">
  //       <a class="pg-link" href="#">2</a>
  //   </li><li class="pg-item" data-page="">
  //       <a class="pg-link" href="#">3</a>
  //   </li>`,
  //   numOfPageEnd: `<li class="pg-item" data-page="">
  //       <a class="pg-link" href="#">${ApiService.lastPage() - 2}</a>
  //   </li><li class="pg-item" data-page="">
  //       <a class="pg-link" href="#">${ApiService.lastPage() - 1}</a>
  //   </li><li class="pg-item" data-page="">
  //       <a class="pg-link" href="#">${ApiService.lastPage()}</a>
  //   </li>`,
  //   numOfPageCenter: `<li class="pg-item" data-page="">
  //       <a class="pg-link active" href="#">${ApiService.currentPage}</a>
  //   </li><li class="pg-item" data-page="">
  //       <a class="pg-link" href="#">${ApiService.currentPage + 1}</a>
  //   </li><li class="pg-item" data-page="">
  //       <a class="pg-link" href="#">${ApiService.currentPage + 2}</a>
  //   </li>`,
  //   numOfPageCenterMobile: `<li class="pg-item" data-page="">
  //         <a class="pg-link active" href="#">${ApiService.currentPage}</a>
  //     </li>`,
  //   dot: `<li class="pg-item"><a class="pg-link-dots">...</a></li>`,
  // };
  pgBtn();
  // if ((ApiService.lastPage() <= 3)) {
  //   clearPgContainer();
  // btnNextPg.disabled = true;
  //   pg.insertAdjacentHTML('afterbegin', markup.numOfPageStart);
  //   return;
  // }
  if (window.matchMedia('(min-width: 767.98px)').matches) {
    clearPgContainer();
    renderPgBtn();
  } else {
    clearPgContainer();
    renderPgBtnMobile();
  }
}

function setCurPage(e) {
  e.preventDefault();
  if (ApiService.currentPage === 1) {
   pgLastPage = ApiService.lastPage();
 }
  if (e.target.textContent === '...') {
    return;
  }
  ApiService.currentPage = Number(e.target.textContent);
  if (!!ApiService.lastAction) {
    ApiService.lastAction.action(ApiService.lastAction.arg).then();
  }
}

function renderPgBtnMobile() {
  const markup = {
    numOfPageFirst: ` <li class="pg-item" data-page="">
        <a class="pg-link" href="#">1</a>
    </li>`,
    numOfPageLast: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">${pgLastPage}</a>
    </li>`,
    numOfPageStart: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">1</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">2</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">3</a>
    </li>`,
    numOfPageEnd: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.lastPage() - 2}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.lastPage() - 1}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.lastPage()}</a>
    </li>`,
    numOfPageCenter: `<li class="pg-item" data-page="">
        <a class="pg-link active" href="#">${ApiService.currentPage}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.currentPage + 1}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.currentPage + 2}</a>
    </li>`,
    numOfPageCenterMobile: `<li class="pg-item" data-page="">
          <a class="pg-link" href="#">${ApiService.currentPage}</a>
      </li>`,
    numOfPageThree: `<li class="pg-item" data-page="">
          <a class="pg-link active" href="#">${ApiService.currentPage}</a>
      </li>`,
    dot: `<li class="pg-item"><a class="pg-link-dots">...</a></li>`,
  };

  if (!ApiService.isCategories) {
    ApiService.isCategories = true;
     btnNextPg.disabled = true;
     pg.insertAdjacentHTML('afterbegin', markup.numOfPageStart);
     return;
   }

  if (
    ApiService.currentPage === 1 ||
    ApiService.currentPage === 2 ||
    ApiService.currentPage === 3
  ) {
    clearPgContainer();
    pg.insertAdjacentHTML('afterbegin', markup.numOfPageStart);
    pg.insertAdjacentHTML('beforeend', markup.dot);
    return;
  }

  if (
    ApiService.currentPage === ApiService.lastPage() ||
    ApiService.currentPage === ApiService.lastPage() - 1 ||
    ApiService.currentPage === ApiService.lastPage() - 2
  ) {
    clearPgContainer();

    pg.insertAdjacentHTML('afterbegin', markup.dot);
    pg.insertAdjacentHTML('beforeend', markup.numOfPageEnd);
    return;
  }

  clearPgContainer();
  pg.insertAdjacentHTML('afterbegin', markup.dot);
  pg.insertAdjacentHTML('beforeend', markup.numOfPageCenterMobile);
  pg.insertAdjacentHTML('beforeend', markup.dot);
  pg.insertAdjacentHTML('afterbegin', markup.numOfPageFirst);
  pg.insertAdjacentHTML('beforeend', markup.numOfPageLast);
}

function renderPgBtn() {
  console.log("current",ApiService.currentPage)
  
  console.log(pgLastPage)
  const markup = {
    numOfPageFirst: ` <li class="pg-item" data-page="">
        <a class="pg-link" href="#">1</a>
    </li>`,
    numOfPageLast: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">${pgLastPage}</a>
    </li>`,
    numOfPageStart: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">1</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">2</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">3</a>
    </li>`,
    numOfPageEnd: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.lastPage() - 2}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.lastPage() - 1}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.lastPage()}</a>
    </li>`,
    numOfPageCenter: `<li class="pg-item" data-page="">
        <a class="pg-link active" href="#">${ApiService.currentPage}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.currentPage + 1}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.currentPage + 2}</a>
    </li>`,
    numOfPageCenterMobile: `<li class="pg-item" data-page="">
          <a class="pg-link active" href="#">${ApiService.currentPage}</a>
      </li>`,
    dot: `<li class="pg-item"><a class="pg-link-dots">...</a></li>`,
  };
  pg.addEventListener('click', setCurPage);


  console.log('ApiService.lastPage()', ApiService.lastPage());
  console.log("isCategories",ApiService.isCategories)
  if (!ApiService.isCategories) {
    ApiService.isCategories = true;
    clearPgContainer();
    btnNextPg.disabled = true;
    pg.insertAdjacentHTML('afterbegin', markup.numOfPageStart);
    return;
  }

  if (
    ApiService.currentPage === 1 ||
    ApiService.currentPage === 2 ||
    ApiService.currentPage === 3
  ) {
    clearPgContainer();
    pg.insertAdjacentHTML('afterbegin', markup.numOfPageStart);
    pg.insertAdjacentHTML('beforeend', markup.dot);
  } else if (
    ApiService.currentPage === ApiService.lastPage() ||
    ApiService.currentPage === ApiService.lastPage() - 1 ||
    ApiService.currentPage === ApiService.lastPage() - 2
  ) {
    clearPgContainer();

    pg.insertAdjacentHTML('afterbegin', markup.dot);
    pg.insertAdjacentHTML('beforeend', markup.numOfPageEnd);
  } else {
    clearPgContainer();

    pg.insertAdjacentHTML('afterbegin', markup.dot);
    pg.insertAdjacentHTML('beforeend', markup.numOfPageCenter);
    pg.insertAdjacentHTML('beforeend', markup.dot);
    pg.insertAdjacentHTML('afterbegin', markup.numOfPageFirst);
    pg.insertAdjacentHTML('beforeend', markup.numOfPageLast);
  }
}

function clearPgContainer() {
  pg.innerHTML = '';
}

export function rerenderPaginator() {
  pgBtn();
  btnPgOnPageLoad();
}
