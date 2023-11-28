import ValidationForm from './validation';

const form = document.querySelector('.form');
const validateForm = new ValidationForm(form);

const input = document.querySelector('.input');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value;
  validateForm.validate(value);
});



