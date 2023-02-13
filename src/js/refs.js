export default function getRefs(){
    return {    
        gallery: document.querySelector(`.card__list`),  
        wether: document.querySelector(`.wether`),
        filter: document.querySelector(`.search-form`),
        filterBtn: document.querySelector(`.js-button-search`),
        filterInput: document.querySelector(`.form__input-close`),
        calendar: document.querySelector(`.calendar`),
       calendarInput:document.querySelector(`.calendar__input`),
       
}
}
