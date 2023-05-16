function addScrollingClass() {
  document.body.classList.add("scrolling");
}

function removeScrollClass() {
  document.body.classList.remove("scrolling");
}

function debounce(callback) {
  var timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, 40);
  };
}

var debounceRemoveScrollClass = debounce(removeScrollClass);

function onBodyScroll() {
  addScrollingClass();
  debounceRemoveScrollClass();
}

window.addEventListener("scroll", onBodyScroll);
