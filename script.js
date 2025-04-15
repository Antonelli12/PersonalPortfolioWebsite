document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const carousel = document.querySelector('.carousel');
    const leftButton = document.querySelector('.slide-button.left');
    const rightButton = document.querySelector('.slide-button.right');
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navbar a");
    const homeLink = document.querySelector("a[href='#home']");
    const scrollButton = document.getElementById("scroll-button");
    const aboutSection = document.getElementById("about");
    const heroSection = document.getElementById("hero");
    const navBar = document.getElementById("navbar");

    // === Theme Toggle ===
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");
        themeToggle.innerText = document.body.classList.contains("light-mode") ? "🌙" : "🌞";
    });

    // === Smooth Scrolling ===
    scrollButton?.addEventListener("click", () => {
        aboutSection.scrollIntoView({ behavior: "smooth" });
    });

    homeLink?.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // === Navbar Scroll Handling ===
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const heroBottom = heroSection.offsetHeight;
        const showNavBuffer = 500;

        if (window.scrollY > heroBottom - showNavBuffer) {
            navBar.classList.add("show");
            navBar.classList.remove("hidden");
        } else {
            navBar.classList.remove("show");
            navBar.classList.add("hidden");
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href").includes(currentSectionId));
        });
    });

    // === Carousel Logic (Simplified, No Clones) ===
    const cards = Array.from(document.querySelectorAll(".card"));
    const cardWidth = cards[0].offsetWidth + 32; // width + margin/gap
    let currentIndex = 0;

    function scrollToCard(index) {
        const card = cards[index];
        if (!card) return;
    
        highlightCard(index);
    
        const container = document.querySelector('.carousel-container');
        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
    
        const containerCenter = containerRect.left + containerRect.width / 2;
        const cardCenter = cardRect.left + cardRect.width / 2;
    
        const scrollOffset = cardCenter - containerCenter;
        carousel.scrollLeft += scrollOffset;
    
        currentIndex = index;
    }
    

    function scrollNextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        scrollToCard(currentIndex);
    }

    function scrollPrevCard() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        scrollToCard(currentIndex);
    }

    function highlightCard(index) {
        cards.forEach(card => card.classList.remove("active"));
        cards[index].classList.add("active");
    }

    leftButton.addEventListener("click", scrollPrevCard);
    rightButton.addEventListener("click", scrollNextCard);

    let autoScroll = setInterval(scrollNextCard, 4000);
    carousel.addEventListener("mouseenter", () => clearInterval(autoScroll));
    carousel.addEventListener("mouseleave", () => {
        autoScroll = setInterval(scrollNextCard, 4000);
    });

    cards.forEach((card, index) => {
        card.addEventListener("mouseenter", () => highlightCard(index));
        card.addEventListener("mouseleave", () => scrollToCard(currentIndex));
    });

    // On Load: Center First Card
    scrollToCard(currentIndex);
});
