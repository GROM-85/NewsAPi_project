const inputSwitches = document.querySelectorAll('#theme-switch');

inputSwitches.forEach(inputSwitch => {
  inputSwitch.addEventListener('change', onInputChange);
  getCurrentTheme(inputSwitch);
});

function onInputChange(evt) {
  if (evt.currentTarget.checked) {
    document.body.classList.add('darkMode');
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'darkMode');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('darkMode');
    localStorage.setItem('theme', 'light');
  }
}

function getCurrentTheme(input) {
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.className = currentTheme;
  if (currentTheme === 'darkMode') {
    input.checked = true;
  }
}
