// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNavigation = document.querySelector('.main-navigation');
    
    if (mobileMenuToggle && mainNavigation) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNavigation.classList.toggle('active');
            // update aria-expanded for accessibility
            const expanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
        });
    }
    
    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Calculate the correct slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Show the current slide and activate the corresponding dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Function to show next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Function to show previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Set up event listeners for slider controls
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }
    
    // Set up event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSlideInterval();
        });
    });
    
    // Auto-advance slides
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Start the auto-advance
    startSlideInterval();
    
    // Pause auto-advance when hovering over slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        heroSlider.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
    }
    
    // Animated Counter for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    // Intersection Observer for stats animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const impactSection = document.querySelector('.impact-section');
    if (impactSection) {
        observer.observe(impactSection);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNavigation.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    mainNavigation.classList.remove('active');
                }
            }
        });
    });
	// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Toggle current item if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
    
    // Donation Amount Selection
    const amountOptions = document.querySelectorAll('.amount-option');
    const donationAmountInput = document.getElementById('donation-amount');
    
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (this.classList.contains('custom')) {
                // For custom amount, focus the input
                if (donationAmountInput) {
                    donationAmountInput.focus();
                }
            } else {
                // Set the amount from data attribute
                const amount = this.getAttribute('data-amount');
                if (donationAmountInput && amount) {
                    donationAmountInput.value = amount;
                }
                
                // Update active state
                amountOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Form Submission Handling
    const donationForm = document.querySelector('.donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, you would process the payment here
            alert('Thank you for your donation! This would process the payment in a real implementation.');
        });
    }
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    const volunteerForm = document.querySelector('.volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your interest in volunteering! We will review your application and contact you soon.');
            this.reset();
        });
    }
});
    
    // Form submission handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real implementation, you would send this to a server
            alert(`Thank you for subscribing with: ${email}`);
            this.reset();
        });
    }
});
// Form functionality for Take Action page
document.addEventListener('DOMContentLoaded', function() {
    // Donation amount selection
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmountInput = document.getElementById('custom-amount');
    
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (this.classList.contains('custom')) {
                // For custom amount, focus the input
                if (customAmountInput) {
                    customAmountInput.focus();
                }
            } else {
                // Set the amount from data attribute
                const amount = this.getAttribute('data-amount');
                
                // Update active state
                amountOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Form submission handling
    const donationForm = document.querySelector('.donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Get selected amount
            let amount = '';
            const activeOption = document.querySelector('.amount-option.active');
            if (activeOption && !activeOption.classList.contains('custom')) {
                amount = activeOption.getAttribute('data-amount');
            } else if (customAmountInput && customAmountInput.value) {
                amount = customAmountInput.value;
            }
            
            const frequency = document.getElementById('donation-frequency').value;
            const program = document.getElementById('program-select').value;
            
            // In a real implementation, you would process the payment here
            alert(`Thank you for your donation of $${amount} (${frequency}) to ${program || 'where needed most'}! This would process the payment in a real implementation.`);
        });
    }
    
    const volunteerForm = document.querySelector('.volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your volunteer application! We will review your information and contact you soon.');
            this.reset();
        });
    }
    
    // Social share buttons
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.textContent.replace('Share on ', '').toLowerCase();
            let shareUrl = '';
            const pageUrl = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Join me in supporting Hope Link Charity - creating lasting change in vulnerable communities');
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${pageUrl}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with: ${email}`);
            this.reset();
        });
    }
});
// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Toggle current item if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
    
    // Donation Amount Selection
    const amountOptions = document.querySelectorAll('.amount-option');
    const donationAmountInput = document.getElementById('donation-amount');
    
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (this.classList.contains('custom')) {
                // For custom amount, focus the input
                if (donationAmountInput) {
                    donationAmountInput.focus();
                }
            } else {
                // Set the amount from data attribute
                const amount = this.getAttribute('data-amount');
                if (donationAmountInput && amount) {
                    donationAmountInput.value = amount;
                }
                
                // Update active state
                amountOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Form Submission Handling
    const donationForm = document.querySelector('.donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, you would process the payment here
            alert('Thank you for your donation! This would process the payment in a real implementation.');
        });
    }
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    const volunteerForm = document.querySelector('.volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your interest in volunteering! We will review your application and contact you soon.');
            this.reset();
        });
    }
});
// Team Slider Functionality - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    const teamSlider = document.querySelector('.team-slider');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.dot');
    const teamMembers = document.querySelectorAll('.team-member');
    
    if (!teamSlider || !prevButton || !nextButton) return;
    
    let currentSlide = 0;
    let slidesToShow = getSlidesToShow();
    const totalSlides = teamMembers.length;
    let totalSlidesGroups = Math.ceil(totalSlides / slidesToShow);
    let autoSlideInterval;
    
    function getSlidesToShow() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }
    
    function updateSlider() {
        // Calculate the width of each slide including gap
        const slideWidth = 100 / slidesToShow;
        const gapPercentage = (2 / slidesToShow); // 2rem gap converted to percentage approximation
        const translateX = -currentSlide * 100; // Move by 100% for each slide group
        
        teamSlider.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === totalSlidesGroups - 1;
    }
    
    function nextSlide() {
        if (currentSlide < totalSlidesGroups - 1) {
            currentSlide++;
            updateSlider();
        } else {
            // Loop back to first slide
            currentSlide = 0;
            updateSlider();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        } else {
            // Loop to last slide
            currentSlide = totalSlidesGroups - 1;
            updateSlider();
        }
    }
    
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlidesGroups) {
            currentSlide = slideIndex;
            updateSlider();
        }
    }
    
    // Event Listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
    
    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 4000); // Change slide every 4 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause auto-slide on hover
    const teamSliderContainer = document.querySelector('.team-slider-container');
    if (teamSliderContainer) {
        teamSliderContainer.addEventListener('mouseenter', stopAutoSlide);
        teamSliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Handle window resize
    function handleResize() {
        const newSlidesToShow = getSlidesToShow();
        if (newSlidesToShow !== slidesToShow) {
            slidesToShow = newSlidesToShow;
            totalSlidesGroups = Math.ceil(totalSlides / slidesToShow);
            
            // Update dots based on new total
            updateDots();
            
            // Reset to first slide
            currentSlide = 0;
            updateSlider();
        }
    }
    
    function updateDots() {
        const dotsContainer = document.querySelector('.slider-dots');
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlidesGroups; i++) {
                const dot = document.createElement('span');
                dot.className = `dot ${i === 0 ? 'active' : ''}`;
                dot.setAttribute('data-slide', i);
                dot.addEventListener('click', function() {
                    goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initialize slider and dots
    updateDots();
    updateSlider();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
});