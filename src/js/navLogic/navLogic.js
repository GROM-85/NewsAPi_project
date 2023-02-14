import * as key from "../const";
import { refs } from "../refs";
import * as storage from "../storageLogic";
import * as render from "../renderMarkup";



// import in index.js
refs.nav.addEventListener("click",(e)=>{
    let curr = e.target.parentNode;
    let list = Array.from(e.currentTarget.children);
    console.dir(list)
    clearNavCurrent(list);
    curr.classList.add("current-list__item")
})

export function clearNavCurrent(root){
    root.forEach(elem => {
        if(elem.classList.contains("current-list__item")) elem.classList.remove("current-list__item");
    })
}