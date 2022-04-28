const currentDate = new Date();
const months = [
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
];

let currentYear = currentDate.getFullYear();
let currentMonth = months[currentDate.getMonth()];
document.querySelector('#year').textContent = currentYear;

document.querySelector(
  '#last-update'
).textContent = `${currentMonth}  ${currentYear}`;
