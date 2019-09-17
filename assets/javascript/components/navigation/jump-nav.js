let mainNavLinks = document.querySelectorAll(".jn a");
let mainSections = document.querySelectorAll("main section");
let lastId;
let cur = [];
function scrollActive() {
    let fromTop = window.scrollY + window.innerHeight/2;
    mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash);
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}
window.addEventListener("load", event => {
    scrollActive();
});
window.addEventListener("scroll", event => {
    scrollActive();
});