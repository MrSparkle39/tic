// Header HTML content
const headerHTML = `
    <header class="header">
        <div class="header-container">
            <div class="header-content">
                <div class="logo-container">
                    <a href="index.html">
                        <img src="logo.png" alt="The Inclusion Crew Logo" class="logo">
                    </a>
                </div>
                <nav class="nav">
                    <ul class="nav-menu">
                        <li><a href="index.html" class="nav-link" data-page="home">Home</a></li>
                        <li><a href="about.html" class="nav-link" data-page="about">About</a></li>
                        <li class="nav-dropdown">
                            <a href="services.html" class="nav-link" data-page="services">Services</a>
                            <div class="dropdown-content">
                                <a href="services.html#in-home-support">In Home Support</a>
                                <a href="services.html#personal-care">Personal Care</a>
                                <a href="services.html#community-participation">Community Participation</a>
                                <a href="services.html#mealtime-assistance">Mealtime Assistance</a>
                                <a href="services.html#medication-administration">Medication Administration</a>
                                <a href="services.html#wellness-check">Wellness Check</a>
                                <a href="services.html#transportation">Transportation</a>
                                <a href="services.html#domestic-assistance">Domestic Assistance</a>
                                <a href="services.html#shopping-assistance">Shopping Assistance</a>
                            </div>
                        </li>
                        <li><a href="contact.html" class="nav-link" data-page="contact">Contact</a></li>
                    </ul>
                    <button class="mobile-menu-toggle" aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </nav>
                <div class="header-right">
                    <img src="ndis-logo.png" alt="We Love NDIS Registered Provider" class="ndis-header-logo">
                    <a href="contact.html" class="cta-button">Get Started</a>
                </div>
            </div>
        </div>
    </header>
`;

// Insert header into page
document.addEventListener('DOMContentLoaded', function() {
    // Insert header HTML at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    
    // Set active page based on current URL
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const pageMap = {
        'index': 'home',
        '': 'home'
    };
    const activePage = pageMap[currentPage] || currentPage;
    
    // Set active class on current page link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === activePage) {
            link.classList.add('active');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        // Function to toggle menu
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        }
        
        // Add both click and touchstart for better mobile support
        mobileMenuToggle.addEventListener('click', toggleMenu);
        mobileMenuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            toggleMenu(e);
        }, { passive: false });
    }
    
    // Mobile dropdown toggle (for touch devices)
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    navDropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Close mobile menu when clicking a link (but not dropdown parent)
    const allNavLinks = document.querySelectorAll('.nav-link, .dropdown-content a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't close if it's a dropdown parent link on mobile
            if (window.innerWidth <= 768 && link.closest('.nav-dropdown') && link.classList.contains('nav-link') && !link.getAttribute('href').includes('#')) {
                return;
            }
            // Only close if it's not a dropdown toggle
            if (!(window.innerWidth <= 768 && link.closest('.nav-dropdown') && link.classList.contains('nav-link'))) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside (use setTimeout to avoid immediate closure)
    setTimeout(function() {
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && navMenu && mobileMenuToggle) {
                // Don't close if clicking the toggle button or inside the menu
                const isToggleButton = e.target.closest('.mobile-menu-toggle');
                const isInsideMenu = navMenu.contains(e.target);
                
                if (!isInsideMenu && !isToggleButton) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    }, 100);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header shadow on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
    });
});