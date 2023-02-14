import { renderMarkup, clear, renderWether } from './renderMarkup';
import * as key from './const';
import * as storage from './storageLogic';
import * as newsCard from './newsCard';
import format from 'date-fns/format';
import { ApiService } from './API/fetchAPI';

const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');

pgBtn();
btnPgOnResize();
btnPgOnPageLoad();
btnNextPg.addEventListener('click', onNextPage);
btnPrevPg.addEventListener('click', onPrevPage);

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
  if (window.matchMedia('(min-width: 767.98px)').matches) {
    clearPgContainer();
    renderPgBtn();
  } else {
    clearPgContainer();
    renderPgBtnMobile();
  }
}

function onNextPage(e) {
  e.preventDefault();

   if (ApiService.currentPage >= ApiService.lastPage()) {
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

function setCurPage(e) {
  e.preventDefault();
  if (e.target.textContent === '...') {
    return;
  }
  ApiService.currentPage = Number(e.target.textContent);

  if (!!ApiService.lastAction) {
    ApiService.lastAction.action(ApiService.lastAction.arg).then();
  }
}

function clearPgContainer() {
  pg.innerHTML = '';
}

function renderPgBtnMobile() {
  const markup = {
    numOfPageFirst: ` <li class="pg-item" data-page="">
        <a class="pg-link" href="#">1</a>
    </li>`,
    numOfPageLast: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.lastPage()}</a>
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
        <a class="pg-link" href="#">${ApiService.currentPage}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.currentPage + 1}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.currentPage + 2}</a>
    </li>`,
    numOfPageCenterMobile: `<li class="pg-item" data-page="">
          <a class="pg-link" href="#">${ApiService.currentPage}</a>
      </li>`,
    dot: `<li class="pg-item"><a class="pg-link-dots">...</a></li>`,
  };

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
  const markup = {
    numOfPageFirst: ` <li class="pg-item" data-page="">
        <a class="pg-link" href="#">1</a>
    </li>`,
    numOfPageLast: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.lastPage()}</a>
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
        <a class="pg-link" href="#">${ApiService.currentPage}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.currentPage + 1}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${ApiService.currentPage + 2}</a>
    </li>`,
    numOfPageCenterMobile: `<li class="pg-item" data-page="">
          <a class="pg-link" href="#">${ApiService.currentPage}</a>
      </li>`,
    dot: `<li class="pg-item"><a class="pg-link-dots">...</a></li>`,
  };
  pg.addEventListener('click', setCurPage);
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

export function rerenderPaginator() {
  pgBtn();
  btnPgOnPageLoad();
}