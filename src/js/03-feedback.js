import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', onEmailInput);
refs.message.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onEmailInput(event) {
  formData[event.target.name] = event.target.value;
}
function onTextareaInput(event) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
function populateTextarea() {
  const savedMsg = localStorage.getItem(STORAGE_KEY);
  if (savedMsg) {
    const parseJsonObj = JSON.parse(savedMsg);
    refs.email.value = parseJsonObj.email;
    refs.message.value = parseJsonObj.message;
  }
}
