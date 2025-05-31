const list = document.querySelectorAll(".carousel-slide");

document.addEventListener('DOMContentLoaded', () => {
  const nextButton = document.querySelector('.carousel-button.next');
  const prevButton = document.querySelector('.carousel-button.prev');
  let currentSlide = 0;

  function updateCarousel() {
    list.forEach((img, index) => {
      img.style.display = index === currentSlide ? 'block' : 'none';
    });
  }

  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % list.length;
    updateCarousel();
  });

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + list.length) % list.length;
    updateCarousel();
  });

  updateCarousel(); // Викликаємо одразу
});
