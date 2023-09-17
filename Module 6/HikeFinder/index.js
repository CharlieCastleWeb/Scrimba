const menuBtn = document.querySelector(".burger");
const mobileNav = document.querySelector(".mobile-nav");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("is-active");
    mobileNav.classList.toggle("is-active");
});
