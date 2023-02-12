import format from "date-fns/format";
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';


import { NewsAPI } from './API/fetchAPI';
import getRefs from './refs';
import { renderMarkup, clear,renderWether } from './renderMarkup';
import * as storage from './storageLogic';
import * as key from './const';
import * as newsCard from './newsCard'; 

const refs = getRefs();
console.log(refs.calendar);
console.log(refs.calendarInput)
refs.calendarInput.addEventListener(`click`, onDataSelect);

function onDataSelect(e) {
    // e.preventDefault;
    // const data = new AirDatepicker(refs.calendarInput)
    // console.log(data)
    // console.log(e.target.value)
    // console.log(data.viewDate)
}


