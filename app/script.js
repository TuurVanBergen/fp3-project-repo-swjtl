document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");

 

    prevButton.addEventListener("click", shiftCarousel.bind(null, "left"));
    nextButton.addEventListener("click", shiftCarousel.bind(null, "right"));

 

    function shiftCarousel(direction) {
        const carouselItems = carousel.querySelectorAll(".carousel-item");
        const firstItem = carouselItems[0];
        const lastItem = carouselItems[carouselItems.length - 1];

 

        if (direction === "left") {
            carousel.insertBefore(lastItem, firstItem);
        } else if (direction === "right") {
            carousel.appendChild(firstItem);
        }
    }
});