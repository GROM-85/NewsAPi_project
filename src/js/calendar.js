import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import format from 'date-fns/format';

export let selectedDate;
document.addEventListener('DOMContentLoaded', () => {
  const yearTitle = {
    tagName: 'span',
    className: 'calendar-title',
    attrs: {
      disabled: true,
    },
    content(dp) {
      return dp.viewDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });
    },
  };
  const buttonTwo = {
    content:
      '<div class="air-datepicker-nav--action"><svg><path d="M 18,10 l -5,6 l 5,6"></path></svg></div>',
    className: 'my--buttons',
    onClick: dp => {
      let newDate = new Date(dp.viewDate);
      newDate.setFullYear(dp.viewDate.getFullYear() - 1);
      dp.setFocusDate(newDate);
      dp.setViewDate(newDate);
    },
  };
  const buttonThree = {
    content:
      '<div class="air-datepicker-nav--action"><svg><path d="M 2,10 l 5,6 l -5,6"></path></svg></div>',
    className: 'my--buttons',
    onClick: dp => {
      let newDate = new Date(dp.viewDate);
      newDate.setFullYear(dp.viewDate.getFullYear() + 1);
      dp.setFocusDate(newDate);
      dp.setViewDate(newDate);
    },
  };
  const buttonFourth = {
    content:
      '<div class="air-datepicker-nav--action"><svg><path d="M 14,7 l -5,9 l 5,9"></path></svg></div>',
    className: 'my--buttons',
    onClick: dp => {
      let newDate = new Date(dp.viewDate);
      newDate.setMonth(dp.viewDate.getMonth() - 1);
      dp.setFocusDate(newDate);
      dp.setViewDate(newDate);
    },
  };
  const buttonFifth = {
    content:
      '<div class="air-datepicker-nav--action"><svg><path d="M 14,7 l 5,9 l -5,9"></path></svg></div>',
    className: 'my--buttons',
    onClick: dp => {
      let newDate = new Date(dp.viewDate);
      newDate.setMonth(dp.viewDate.getMonth() + 1);
      dp.setFocusDate(newDate);
      dp.setViewDate(newDate);
    },
  };
  const datePicker = new AirDatepicker('#calendar', {
    locale: {
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthsShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      dateFormat: 'dd/MM/yyyy',
    },
    autoClose: true,
    selectedDates: [new Date()],
    onShow(animationDone) {
      let header = document.getElementsByClassName(
        'air-datepicker--navigation'
      )[0];
      header.style.display = 'none';
      if (!animationDone) {
        toggleArrowsAndInput();
      }
    },
    buttons: [buttonTwo, yearTitle, buttonThree, buttonFourth, buttonFifth],
    onChangeViewDate() {
      datePicker.update({
        buttons: [buttonTwo, yearTitle, buttonThree, buttonFourth, buttonFifth],
      });
    },
    onHide(animationDone) {
      if (!animationDone) {
        toggleArrowsAndInput();
      }
    },
    position({ $datepicker, $target, $pointer }) {
      let coords = $target.getBoundingClientRect();
      let top = coords.y + coords.height + 1;
      let left = coords.x - coords.width / 2;
      $datepicker.style.left = `${left}px`;
      $datepicker.style.top = `${top}px`;
      $pointer.style.display = 'none';
    },
  });
  function toggleArrowsAndInput() {
    const input = document.getElementById('calendar');
    input.classList.toggle('opened');
    const calendarInputIcon = document.getElementById('calendar_input_icon');
    calendarInputIcon.classList.toggle('opened');
    const arrowDown = document.getElementById('calendar_down_arrow');
    arrowDown.classList.toggle('hidden');
    const arrowUp = document.getElementById('calendar_up_arrow');
    arrowUp.classList.toggle('hidden');
    arrowUp.classList.toggle('opened');
    selectedDate = datePicker.selectedDates;
    let temp = selectedDate.toString();
    selectedDate = format(new Date(temp), 'yyyyMMdd');
  }

  const svgs = [
    ...document.getElementById('calendar-section').getElementsByTagName('svg'),
  ];
  svgs.forEach(it =>
    it.addEventListener('click', event => {
      event.stopPropagation();

      if (!datePicker.visible) {
        datePicker.$el.focus();
      }
    })
  );
});
