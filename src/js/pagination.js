import getRefs from './refs';
import { renderMarkup, clear, renderWether } from './renderMarkup';
import * as key from './const';
import * as storage from './storageLogic';
import * as newsCard from './newsCard';
import format from 'date-fns/format';
import { NewsAPI } from './API/fetchAPI';

const newsFetch = new NewsAPI();
const refs = getRefs();
const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');
const valuePage = {
  curPage: 1,
  totalCard: 8,
  lastPage: 10,
};

pgBtn();
btnPgOnResize();
btnPgOnPageLoad();
btnNextPg.addEventListener('click', onNextPage);
btnPrevPg.addEventListener('click', onPrevPage);
// pg.addEventListener('click', getCurPage);

function pgBtn() {
  if (valuePage.curPage === 1) {
    btnPrevPg.disabled = true;
    btnNextPg.disabled = false;
  } else if (valuePage.curPage === valuePage.lastPage) {
    btnPrevPg.disabled = false;
    btnNextPg.disabled = true;
  } else {
    btnPrevPg.disabled = false;
    btnNextPg.disabled = false;
  }
}

console.log(valuePage.curPage);

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

  valuePage.curPage += 1;
  pgBtn();
  console.log('+1', valuePage.curPage);
  btnPgOnPageLoad();
}

function onPrevPage(e) {
  e.preventDefault();

  valuePage.curPage -= 1;
  pgBtn();
  console.log('-1', valuePage.curPage);
  btnPgOnPageLoad();
}

function getCurPage(e) {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.textContent === '...') {
    return;
  }
  console.log('e.target.textContent', e.target.textContent);
  valuePage.curPage = Number(e.target.textContent);
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
        <a class="pg-link" href="#">${valuePage.lastPage}</a>
    </li>`,
    numOfPageStart: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">1</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">2</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">3</a>
    </li>`,
    numOfPageEnd: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.lastPage - 2}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.lastPage - 1}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.lastPage}</a>
    </li>`,
    numOfPageCenter: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.curPage}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.curPage + 1}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.curPage + 2}</a>
    </li>`,
    numOfPageCenterMobile: `<li class="pg-item" data-page="">
          <a class="pg-link" href="#">${valuePage.curPage}</a>
      </li>`,
    dot: `<li class="pg-item"><a class="pg-link-dots">...</a></li>`,
  };
    
  if (
    valuePage.curPage === 1 ||
    valuePage.curPage === 2 ||
    valuePage.curPage === 3
  ) {
    clearPgContainer();
    pg.insertAdjacentHTML('afterbegin', markup.numOfPageStart);
    pg.insertAdjacentHTML('beforeend', markup.dot);
  } else if (
    valuePage.curPage === valuePage.lastPage ||
    valuePage.curPage === valuePage.lastPage - 1 ||
    valuePage.curPage === valuePage.lastPage - 2
  ) {
    clearPgContainer();

    pg.insertAdjacentHTML('afterbegin', markup.dot);
    pg.insertAdjacentHTML('beforeend', markup.numOfPageEnd);
  } else {
    clearPgContainer();

    pg.insertAdjacentHTML('afterbegin', markup.dot);
    pg.insertAdjacentHTML('beforeend', markup.numOfPageCenterMobile);
    pg.insertAdjacentHTML('beforeend', markup.dot);
    pg.insertAdjacentHTML('afterbegin', markup.numOfPageFirst);
    pg.insertAdjacentHTML('beforeend', markup.numOfPageLast);
  }
}

