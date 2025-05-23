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
  
  
    /* ---------- 1. Theme toggle (🌞 ↔ 🌙) ---------- */
    themeToggle?.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      themeToggle.textContent =
        document.body.classList.contains('light-mode') ? '🌙' : '🌞';
    });
  
  
    /* ---------- 2. Smooth‑scroll helpers ---------- */
    scrollBtn?.addEventListener('click', () => {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  
    homeLink?.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
  
    /* ---------- 3. Navbar Visibility + Active Section ---------- */
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
      
  
    /* ---------- 4. Project grid Expand / Collapse ---------- */
    toggleBtn?.addEventListener('click', () => {
      const expanded = projectGrid.classList.toggle('expanded');
      projectGrid.classList.toggle('collapsed', !expanded);
  
      toggleBtn.textContent = expanded ? 'Collapse View' : 'Expand View';
    });
    /* (duplicate listener removed) */
  
  
    /* ---------- 5. Contact‑form submission ---------- */
    form?.addEventListener('submit', e => {
      feedback.style.display = 'block';    
      form.reset();                        
  
      setTimeout(() => (feedback.style.display = 'none'), 4000);
    });
  });
  