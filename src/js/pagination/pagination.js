import { refs } from "../refs";

// DYNAMIC PAGINATION
export function pagination(valuePage) {
  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;
  let range;
  if (window.matchMedia('(max-width: 480px)').matches){
    range = delta + 2;
  }else{
    range = delta + 4; // use for handle visible number of links left side
  }
  

  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item"><a class="pg-link">...</a></li>`;
  let countTruncate = 0; // use for ellipsis - truncate left side or right side

  // use for truncate two side
  const numberTruncateLeft = curPage - delta;
  const numberTruncateRight = curPage + delta;

  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';

    // truncate
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft >= 2 && numberTruncateRight <= totalPages - 2 + 1) {
        // truncate 2 side
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {
        // truncate left side or right side
        if (
          (curPage < range && pos <= range) ||
          (curPage > totalPages - range && pos >= totalPages - range + 1) ||
          pos === totalPages ||
          pos === 1
        ) {
          render += renderPage(pos, active);
        } else {
          countTruncate++;
          if (countTruncate === 1) render += dot;
        }
      }
    } else {
      // not truncate
      render += renderPage(pos, active);
    }
  }

  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    refs.pg.innerHTML = renderTwoSide;
  } else {
    refs.pg.innerHTML = render;
  }
}

export function renderPage(index, active = '') {
  return ` <li class="pg-item ${active}" data-page="${index}">
        <a class="pg-link" href="#">${index}</a>
    </li>`;
}


export function handleButton(element,valuePage) {
 
  if (element.classList.contains('prev-page')) {
    valuePage.curPage--;
    handleButtonLeft(valuePage);
    refs.btnNextPg.disabled = false;
    
  } else if (element.classList.contains('next-page')) {
    valuePage.curPage++;
    handleButtonRight(valuePage);
    refs.btnPrevPg.disabled = false;
    
  }
  // console.log(valuePage)
  pagination(valuePage);
  return valuePage.curPage;
}

export function handleButtonLeft(valuePage) {
  
  if (valuePage.curPage === 1) {
    refs.btnPrevPg.disabled = true;
   
  } else {
    refs.btnPrevPg.disabled = false;
    
  }
}
export function handleButtonRight(valuePage) {
  
  if (valuePage.curPage === valuePage.totalPages) {
    refs.btnNextPg.disabled = true;
  } else {
    refs.btnNextPg.disabled = false;
    
  }
}