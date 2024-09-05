document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.classList.add('visible');
        } else {
            // Scrolling up
            navbar.classList.remove('visible');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });
});
