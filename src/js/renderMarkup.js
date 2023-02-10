export function renderMarkup({imgUrl,title,text,date,url,id,categorie}){
    return `<li class="card__item"  id=${id}>
         <div class="thumb" style="background-image: url('${imgUrl}')">
         <span class="thumb__item" >${capitalizeFirstLetter(categorie)}</span>
         <button type="button" data-action="favorite-btn" class="favorite-btn">
        Add to favorite
        <svg class="favorite-icon" width="16" height="16">
            <use href="./images/icons.svg#heart_empty"></use>
        </svg>
    </button>
      </div class="info__helper">
    <div class="info">
     <h2 class="info__title">${title}</h2>
     <div>
     <p class="info__text">${formatText(text)}</p>
     <div class=info__meta>
     <p class="info__date">${date}</p>
     <a class="info__link" href="${url}">Read more</a>
     </div>
     </div>
   </div>     
  </li>`
}

const MAXLENGHT = 110;
//get String with first letter uppercase
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase()+ string.slice(1);
}
function formatText(text) {
  let result;
  // Change code below this line
  if(text.length > MAXLENGHT){
   text= text.slice(0, MAXLENGHT);
    result= text + `...`;
  }else{
    result=text;
  }
  return result;
}


function clear(item) {
  item.innerHTML = ``;
}