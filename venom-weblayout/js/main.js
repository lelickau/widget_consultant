const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".nav-menu");
const menuButtonClose = document.querySelector(".menu-button-close");
menuButton.addEventListener("click", () => {
  menu.classList.add("is-open");
  menuButtonClose.classList.add("is-active");
});
menuButtonClose.addEventListener("click", () => {
  menu.classList.remove("is-open");
  menuButtonClose.classList.remove("is-active");
});

// form

const hideForm = document.querySelector('.hide-form'),
  orderTicket = document.querySelector('.order-ticket'),
  orderTrigger = document.querySelector('.order-trigger'),
  orderTicketForm = document.querySelector('.order-ticket__form'),
  heightForm = orderTicket.offsetHeight,
  orderTicketFormWrapper = document.querySelector('.order-ticket__form-wrapper'),
  orderTicketPreloaderWrapper = document.querySelector('.order-ticket__preloader-wrapper'),
  orderTicketThanksWrapper = document.querySelector('.order-ticket__thanks-wrapper'),
  orderTicketThanksName = document.querySelector('.order-ticket__thanks-name');

setTimeout(() => {
  hideForm.style.bottom = `${-heightForm}px`;
}, 1000);

const sendData = (data, callback, callBefore) => {

  if (callBefore) callBefore();

  fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
    .then(callback)
}

const showPreloader = () => {
  orderTicketFormWrapper.style.display = 'none';
  orderTicketPreloaderWrapper.style.display = 'block';
}

const showThankYou = (data) => {
  orderTicketFormWrapper.style.display = 'none';
  orderTicketPreloaderWrapper.style.display = 'none';
  orderTicketThanksWrapper.style.display = 'block';
  orderTicketThanksName.textContent = data.name;
}

orderTrigger.addEventListener('click', () => {
  hideForm.classList.toggle('hide-form-active');
})

orderTicketForm.addEventListener('change', (e) => {
  const target = e.target;
  const label = target.labels[0];
  if (label && target.value) {
    label.classList.add('order-ticket__label-focus');
  } else {
    label.classList.remove('order-ticket__label-focus');
  }
});

orderTicketForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(orderTicketForm),
        data = {};

  for (const [name, value] of formData) {
    data[name] = value;
  }

  sendData(data, showThankYou, showPreloader);
});