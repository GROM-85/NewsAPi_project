import * as key from '../const';
import * as storage from '../storageLogic';
import { refs } from '../refs';
import format from 'date-fns/format';

//========================
// ADD TO READ
//========================

export function toggleToRead(e) {
  if (!e.target.matches('.info__link')) return;
  let card = e.target.parentNode.parentNode.parentNode.parentNode;
  console.log(card);
  let id = card.id;
  let tickToRead = card.querySelector('.read');
  let readCollection = storage.loadFromLocal(key.KEY_READ) || [];
  let date = format(Date.now(), 'MM/dd/yyyy');

  if (!tickToRead.classList.contains('show')) {
    let readCard = storage
      .loadFromLocal(key.KEY_COLLECTION)
      .find(obj => obj.id === id);
    if (readCollection.length !== 0) {
      for (let obj of readCollection) {
        if (date in obj) {
          obj[date].push(readCard);
          break;
        } else {
          readCollection.push({ [date]: [readCard] });
        }
      }
    } else {
      readCollection.push({
        [date]: [readCard],
      });
    }
    storage.saveToLocal(key.KEY_READ, readCollection);
    tickToRead.classList.add('show');
  }

  // check to delete
  // let updatedCollection = [];
  // for (let obj of readCollection) {
  //   if (date in obj) {
  //     console.log(obj[date]);
  //     updatedCollection = obj[date].filter(objCard => objCard.id !== id);
  //   }
  // }
  // storage.saveToLocal(key.KEY_READ, updatedCollection);
  // tickToRead.classList.remove('show');
}

//========================
// DURING ON LOAD TO READ , should be added after render markup call
//========================

export function onloadToRead() {
  let readCollection = storage.loadFromLocal(key.KEY_READ) || [];
  if (readCollection.length === 0) return;

  readCollection.forEach(obj => {
    let values = Object.values(obj)[0]; // cause Object.values is ARRAY so need to add [0] as we have one key
    for (let value of values) {
      if (!document.getElementById(`${value.id}`)) continue;
      let elem = document.getElementById(`${value.id}`);
      let tickToRead = elem.querySelector('.read');
      tickToRead.classList.add('show');
    }
  });
}
