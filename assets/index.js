(() => {
  function debounce(callback, dalay) {
    let timer = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(callback, dalay);
    };
  }

  const SCROLLING_OFFSET_THRESHOLD = 500;

  let scrollStartOffset = null;
  let isScrolling = false;
  let scrollStateResetTimer = null;

  function onScrollStart() {
    document.body.classList.add("scrolling");
    isScrolling = true;
  }
  const resetScrollStartOffset = debounce(function () {
    scrollStartOffset = null;
  }, 200);
  const onScrollStop = debounce(function stopScroll() {
    if (isScrolling) {
      document.body.classList.remove("scrolling");
      document.body.classList.add("stopping");
      isScrolling = false;
      scrollStateResetTimer = setTimeout(() => {
        onScrollReset();
      }, 300);
    }
  }, 1000);
  function onScrollReset() {
    document.body.classList.remove("stopping");
    scrollStateResetTimer = null;
  }
  let lastTime = 0;
  function onScroll() {
    lastTime = Date.now();
    if (scrollStartOffset === null) {
      scrollStartOffset = window.scrollY;
    }
    if (
      Math.abs(window.scrollY - scrollStartOffset) >
        SCROLLING_OFFSET_THRESHOLD &&
      isScrolling === false
    ) {
      onScrollStart();
    }
    resetScrollStartOffset();
    onScrollStop();
  }

  window.addEventListener("scroll", onScroll);
})();
