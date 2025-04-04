// Select the theme toggle button
const themeToggle = document.getElementById("theme-toggle");

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); // Select all page sections
    const navLinks = document.querySelectorAll("#navbar a"); // Select all navigation links
    const homeLink = document.querySelector("a[href='#home']"); // Select the 'Home' navigation link
    const scrollButton = document.getElementById("scroll-button"); // Select the 'View My Work' button
    const aboutSection = document.getElementById("about"); // Select the 'About' section
    const heroSection = document.getElementById("hero"); // Select the 'Hero' Section
    const navBar = document.getElementById("navbar"); // Select the "Navegation Bar"

    // Toggle Light/Dark Mode
    themeToggle.addEventListener("click", function() {
        document.body.classList.toggle("light-mode"); // Toggles light mode on/off

        // Update the button icon based on the current theme
        themeToggle.innerText = document.body.classList.contains("light-mode") ? "🌙" : "🌞";
    });

    // Smoothly scroll to "About Me" when clicking "View My Work"
    scrollButton.addEventListener("click", function () {
        aboutSection.scrollIntoView({ behavior: "smooth" });
    });

    // Detect scroll position and highlight the corresponding navbar link
    window.addEventListener("scroll", () => {
        let current = ""; // Stores the ID of the currently visible section
        const heroBottom = heroSection.offsetHeight;
        const showNavBuffer = 150;

        if (window.scrollY > heroBottom - showNavBuffer) {
            navBar.classList.add("show");
            navBar.classList.remove("hidden");
        } else {
            navBar.classList.remove("show");
            navBar.classList.add("hidden");
        }       

        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust for navbar height
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id"); // Get the ID of the active section
            }
        });

        // Update the active class on navigation links
        navLinks.forEach(link => {
            link.classList.remove("active"); // Remove active class from all links
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active"); // Highlight the active section in the navbar
            }
        });
    });



    // Smoothly scroll to the top when the 'Home' link is clicked
    homeLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
    });
});
