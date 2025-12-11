// 1. Select the element we want to make sticky
const navbarContainer = document.getElementById("stickyNav");

// 2. Calculate the point at which it should become sticky.
// We get its initial distance from the top of the page.
// We subtract a small buffer (e.g., 30px) so it triggers just before it hits the top edge.
const stickyPoint = navbarContainer.offsetTop - 30;

// 3. Define the scroll function
function handleScroll() {
  // Check current scroll position of the window
  if (window.pageYOffset >= stickyPoint) {
    // If we scrolled past the point, add the sticky class
    navbarContainer.classList.add("sticky-mode");
  } else {
    // If we are back at the top, remove the sticky class
    navbarContainer.classList.remove("sticky-mode");
  }
}

// 4. Attach the function to the window scroll event
window.onscroll = function() {
    handleScroll();
};
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Functionality
    const stickyNav = document.getElementById('stickyNav');
    const header = document.querySelector('.main-header');
    
    // Get the bottom position of the header to determine when to stick the nav
    const stickyPoint = header.offsetHeight + 50; 

    function handleScroll() {
        if (window.scrollY > stickyPoint) {
            stickyNav.classList.add('sticky-mode');
        } else {
            stickyNav.classList.remove('sticky-mode');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 


    // 2. Mobile Menu Toggle Functionality
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const toggleIcon = menuToggle.querySelector('i');
    
    // Function to populate mobile menu from desktop nav
    function populateMobileMenu() {
        const desktopLinks = document.querySelectorAll('#stickyNav nav a');
        mobileMenu.innerHTML = ''; // Clear existing content
        desktopLinks.forEach(link => {
            const clone = link.cloneNode(true);
            mobileMenu.appendChild(clone);
        });
        
        // Add the CTA button to the bottom of the mobile menu
        const ctaButton = document.querySelector('.header-cta a').cloneNode(true);
        const ctaWrapper = document.createElement('div');
        ctaWrapper.style.padding = '15px 20px';
        ctaWrapper.appendChild(ctaButton);
        mobileMenu.appendChild(ctaWrapper);
    }

    populateMobileMenu(); // Populate on load

    menuToggle.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');
        
        // Change the icon from bars to close (X)
        if (isActive) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
        } else {
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
        }
    });


    // 3. Scroll Reveal Animation Functionality
    const revealElements = document.querySelectorAll('.reveal-element');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
});

const revealItems = document.querySelectorAll('.slide-left, .slide-right');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

revealItems.forEach(item => observer.observe(item));

// 1. Intersection Observer Logic for Scroll-In Animation
    document.addEventListener('DOMContentLoaded', () => {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is in view, make it visible
                    entry.target.classList.add('is-visible');
                    // Stop observing once visible to prevent re-triggering
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        // Select all elements that should reveal
        const revealElements = document.querySelectorAll('.reveal-element');
        
        // Observe each element
        revealElements.forEach(element => {
            observer.observe(element);
        });


        // 2. Mobile menu toggle logic
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const desktopMenu = document.getElementById('desktop-menu');

        // Populate mobile menu content initially
        // Replaces Tailwind-like classes with standard CSS properties for flexbox and spacing.
        const linksHtml = Array.from(desktopMenu.children).map(link => 
            `<a href="${link.getAttribute('href')}" style="display: block; padding: 0.75rem 1rem; margin: 0 1rem; border-radius: 0.5rem; font-family: 'Poppins', sans-serif; font-weight: 600; color: #4b5563; text-decoration: none;">${link.textContent}</a>`
        ).join('');
        
        mobileMenu.innerHTML = `<div style="display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem 0;">${linksHtml}</div>`;
        
        const allLinks = mobileMenu.querySelectorAll('a');
        allLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMobileMenu(true); // Pass true to force close
            });
        });


        function toggleMobileMenu(forceClose = false) {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            
            if (!isExpanded || forceClose) {
                mobileMenu.classList.add('menu-open');
                mobileMenuButton.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenu.classList.remove('menu-open');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        }

        mobileMenuButton.addEventListener('click', () => toggleMobileMenu(false));
    });


        
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.pop');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});
