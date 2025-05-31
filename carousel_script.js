const slider = document.querySelector(".gallery-slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

// Показати слайд через translate
function setSliderPosition() {
  slider.style.transform = `translateX(${-currentSlide * 100}%)`;
  dots.forEach((dot, i) =>
    dot.classList.toggle("active", i === currentSlide)
  );
}

// Перехід до слайду
function goToSlide(index) {
  currentSlide = index;
  setSliderPosition();
}

// ==== Події для миші ====
slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mouseup", dragEnd);
slider.addEventListener("mouseleave", dragEnd);
slider.addEventListener("mousemove", dragAction);

// ==== Події для сенсора ====
slider.addEventListener("touchstart", dragStart);
slider.addEventListener("touchend", dragEnd);
slider.addEventListener("touchmove", dragAction);

function dragStart(e) {
  isDragging = true;
  startPos = getPositionX(e);
  slider.style.transition = "none";
  animationID = requestAnimationFrame(animation);
}

function dragAction(e) {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  currentTranslate = prevTranslate + currentPosition - startPos;
}

function dragEnd() {
  cancelAnimationFrame(animationID);
  if (!isDragging) return;
  isDragging = false;

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentSlide < slides.length - 1) {
    currentSlide += 1;
  }
  if (movedBy > 100 && currentSlide > 0) {
    currentSlide -= 1;
  }

  setSliderPosition();
  prevTranslate = -currentSlide * slider.offsetWidth;
}

function animation() {
  setSliderTransform(currentTranslate);
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderTransform(translateX) {
  slider.style.transform = `translateX(${translateX}px)`;
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
}

// Початкове положення
setSliderPosition();
