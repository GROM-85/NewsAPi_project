import format from 'date-fns/format';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
export let selectedDate;


const options = {
  minuteIncrement: 1,
  dateFormat: "Y-m-d",
  onClose(selectedDates,dateStr,instance) {
      let deg = 0;
      if(!selectedDates[0]){
        arrowToggle(deg);
        return;
      }
      selectedDate = format(new Date(selectedDates[0]),'yyyyMMdd');
      console.log(selectedDate)
      arrowToggle(deg);
  },
  onOpen(){
    let deg = 180;
    arrowToggle(deg);

}
};

const input = document.querySelector("#calendar");
flatpickr(input,options);


function arrowToggle(deg){
  const arrow = document.querySelector(".calendar__arrow");
  arrow.style.transform = `rotate(${deg}deg)`;
}