function renderPgBtn() {
  const markup = {
    numOfPageFirst: ` <li class="pg-item" data-page="">
        <a class="pg-link" href="#">1</a>
    </li>`,
    numOfPageLast: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.lastPage}</a>
    </li>`,
    numOfPageStart: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">1</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">2</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">3</a>
    </li>`,
    numOfPageEnd: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.lastPage - 2}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.lastPage - 1}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.lastPage}</a>
    </li>`,
    numOfPageCenter: `<li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.curPage}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.curPage + 1}</a>
    </li><li class="pg-item" data-page="">
        <a class="pg-link" href="#">${valuePage.curPage + 2}</a>
    </li>`,
    numOfPageCenterMobile: `<li class="pg-item" data-page="">
          <a class="pg-link" href="#">${valuePage.curPage}</a>
      </li>`,
    dot: `<li class="pg-item"><a class="pg-link-dots">...</a></li>`,
  };
  pg.addEventListener('click', getCurPage);
  if (
    valuePage.curPage === 1 ||
    valuePage.curPage === 2 ||
    valuePage.curPage === 3
  ) {
    clearPgContainer();
    pg.insertAdjacentHTML('afterbegin', markup.numOfPageStart);
    pg.insertAdjacentHTML('beforeend', markup.dot);
  } else if (
    valuePage.curPage === valuePage.lastPage ||
    valuePage.curPage === valuePage.lastPage - 1 ||
    valuePage.curPage === valuePage.lastPage - 2
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




// newsFetch.getPopularNews().then(console.log);
// const popularNews = newsFetch.getPopularNews();
// console.log(popularNews);

// function dislayList(arrData, rowRatePage, page) {
//   const start = rowRatePage * page;
//   const end = start + rowRatePage;
//   const paginatedData = arrData.slice(start, end);
// }

// pagination();
// pg.addEventListener('click', e => {
//   const ele = e.target;
//   console.log(ele.dataset.page);
//   if (ele.dataset.page) {
//     const pageNumber = parseInt(e.target.dataset.page, 20);
//     valuePage.curPage = pageNumber;
//     pagination(valuePage);
//     console.log(valuePage);
//     handleButtonLeft();
//     handleButtonRight();
//   }
// });
// // DYNAMIC PAGINATION

// function pagination() {
//   const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;
//   const range = delta + 2; // use for handle visible number of links left side
//   let render = '';
//   let renderTwoSide = '';
//   let dot = `<li class="pg-item"><a class="pg-link-dots">...</a></li>`;
//   let countTruncate = 0; // use for ellipsis - truncate left side or right side
//   // use for truncate two side
//   const numberTruncateLeft = curPage - delta;
//   const numberTruncateRight = curPage + delta;
//   let active = '';
//   for (let pos = 1; pos <= totalPages; pos++) {
//     active = pos === curPage ? 'active' : '';
//     // truncate
//     if (totalPages >= 2 * range - 1) {
//       if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
//         // truncate 2 side
//         if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
//           renderTwoSide += renderPage(pos, active);
//         }
//       } else {
//         // truncate left side or right side
//         if (
//           (curPage < range && pos <= range) ||
//           (curPage > totalPages - range && pos >= totalPages - range + 1) ||
//           pos === totalPages ||
//           pos === 1
//         ) {
//           render += renderPage(pos, active);
//         } else {
//           countTruncate++;
//           if (countTruncate === 1) render += dot;
//         }
//       }
//     } else {
//       // not truncate
//       render += renderPage(pos, active);
//     }
//   }
//   if (renderTwoSide) {
//     renderTwoSide =
//       renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
//     pg.innerHTML = renderTwoSide;
//   } else {
//     pg.innerHTML = render;
//   }
// }
// function renderPage(index, active = '') {
//   return ` <li class="pg-item ${active}" data-page="${index}">
//         <a class="pg-link" href="#">${index}</a>
//     </li>`;
// }
// document
//   .querySelector('.page-container')
//   .addEventListener('click', function (e) {
//     handleButton(e.target);
//   });
// function handleButton(element) {
//   if (element.classList.contains('first-page')) {
//     valuePage.curPage = 1;
//   } else if (element.classList.contains('last-page')) {
//     valuePage.curPage = 20;
//   } else if (element.classList.contains('prev-page')) {
//     valuePage.curPage -= 1;
//     handleButtonLeft();
//     btnNextPg.disabled = false;
//     // btnLastPg.disabled = false;
//   } else if (element.classList.contains('next-page')) {
//     valuePage.curPage += 1;
//     handleButtonRight();
//     btnPrevPg.disabled = false;
//     // btnFirstPg.disabled = false;
//   }
//   pagination();
// }
// function handleButtonLeft() {
//   if (valuePage.curPage === 1) {
//     btnPrevPg.disabled = true;
//     // btnFirstPg.disabled = true;
//   } else {
//     btnPrevPg.disabled = false;
//     // btnFirstPg.disabled = false;
//   }
// }
// function handleButtonRight() {
//   if (valuePage.curPage === valuePage.totalPages) {
//     console.log(valuePage.curPage);
//     btnNextPg.disabled = true;
//     // btnLastPg.disabled = true;
//   } else {
//     btnNextPg.disabled = false;
//     // btnLastPg.disabled = false;
//   }
// }
