new Swiper(".general-swiper-container", {
    observer: true,
    observeParents: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: false,
    },
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: false,
    speed: 800,
    autoHeight: true,
    watchOverflow: true,
    breakpoints: {
        600: {
            slidesPerView: 1,
        }
    }
})