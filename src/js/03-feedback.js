// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
import Throttle from "lodash.throttle"

//Переменные
const form = document.querySelector('.feedback-form');
const email = form.querySelector("[name=email]");
const message = form.querySelector("[name=message]");
const localKey = "feedback-form-state"

//Слушатели событий
form.addEventListener("input", Throttle(storageFromData, 500));
form.addEventListener("submit", onFormSubmit);


// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
window.addEventListener('load', checkStorage);

function checkStorage() {
  if (!localStorage.getItem(localKey)) return;
  const formValue = JSON.parse(localStorage.getItem(localKey));
  for(const key in formValue){
    form.elements[key].value = formValue[key];
  }
};

// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
function onFormSubmit(event){
    event.preventDefault();
    const {email, message}=event.currentTarget.elements
    console.dir({email: email.value, message:message.value})
    localStorage.removeItem(localKey);
    event.currentTarget.reset();
};

// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
function storageFromData(event) {
    const formValue = {email:"", message:""};
    if(localStorage.getItem(localKey)){
      Object.assign(formValue, JSON.parse(localStorage.getItem(localKey)))
    }
    formValue[event.target.name] = event.target.value.trim();
    localStorage.setItem(localKey, JSON.stringify(formValue))
};


