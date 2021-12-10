let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('#navi');

let enterKeyCode = 13;
let spaceKeyCode = 32;

menuToggle.addEventListener('keyup', function (event) {
  if (event.keyCode == enterKeyCode || event.keyCode == spaceKeyCode) {
    let menuOpen = menu.checked;

    if (menuOpen) {
      menu.checked = false;
    } else {
      menu.checked = true;
    }
  }
});
