document.addEventListener('DOMContentLoaded', () => {
    /* ----------  DOM references  ---------- */
    const themeToggle  = document.getElementById('theme-toggle');
    const scrollBtn    = document.getElementById('scroll-button');
    const heroSection  = document.getElementById('hero');
    const homeLink     = document.querySelector("a[href='#hero']");  
    const aboutSection = document.getElementById('about');
    const navBar       = document.getElementById('navbar');
    const navLinks     = document.querySelectorAll('#navbar .nav-item');

  
    const sections = [heroSection, ...document.querySelectorAll('section')]; 
  
    const projectGrid = document.getElementById('project-grid');
    const toggleBtn   = document.getElementById('toggle-projects');
  
    const form        = document.getElementById('contact-form');
    const feedback    = document.getElementById('form-feedback');
  
  
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
    // HERO TYPEWRITER EFFECT — animates phrases in the hero headline
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

    function typeWriter() {
      if (isKenobi) {
        switch (kenobiState) {
          case 0: { // Write "Hello there."
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

          case 1: { // Type "General Kenobi." under it
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

          case 2: { // Delete "General Kenobi."
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

          case 3: { // Type "You are a bold one."
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
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollBottom = scrollY + viewportHeight;
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      
        // === A. Navbar appears slightly earlier ===
        if (scrollY > heroBottom - viewportHeight / 2) {
          navBar.classList.add('show');
          navBar.classList.remove('hidden');
        } else {
          navBar.classList.remove('show');
          navBar.classList.add('hidden');
        }
      
        // === B. Track visible section accurately ===
        let currentId = 'hero'; // default
      
        sections.forEach((section) => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
      
          const isInView =
            scrollY >= top - 200 && scrollY < top + height - 200;
      
          const atBottom =
            scrollBottom >= document.body.scrollHeight - 5 && section.id === 'contact';
      
          if (isInView || atBottom) {
            currentId = section.id;
          }
        });
      
        // === C. Highlight active nav link ===
        navLinks.forEach((link) => {
          const linkTarget = link.getAttribute('href')?.replace('#', '');
          link.classList.toggle('active', linkTarget === currentId);
        });
      });
      
  
    /* ---------- Project grid Expand / Collapse ---------- */
    toggleBtn?.addEventListener('click', () => {
      const expanded = projectGrid.classList.toggle('expanded');
      projectGrid.classList.toggle('collapsed', !expanded);
  
      toggleBtn.textContent = expanded ? 'Collapse View' : 'Expand View';
    });
    /* (duplicate listener removed) */
  
  
    /* ---------- Contact‑form submission ---------- */
    form?.addEventListener('submit', e => {
      feedback.style.display = 'block';    
      form.reset();                        
  
      setTimeout(() => (feedback.style.display = 'none'), 4000);
    });
  });
  
