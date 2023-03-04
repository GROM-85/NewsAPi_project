import * as key from './const';
import * as storage from './storageLogic';
import { clearCurrent } from './navLogic/navLogic';

const inputSwitches = document.querySelectorAll('#theme-switch');
const themeTexts = document.querySelectorAll('.text-switch');
const themeIcons = document.querySelectorAll('.switch-icon')


inputSwitches.forEach(inputSwitch => {
  inputSwitch.addEventListener('change', onInputChange);
  getCurrentTheme(inputSwitch);
});

function onInputChange(e) {
  if (e.currentTarget.checked) {
    document.body.classList.add('darkMode');
    document.body.classList.remove('light');
    clearCurrent(themeTexts,'active');
    clearCurrent(themeIcons,'active');
    themeTexts.forEach(elem =>{
      if(elem.matches('.dark'))elem.classList.add('active')
    });
    themeIcons.forEach(elem =>{
      if(elem.matches('.dark'))elem.classList.add('active')
    });
    
    storage.saveToLocal(key.KEY_THEME, 'darkMode');
  } else {
    
    document.body.classList.add('light');
    document.body.classList.remove('darkMode');
    clearCurrent(themeTexts,'active');
    clearCurrent(themeIcons,'active');
    themeTexts.forEach(elem =>{
      if(elem.matches('.light'))elem.classList.add('active')
    });
    themeIcons.forEach(elem =>{
      if(elem.matches('.light'))elem.classList.add('active')
    });
    storage.saveToLocal(key.KEY_THEME, 'light');
  }
}

function getCurrentTheme(input) {
  const currentTheme = storage.loadFromLocal('theme') || 'light';
  document.body.className = currentTheme
  clearCurrent(themeTexts,'active');
  clearCurrent(themeIcons,'active');
  themeTexts.forEach(elem =>{
    if(elem.matches('.light'))elem.classList.add('active')
  });
  themeIcons.forEach(elem =>{
    if(elem.matches('.light'))elem.classList.add('active')
  });

  if (currentTheme === 'darkMode') {
    input.checked = true;
    clearCurrent(themeTexts,'active');
    clearCurrent(themeIcons,'active');
    themeTexts.forEach(elem =>{
      if(elem.matches('.dark'))elem.classList.add('active')
    });
    themeIcons.forEach(elem =>{
      if(elem.matches('.dark'))elem.classList.add('active')
    });
  }
}




