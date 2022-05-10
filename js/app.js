let track = document.querySelector(`.carouselTrack`);
let slides = Array.from(track.children);
let nextButton = document.querySelector(`.carouselButton--right`);
let backButton = document.querySelector(`.carouselButton--left`);

let slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);
let setSlidePosition = ((slide,index) => {
    slide.style.left = slideWidth * index + `px`;
});

slides.forEach(setSlidePosition);

let moveSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-` + targetSlide.style.left + `)`;
    currentSlide.classList.remove(`currentSlide`);
    targetSlide.classList.add(`currentSlide`);
    hideArrow();
};

document.addEventListener(`keydown`, e => {
    let key = e.key;
    let currentSlide = track.querySelector(`.currentSlide`);
    let nextSlide = currentSlide.nextElementSibling;
    switch (key) {
        case `ArrowRight`:
            moveSlide(track, currentSlide, nextSlide);
    }
});

document.addEventListener(`keydown`, e => {
    let key = e.key;
    let currentSlide = track.querySelector(`.currentSlide`);
    let previousSlide = currentSlide.previousElementSibling;
    switch (key) {
        case `ArrowLeft`:
            moveSlide(track, currentSlide, previousSlide);
    }
});

backButton.addEventListener(`click`, () => {
    let currentSlide = track.querySelector(`.currentSlide`);
    let previousSlide = currentSlide.previousElementSibling;
    moveSlide(track, currentSlide, previousSlide);
});

nextButton.addEventListener(`click`, () => {
    let currentSlide = track.querySelector(`.currentSlide`);
    let nextSlide = currentSlide.nextElementSibling;
    moveSlide(track, currentSlide, nextSlide);
});

let hideArrow = () => {
    let GetSliders = document.querySelectorAll(`ul li`);
    let FirstChild = document.querySelectorAll(`ul li`)[0];
    let LastChild = document.querySelectorAll(`ul li`)[GetSliders.length-1];
    let firstSlide = FirstChild.classList.contains(`currentSlide`);
    let lastSlide = LastChild.classList.contains(`currentSlide`);
    if(lastSlide == true){
        nextButton.style.display = `none`;
    }else {
        nextButton.style.display = `block`;
    }
    console.log(firstSlide);
    if(firstSlide == true){
        backButton.style.display = `none`;
    }else {
        backButton.style.display = `block`;
    }
};


