// Grab elements
const header               = document.getElementById('header');
const themeToggleBtns      = document.querySelectorAll('#theme-toggle-btn');
const menuToggleIcon       = document.getElementById('menu-toggle-icon');
const menu                 = document.getElementById('menu');
const searchIcons          = document.querySelectorAll('#search-icon');
const searchFormContainer  = document.getElementById('search-form-container');
const formCloseBtn         = document.getElementById('form-close-btn');

// Nav styles on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header && header.classList.add('scrolled');
    } else {
        header && header.classList.remove('scrolled');
    }
});

// Open menu & search pop-up
if (menuToggleIcon) {
    menuToggleIcon.addEventListener('click', () => {
        menu.classList.toggle('open');
        const isOpen = menu.classList.contains('open');
        const openIcon  = menuToggleIcon.querySelector('.open-menu-icon');
        const closeIcon = menuToggleIcon.querySelector('.close-menu-icon');
        if (openIcon)  openIcon.style.display  = isOpen ? 'none'   : 'inline';
        if (closeIcon) closeIcon.style.display = isOpen ? 'inline' : 'none';
    });
}

// Close menu when a nav link is clicked
document.querySelectorAll('.menu .list-link').forEach(link => {
    link.addEventListener('click', () => {
        menu && menu.classList.remove('open');
        const openIcon  = menuToggleIcon && menuToggleIcon.querySelector('.open-menu-icon');
        const closeIcon = menuToggleIcon && menuToggleIcon.querySelector('.close-menu-icon');
        if (openIcon)  openIcon.style.display  = 'inline';
        if (closeIcon) closeIcon.style.display = 'none';
    });
});

// Open/Close search form popup
searchIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        searchFormContainer && searchFormContainer.classList.add('open');
        setTimeout(() => {
            const input = searchFormContainer && searchFormContainer.querySelector('.form-input');
            input && input.focus();
        }, 300);
    });
});

if (formCloseBtn) {
    formCloseBtn.addEventListener('click', () => {
        searchFormContainer.classList.remove('open');
    });
}

// Close on backdrop click
if (searchFormContainer) {
    searchFormContainer.addEventListener('click', e => {
        if (e.target === searchFormContainer) {
            searchFormContainer.classList.remove('open');
        }
    });
}

// Close the search form popup on ESC keypress
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        searchFormContainer && searchFormContainer.classList.remove('open');
    }
});

// Handle search form submission (static — just closes overlay)
document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        searchFormContainer && searchFormContainer.classList.remove('open');
    });
});

// Switch theme / add to local storage
const savedTheme = localStorage.getItem('newsflash-theme');
if (savedTheme === 'dark') document.body.classList.add('dark-theme');

themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('newsflash-theme', isDark ? 'dark' : 'light');
    });
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterMsg  = document.querySelector('.newsletter-message');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        const email = input ? input.value.trim() : '';
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            input.value = '';
            if (newsletterMsg) {
                newsletterMsg.textContent = '🎉 Thanks for subscribing! Check your inbox soon.';
                newsletterMsg.style.display = 'block';
                setTimeout(() => { newsletterMsg.style.display = 'none'; }, 5000);
            }
        }
    });
}

// Swiper — Featured articles
if (document.querySelector('.featured-swiper')) {
    new Swiper('.featured-swiper', {
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.featured-swiper .swiper-pagination', clickable: true },
    });
}

// Swiper — Quick read (3 slides on desktop, 2 on tablet, 1 on mobile)
if (document.querySelector('.quick-read-swiper')) {
    new Swiper('.quick-read-swiper', {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        slidesPerView: 1,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { el: '.quick-read-swiper .swiper-pagination', clickable: true },
        breakpoints: {
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });
}
