document.addEventListener("DOMContentLoaded", function () {
    // === Element Selectors ===
    const themeToggle = document.getElementById("theme-toggle"); // Theme toggle button
    const carousel = document.querySelector('.carousel'); // Carousel container
    const cards = document.querySelectorAll(".card"); // A single card element (consider changing to querySelectorAll if you want all cards)
    const leftButton = document.querySelector('.slide-button.left'); // Left scroll button
    const rightButton = document.querySelector('.slide-button.right'); // Right scroll button
    const sections = document.querySelectorAll("section"); // All section elements on the page
    const navLinks = document.querySelectorAll("#navbar a"); // All anchor links in the navbar
    const homeLink = document.querySelector("a[href='#home']"); // Anchor link to scroll to top
    const scrollButton = document.getElementById("scroll-button"); // Button to scroll to About section
    const aboutSection = document.getElementById("about"); // About section
    const heroSection = document.getElementById("hero"); // Hero section
    const navBar = document.getElementById("navbar"); // The main navigation bar

    // === Helper Functions ===

    /**
     * Updates which navbar link is marked as "active" based on the current section in view.
     * @param {string} currentSectionId - The ID of the currently visible section.
     */
    function updateActiveNavLink(currentSectionId) {
        navLinks.forEach(link => {
            // Highlight the link that includes the current section's ID in its href
            link.classList.toggle("active", link.getAttribute("href").includes(currentSectionId));
        });
    }

    // === Theme Toggle ===

    /**
     * Toggles between light mode and dark mode on button click.
     * Updates the button icon based on the current theme.
     */
    themeToggle.addEventListener("click", function() {
        document.body.classList.toggle("light-mode");

        // Switch icon based on current mode
        themeToggle.innerText = document.body.classList.contains("light-mode") ? "🌙" : "🌞";
    });

    // === Smooth Scroll Actions ===

    /**
     * Scrolls smoothly to the About section when the scroll button is clicked.
     */
    scrollButton.addEventListener("click", function () {
        aboutSection.scrollIntoView({ behavior: "smooth" });
    });

    /**
     * Scrolls smoothly to the top of the page when the home link is clicked.
     */
    homeLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // === Scroll and Navbar Updates ===

    /**
     * Handles showing the navbar after scrolling past the hero section
     * and updates which nav link is active based on scroll position.
     */
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const heroBottom = heroSection.offsetHeight;
        const showNavBuffer = 500; // Delay buffer to trigger navbar visibility

        // Show/hide navbar depending on scroll position
        if (window.scrollY > heroBottom - showNavBuffer) {
            navBar.classList.add("show");
            navBar.classList.remove("hidden");
        } else {
            navBar.classList.remove("show");
            navBar.classList.add("hidden");
        }

        // Determine current section in view to highlight the correct nav link
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust for offset
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        updateActiveNavLink(currentSectionId);
    });

    // === Carousel Scroll Buttons ===

    /**
     * Scrolls the carousel to the left by 300px with smooth animation.
     */
    leftButton.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });

    /**
     * Scrolls the carousel to the right by 300px with smooth animation.
     */
    rightButton.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });
});
