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
        const heroBottom = heroSection.offsetHeight;
        const showNavBuffer = 500;

        // Toggle navbar visibility after hero section
        if (window.scrollY > heroBottom - showNavBuffer) {
            navBar.classList.add("show");
            navBar.classList.remove("hidden");
        } else {
            navBar.classList.remove("show");
            navBar.classList.add("hidden");
        }

        // Highlight the active nav link
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

    // === Project Grid Expand/Collapse Logic ===
    const projectGrid = document.getElementById("project-grid");
    const toggleBtn = document.getElementById("toggle-projects");

    toggleBtn?.addEventListener("click", () => {
        const isExpanded = projectGrid.classList.contains("expanded");

        // Toggle class to expand/collapse the grid
        projectGrid.classList.toggle("expanded", !isExpanded);
        projectGrid.classList.toggle("collapsed", isExpanded);

        // Toggle button label
        toggleBtn.textContent = isExpanded ? "View All Projects" : "Collapse View";
    });

});
