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
  const localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log('localStorage при Submit', localStorageData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
function populateTextarea() {
  const localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (localStorageData === null) {
    return;
  }
  console.log('localStorageData при обновлении', localStorageData);
  if (localStorageData) {
    refs.email.value = localStorageData.email;
    refs.message.value = localStorageData.message;
  } else {
    refs.email.value = formData.email;
    refs.message.value = formData.message;
  }
}
