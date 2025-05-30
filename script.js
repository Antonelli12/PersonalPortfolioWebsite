document.addEventListener('DOMContentLoaded', () => {
    /* ----------  DOM references  ---------- */
    const themeToggle  = document.getElementById('theme-toggle');
    const scrollBtn    = document.getElementById('scroll-button');
    const heroSection  = document.getElementById('hero');
    const homeLink     = document.querySelector("a[href='#hero']");  
    const aboutSection = document.getElementById('about');
    const navBar       = document.getElementById('top-navbar');
    const navLinks     = document.querySelectorAll('#top-navbar .nav-item');
  
    const allsections = [heroSection, ...document.querySelectorAll('section')]; 
  
    const projectGrid = document.getElementById('project-grid');
    const toggleBtn   = document.getElementById('toggle-projects');
  
    const form        = document.getElementById('contact-form');
    const submitBtn   = document.getElementById('submit');
  
  
    /* ---------- Theme toggle (🌞 ↔ 🌙) ---------- */
    themeToggle?.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      themeToggle.textContent =
        document.body.classList.contains('light-mode') ? '🌙' : '🌞';
    });
  
  
    /* ---------- Smooth‑scroll helpers ---------- */
    scrollBtn?.addEventListener('click', () => {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  
    homeLink?.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    /* ---------- Hero Greeting Phrase Rotation + Typewriter Effect ---------- */
    const normalPhrases = [
      "an aspiring Red Team Operator.",
      "on a mission to master offensive security.",
      "I am building skills to breach any system! ... legally"
    ];

    const heroLine = document.querySelector("#hero h1");
    const staticPrefix = `Hello there! I'm <span class="highlight">Gus</span>, `;
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let delay = 90;
    let showCounter = 0;
    let isKenobi = false;
    let kenobiState = 0;
    let currentPhrase = normalPhrases[0];
    let visible = "";
    
    // Easter egg message
    function typeWriter() {
      if (isKenobi) {
        switch (kenobiState) {
          case 0: { // Write 
            const text = "Hello there.";
            visible = text.slice(0, letterIndex);
            heroLine.innerHTML = `<span id="kenobi-line-1">${visible}</span>`;
            if (!isDeleting && letterIndex < text.length) {
              letterIndex++;
              delay = 90;
            } else {
              letterIndex = 0;
              kenobiState = 1;
              delay = 1000;
            }
            break;
          }

          case 1: { // Type
            const text = "General Kenobi.";
            visible = text.slice(0, letterIndex);
            const typedHTML = visible.replace("Kenobi", `<span class="highlight">Kenobi</span>`);
            heroLine.innerHTML = `
              <span id="kenobi-line-1">Hello there.</span><br>
              <span id="kenobi-line-2">${typedHTML}</span>
            `;
            if (!isDeleting && letterIndex < text.length) {
              letterIndex++;
              delay = 90;
            } else {
              letterIndex = text.length;
              kenobiState = 2;
              isDeleting = true;
              delay = 1500;
            }
            break;
          }

          case 2: { // Delete
            const text = "General Kenobi.";
            visible = text.slice(0, letterIndex);
            const typedHTML = visible.replace("Kenobi", `<span class="highlight">Kenobi</span>`);
            heroLine.innerHTML = `
              <span id="kenobi-line-1">Hello there.</span><br>
              <span id="kenobi-line-2">${typedHTML}</span>
            `;
            if (letterIndex > 0) {
              letterIndex--;
              delay = 40;
            } else {
              isDeleting = false;
              kenobiState = 3;
              delay = 500;
            }
            break;
          }

          case 3: { // Type 
            const text = "You are a bold one.";
            visible = text.slice(0, letterIndex);
            const typedHTML = visible.replace("bold", `<span class="highlight">bold</span>`);
            heroLine.innerHTML = `
              <span id="kenobi-line-1">Hello there.</span><br>
              <span id="kenobi-line-2">${typedHTML}</span>
            `;
            if (!isDeleting && letterIndex < text.length) {
              letterIndex++;
              delay = 90;
            } else {
              letterIndex = text.length;
              kenobiState = 4;
              delay = 2000;
            }
            break;
          }

          case 4: { // Delete everything
            heroLine.innerHTML = `<span id="typed-text"></span>`;
            isKenobi = false;
            kenobiState = 0;
            letterIndex = 0;
            currentPhrase = normalPhrases[phraseIndex];
            delay = 500;
            break;
          }
        }

        setTimeout(typeWriter, delay);
        return;
      }

      // Standard phrase typing
      visible = currentPhrase.slice(0, letterIndex);
      heroLine.innerHTML = `${staticPrefix}<span id="typed-text">${visible}</span>`;

      if (!isDeleting && letterIndex < currentPhrase.length) {
        letterIndex++;
        delay = visible.endsWith("...") ? 1000 : 90;
      } else if (isDeleting && letterIndex > 0) {
        letterIndex--;
        delay = 40;
      } else {
        if (!isDeleting) {
          isDeleting = true;
          delay = 2000;
        } else {
          isDeleting = false;
          showCounter++;

          if (showCounter >= 12) {
            isKenobi = true;
            kenobiState = 0;
            letterIndex = 0;
            showCounter = 0;
            delay = 600;
          } else {
            phraseIndex = (phraseIndex + 1) % normalPhrases.length;
            currentPhrase = normalPhrases[phraseIndex];
            letterIndex = 0;
            delay = 500;
          }
        }
      }

      setTimeout(typeWriter, delay);
    }

    typeWriter();


    /* ---------- Navbar Visibility + Active Section ---------- */
    const topNav = document.getElementById("top-navbar");
    const topNavLinks = document.querySelectorAll("#top-navbar .nav-item");
    const allSections = [heroSection, ...document.querySelectorAll("section")];

    //  Show/hide navbar when scrolling past the hero
    function handleNavbarVisibility() {
    const scrollY = window.scrollY;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    topNav.classList.toggle("visible", scrollY > heroBottom - 150);
    }

    //  Highlight section closest to top
    function handleActiveLink() {
      let currentId = "";
      let bestTop = -Infinity;

      for (const section of allSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.top > bestTop) {
          bestTop = rect.top;
          currentId = section.id;
        }
      }

      // If you're near the bottom and contact is on screen, force highlight it
      const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10);
      const contactInView = document.getElementById("contact").getBoundingClientRect().top < window.innerHeight;

      if (nearBottom && contactInView) {
        currentId = "contact";
      }

      topNavLinks.forEach(link => {
        const hrefId = link.getAttribute("href")?.replace("#", "");
        link.classList.toggle("active", hrefId === currentId);
      });
    }

    //  Scroll event
    function handleScroll() {
      handleNavbarVisibility();
      handleActiveLink();
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    /* ---------- Project grid Expand / Collapse ---------- */
    toggleBtn?.addEventListener('click', () => {
      const expanded = projectGrid.classList.toggle('expanded');
      projectGrid.classList.toggle('collapsed', !expanded);
  
      toggleBtn.textContent = expanded ? 'Collapse View' : 'Expand View';
    });

  
    /* ---------- Contact‑form submission ---------- */
    form?.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent page reload

      // Disable + change button
      submit.disabled = true;
      submit.textContent = "✓ Message Sent";

      // Collect form data
      const formData = new FormData(form);

      // Send data to Formspree
      try {
        const response = await fetch("https://formspree.io/f/xqapvgwb", {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          form.reset();
        } else {
          submit.textContent = "Error. Try Again?";
        }

      } catch (err) {
        console.error(err);
        submit.textContent = "Error. Try Again?";
      }

      // Revert button after 5s
      setTimeout(() => {
        submit.disabled = false;
        submit.textContent = "Submit";
      }, 5000);
    });
});
  
