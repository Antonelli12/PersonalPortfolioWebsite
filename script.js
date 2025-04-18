document.addEventListener("DOMContentLoaded", function () {
    // === Element Selectors ===
    const themeToggle = document.getElementById("theme-toggle");
    const scrollButton = document.getElementById("scroll-button");
    const homeLink = document.querySelector("a[href='#home']");
    const aboutSection = document.getElementById("about");
    const heroSection = document.getElementById("hero");
    const navBar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navbar a");
    const form = document.querySelector('#contact-form');
    const feedback = document.getElementById('form-feedback');

    // === Theme Toggle (Dark / Light Mode) ===
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        themeToggle.innerText = document.body.classList.contains("light-mode") ? "🌙" : "🌞";
    });

    // === Smooth Scrolling Handlers ===
    scrollButton?.addEventListener("click", () => {
        aboutSection.scrollIntoView({ behavior: "smooth" });
    });

    homeLink?.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // === Navbar Scroll Behavior ===
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollBottom = scrollY + windowHeight;

        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        // Show/hide navbar when passing hero section by a better threshold
        if (scrollY > heroBottom - 150) {
            navBar.classList.add("show");
            navBar.classList.remove("hidden");
        } else {
            navBar.classList.remove("show");
            navBar.classList.add("hidden");
        }

        // Detect current visible section or scroll bottom edge
        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;

            // Regular logic OR if near the bottom of the page
            if (scrollY >= top - 100 || (scrollBottom >= document.body.scrollHeight - 5 && section.id === "contact")) {
                currentSectionId = section.getAttribute("id");
            }
        });

        // Apply active class to navbar items
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href").includes(currentSectionId));
        });
    });

    // === Project Grid Expand/Collapse Logic ===
    const projectGrid = document.getElementById("project-grid");
    const toggleBtn = document.getElementById("toggle-projects");

    toggleBtn?.addEventListener("click", () => {
        const isExpanded = projectGrid.classList.contains("expanded");

        // Toggle class to expand/collapse the grid
        projectGrid.classList.toggle("expanded", !isExpanded);
        projectGrid.classList.toggle("collapsed", isExpanded);

        // Toggle button label
        toggleBtn.textContent = isExpanded ? "Expand View" : "Collapse View";
    });

    // === Contact Form Submission Feedback ===
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent real submission for now
        feedback.style.display = 'block';
        form.reset();

        // Hide after 4 seconds
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 4000);
    });
});
