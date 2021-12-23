import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

let formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onDataInput, 500));

populateTextarea();

function onDataInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  let localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log('localStorageData при Submit', localStorageData);
  formData = {};
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
function populateTextarea() {
  const localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (localStorageData === null || localStorageData === undefined) {
    return;
  }
  formData = localStorageData;
  console.log('localStorageData при обновлении', localStorageData);
  if (localStorageData.email) {
    refs.email.value = localStorageData.email;
  }
  if (localStorageData.message) {
    refs.message.value = localStorageData.message;
  }
  refs.email.value;
  refs.message.value;
}
