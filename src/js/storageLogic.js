const saveToLocal = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const loadFromLocal = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const saveToSession = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    sessionStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const loadFromSession = key => {
  try {
    const serializedState = sessionStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export { saveToSession, loadFromSession, saveToLocal, loadFromLocal };
