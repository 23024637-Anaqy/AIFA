// ===== F&Business - Main JavaScript Application =====

// Global configuration
const CONFIG = {
  // Flowise Configuration - Now Integrated!
  flowise: {
    chatflowId: '2cebf570-9709-4e24-95f9-8d7e20f22c61', // Your actual chatflow ID
    apiHost: 'https://drkusanagi-flowise.hf.space', // Your Flowise instance
    status: 'active' // Integration is live!
  },
  
  // Animation settings
  animation: {
    duration: 300,
    easing: 'ease-in-out'
  },
  
  // API endpoints (mock for demo)
  api: {
    baseUrl: 'https://api.fnbusiness.com',
    endpoints: {
      jobs: '/api/jobs',
      contact: '/api/contact',
      subscribe: '/api/subscribe'
    }
  }
};

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Smooth scroll to element
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const elementPosition = element.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}

// Show loading spinner
function showLoading() {
  const spinner = document.querySelector('.loading-spinner');
  if (spinner) {
    spinner.classList.add('active');
    spinner.setAttribute('aria-hidden', 'false');
  }
}

// Hide loading spinner
function hideLoading() {
  const spinner = document.querySelector('.loading-spinner');
  if (spinner) {
    spinner.classList.remove('active');
    spinner.setAttribute('aria-hidden', 'true');
  }
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
      <button class="notification-close" aria-label="Close notification">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1060;
    background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB'};
    color: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: translateX(400px);
    transition: transform 0.3s ease-in-out;
    max-width: 400px;
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Add close event
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  });
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// ===== NAVIGATION FUNCTIONALITY =====

class Navigation {
  constructor() {
    this.header = document.querySelector('.header');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-menu a');
    
    this.init();
  }
  
  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupActiveLinks();
    this.setupKeyboardNavigation();
  }
  
  setupScrollEffect() {
    const scrollHandler = throttle(() => {
      const scrolled = window.scrollY > 100;
      this.header.style.background = scrolled 
        ? 'rgba(255, 255, 255, 0.98)' 
        : 'rgba(255, 255, 255, 0.95)';
      this.header.style.borderBottom = scrolled 
        ? '1px solid rgba(45, 90, 39, 0.2)' 
        : '1px solid rgba(45, 90, 39, 0.1)';
    }, 16);
    
    window.addEventListener('scroll', scrollHandler);
  }
  
  setupMobileMenu() {
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => {
        const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
        
        this.navToggle.setAttribute('aria-expanded', !isExpanded);
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Update nav-menu position for mobile
        if (window.innerWidth <= 768) {
          this.navMenu.style.top = !isExpanded ? '100%' : '-100%';
        }
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
          this.closeMenu();
        }
      });
      
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMenu();
        }
      });
    }
  }
  
  setupActiveLinks() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        scrollToSection(targetId);
        this.closeMenu();
      });
    });
    
    // Update active link on scroll
    const updateActiveLink = throttle(() => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, 100);
    
    window.addEventListener('scroll', updateActiveLink);
  }
  
  setupKeyboardNavigation() {
    this.navLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const nextIndex = (index + 1) % this.navLinks.length;
          this.navLinks[nextIndex].focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevIndex = (index - 1 + this.navLinks.length) % this.navLinks.length;
          this.navLinks[prevIndex].focus();
        }
      });
    });
  }
  
  closeMenu() {
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    this.navMenu.style.top = '-100%';
  }
}

// ===== JOB SEARCH FUNCTIONALITY =====

class JobSearch {
  constructor() {
    this.form = document.querySelector('.job-search-form');
    this.categoryCards = document.querySelectorAll('.category-card');
    
    this.init();
  }
  
  init() {
    this.setupSearchForm();
    this.setupCategoryCards();
    this.setupSearchSuggestions();
  }
  
  setupSearchForm() {
    if (this.form) {
      this.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const searchData = {
          jobTitle: document.getElementById('job-title').value,
          location: document.getElementById('location').value,
          jobType: document.getElementById('job-type').value
        };
        
        showLoading();
        
        try {
          // Simulate API call
          await this.simulateJobSearch(searchData);
          showNotification('Search completed! Found 150+ matching jobs.', 'success');
        } catch (error) {
          showNotification('Search failed. Please try again.', 'error');
        } finally {
          hideLoading();
        }
      });
    }
  }
  
  setupCategoryCards() {
    this.categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const category = card.querySelector('h4').textContent;
        this.searchByCategory(category);
      });
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }
  
  setupSearchSuggestions() {
    const jobTitleInput = document.getElementById('job-title');
    const locationInput = document.getElementById('location');
    
    if (jobTitleInput) {
      const debouncedSuggestions = debounce((value) => {
        this.showJobSuggestions(value, jobTitleInput);
      }, 300);
      
      jobTitleInput.addEventListener('input', (e) => {
        if (e.target.value.length > 2) {
          debouncedSuggestions(e.target.value);
        }
      });
    }
    
    if (locationInput) {
      const debouncedLocationSuggestions = debounce((value) => {
        this.showLocationSuggestions(value, locationInput);
      }, 300);
      
      locationInput.addEventListener('input', (e) => {
        if (e.target.value.length > 2) {
          debouncedLocationSuggestions(e.target.value);
        }
      });
    }
  }
  
  async simulateJobSearch(searchData) {
    // Simulate API delay
    return new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  searchByCategory(category) {
    const jobTitleInput = document.getElementById('job-title');
    if (jobTitleInput) {
      jobTitleInput.value = category;
      jobTitleInput.focus();
    }
    showNotification(`Searching for ${category} positions...`, 'info');
  }
  
  showJobSuggestions(query, input) {
    // Mock job suggestions
    const suggestions = [
      'Chef de Cuisine',
      'Sous Chef',
      'Line Cook',
      'Pastry Chef',
      'Restaurant Manager',
      'Server',
      'Bartender',
      'Host/Hostess',
      'Kitchen Manager',
      'Food & Beverage Director'
    ].filter(job => job.toLowerCase().includes(query.toLowerCase()));
    
    this.createSuggestionDropdown(suggestions, input);
  }
  
  showLocationSuggestions(query, input) {
    // Mock location suggestions
    const suggestions = [
      'New York, NY',
      'Los Angeles, CA',
      'Chicago, IL',
      'Miami, FL',
      'Las Vegas, NV',
      'San Francisco, CA',
      'Boston, MA',
      'Seattle, WA'
    ].filter(location => location.toLowerCase().includes(query.toLowerCase()));
    
    this.createSuggestionDropdown(suggestions, input);
  }
  
  createSuggestionDropdown(suggestions, input) {
    // Remove existing dropdown
    const existingDropdown = document.querySelector('.suggestions-dropdown');
    if (existingDropdown) {
      existingDropdown.remove();
    }
    
    if (suggestions.length === 0) return;
    
    const dropdown = document.createElement('div');
    dropdown.className = 'suggestions-dropdown';
    dropdown.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #E0E6ED;
      border-top: none;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 1000;
      max-height: 200px;
      overflow-y: auto;
    `;
    
    suggestions.forEach(suggestion => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.textContent = suggestion;
      item.style.cssText = `
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 1px solid #F0F0F0;
        transition: background-color 0.2s;
      `;
      
      item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = '#F8F9FA';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = 'white';
      });
      
      item.addEventListener('click', () => {
        input.value = suggestion;
        dropdown.remove();
        input.focus();
      });
      
      dropdown.appendChild(item);
    });
    
    // Position dropdown relative to input
    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(dropdown);
    
    // Close dropdown when clicking outside
    setTimeout(() => {
      document.addEventListener('click', function closeDropdown(e) {
        if (!dropdown.contains(e.target) && e.target !== input) {
          dropdown.remove();
          document.removeEventListener('click', closeDropdown);
        }
      });
    }, 0);
  }
}

// ===== CONTACT FORM FUNCTIONALITY =====

class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.init();
  }
  
  init() {
    if (this.form) {
      this.setupFormValidation();
      this.setupFormSubmission();
    }
  }
  
  setupFormValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }
  
  setupFormSubmission() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (this.validateForm()) {
        showLoading();
        
        try {
          await this.submitForm();
          showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
          this.form.reset();
        } catch (error) {
          showNotification('Failed to send message. Please try again.', 'error');
        } finally {
          hideLoading();
        }
      }
    });
  }
  
  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required.';
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      }
    }
    
    // Name validation
    if (fieldName === 'name' && value && value.length < 2) {
      isValid = false;
      errorMessage = 'Name must be at least 2 characters long.';
    }
    
    // Message validation
    if (fieldName === 'message' && value && value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters long.';
    }
    
    this.showFieldError(field, errorMessage);
    return isValid;
  }
  
  validateForm() {
    const fields = this.form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = message ? 'block' : 'none';
    }
    
    field.style.borderColor = message ? '#E74C3C' : '#E0E6ED';
  }
  
  clearError(field) {
    this.showFieldError(field, '');
  }
  
  async submitForm() {
    // Simulate form submission
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// ===== FLOWISE AI INTEGRATION =====

class FlowiseIntegration {
  constructor() {
    this.chatContainer = document.getElementById('flowise-chat');
    this.chatFab = document.querySelector('.chat-fab');
    this.isInitialized = false;
    
    this.init();
  }
  
  init() {
    this.loadFlowiseScript();
    this.setupChatFab();
  }
  
  async loadFlowiseScript() {
    try {
      // Flowise is already loaded via module script in HTML
      // Just initialize the integration immediately
      this.isInitialized = true;
      console.log('Flowise chatbot is ready via module import');
      
      // Update the chat container to show it's ready
      if (this.chatContainer) {
        this.chatContainer.innerHTML = `
          <div class="ai-ready-message">
            <div class="chat-header">
              <h3>🤖 AI Assistant Ready!</h3>
              <p>Your F&B career assistant is loaded and ready to help.</p>
            </div>
            <div class="chat-body">
              <div class="ready-message">
                <i class="fas fa-check-circle"></i>
                <h4>Chat is Active</h4>
                <p>Click the chat button in the bottom-right corner to start talking with your AI career assistant!</p>
                <div class="features-list">
                  <div class="feature">✅ Job search assistance</div>
                  <div class="feature">✅ Career guidance</div>
                  <div class="feature">✅ Interview preparation</div>
                  <div class="feature">✅ Salary negotiation tips</div>
                </div>
              </div>
            </div>
          </div>
        `;
        
        // Add ready styles
        const style = document.createElement('style');
        style.textContent = `
          .ai-ready-message {
            padding: 2rem;
            text-align: center;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          }
          .chat-header h3 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
          }
          .chat-header p {
            color: var(--text-secondary);
            margin-bottom: 2rem;
          }
          .ready-message {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .ready-message i {
            font-size: 3rem;
            color: var(--success-color);
            margin-bottom: 1rem;
          }
          .ready-message h4 {
            margin-bottom: 1rem;
            color: var(--text-primary);
          }
          .features-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
            margin: 1.5rem 0;
            text-align: left;
          }
          .feature {
            color: var(--text-secondary);
            font-size: 0.9rem;
          }
          @media (max-width: 768px) {
            .features-list {
              grid-template-columns: 1fr;
            }
          }
        `;
        document.head.appendChild(style);
      }
    } catch (error) {
      console.error('Error with Flowise integration:', error);
      this.initializeFallbackChat();
    }
  }
  
  initializeChatbot() {
    if (window.Chatbot && CONFIG.flowise.chatflowId && CONFIG.flowise.apiHost) {
      try {
        window.Chatbot.init({
          chatflowid: CONFIG.flowise.chatflowId,
          apiHost: CONFIG.flowise.apiHost,
          theme: CONFIG.flowise.theme
        });
        
        this.isInitialized = true;
        console.log('Flowise chatbot initialized successfully');
      } catch (error) {
        console.error('Error initializing Flowise chatbot:', error);
        this.initializeFallbackChat();
      }
    } else {
      this.initializeFallbackChat();
    }
  }
  
  initializeFallbackChat() {
    // Create a fallback chat interface
    if (this.chatContainer) {
      this.chatContainer.innerHTML = `
        <div class="fallback-chat">
          <div class="chat-header">
            <h3>AI Career Assistant</h3>
            <p>Connect with our Flowise AI for personalized career guidance</p>
          </div>
          <div class="chat-body">
            <div class="setup-message">
              <i class="fas fa-robot"></i>
              <h4>Setup Required</h4>
              <p>To enable the AI assistant, please configure your Flowise chatflow ID and API host in the app.js file.</p>
              <div class="setup-steps">
                <ol>
                  <li>Set up your Flowise instance</li>
                  <li>Create a chatflow for F&B career assistance</li>
                  <li>Update the CONFIG.flowise settings in app.js</li>
                </ol>
              </div>
              <button class="btn btn-primary" onclick="window.open('https://flowiseai.com', '_blank')">
                Learn About Flowise
              </button>
            </div>
          </div>
        </div>
      `;
      
      // Add fallback styles
      const style = document.createElement('style');
      style.textContent = `
        .fallback-chat {
          padding: 2rem;
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .chat-header h3 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        .chat-header p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        .setup-message {
          background: #F8F9FA;
          padding: 2rem;
          border-radius: 12px;
          border: 2px dashed #E0E6ED;
        }
        .setup-message i {
          font-size: 3rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }
        .setup-message h4 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        .setup-steps {
          text-align: left;
          margin: 1.5rem 0;
          background: white;
          padding: 1rem;
          border-radius: 8px;
        }
        .setup-steps ol {
          margin-left: 1rem;
        }
        .setup-steps li {
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  setupChatFab() {
    if (this.chatFab) {
      this.chatFab.addEventListener('click', () => {
        this.openAIAssistant();
      });
    }
  }
  
  openAIAssistant() {
    // Scroll to AI section first
    scrollToSection('ai-assistant');
    
    // Show notification that chat is ready
    if (this.isInitialized) {
      showNotification('💬 Your AI assistant is ready! Look for the chat button in the bottom-right corner.', 'success');
      
      // Highlight the chat button briefly
      const chatFab = document.querySelector('.chat-fab');
      if (chatFab) {
        chatFab.style.animation = 'pulse 1s ease-in-out 3';
        setTimeout(() => {
          chatFab.style.animation = '';
        }, 3000);
      }
    } else {
      showNotification('AI Assistant is loading... Please wait a moment.', 'info');
    }
  }
}

// ===== ANIMATIONS AND SCROLL EFFECTS =====

class AnimationController {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupParallaxEffects();
  }
  
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.category-card, .feature-item, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, this.observerOptions);
    
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  }
  
  setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, this.observerOptions);
    
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
  
  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = Date.now();
    const startValue = 0;
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (target - startValue) * easeOutQuart);
      
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target.toLocaleString();
      }
    };
    
    animate();
  }
  
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-visual, .about-visual');
    
    const parallaxHandler = throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(element => {
        if (isInViewport(element)) {
          element.style.transform = `translateY(${rate}px)`;
        }
      });
    }, 16);
    
    window.addEventListener('scroll', parallaxHandler);
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

class AccessibilityController {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupKeyboardNavigation();
    this.setupAriaLiveRegions();
    this.setupFocusManagement();
    this.setupReducedMotion();
  }
  
  setupKeyboardNavigation() {
    // Tab trap for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.handleTabNavigation(e);
      }
    });
    
    // Skip links
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      });
    });
  }
  
  setupAriaLiveRegions() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(liveRegion);
  }
  
  announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }
  
  setupFocusManagement() {
    // Visible focus indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }
  
  setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--transition-fast', '0.01ms');
      document.documentElement.style.setProperty('--transition-normal', '0.01ms');
      document.documentElement.style.setProperty('--transition-slow', '0.01ms');
    }
  }
  
  handleTabNavigation(e) {
    const focusableElements = document.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}

// ===== PERFORMANCE OPTIMIZATION =====

class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.setupResourceHints();
    this.monitorPerformance();
  }
  
  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }
  
  setupImageOptimization() {
    // WebP support detection
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('webp') > -1;
    };
    
    if (supportsWebP()) {
      document.body.classList.add('webp-support');
    }
  }
  
  setupResourceHints() {
    // Preload critical resources
    const criticalFonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap'
    ];
    
    criticalFonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = font;
      document.head.appendChild(link);
    });
  }
  
  monitorPerformance() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      // This would require importing web-vitals library
      // For now, we'll use basic performance monitoring
    }
    
    // Basic performance logging
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page load time: ${loadTime}ms`);
      
      if (loadTime > 3000) {
        console.warn('Page load time is slower than recommended (3 seconds)');
      }
    });
  }
}

// ===== GLOBAL FUNCTIONS (for HTML onclick handlers) =====

function openAIAssistant() {
  const flowiseIntegration = window.flowiseIntegration;
  if (flowiseIntegration) {
    flowiseIntegration.openAIAssistant();
  }
}

function toggleChat() {
  openAIAssistant();
}

// ===== INITIALIZATION =====

class App {
  constructor() {
    this.components = {};
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }
  
  initializeComponents() {
    try {
      // Initialize all components
      this.components.navigation = new Navigation();
      this.components.jobSearch = new JobSearch();
      this.components.contactForm = new ContactForm();
      this.components.flowiseIntegration = new FlowiseIntegration();
      this.components.animationController = new AnimationController();
      this.components.accessibilityController = new AccessibilityController();
      this.components.performanceOptimizer = new PerformanceOptimizer();
      
      // Make Flowise integration globally available
      window.flowiseIntegration = this.components.flowiseIntegration;
      
      // Setup global error handling
      this.setupErrorHandling();
      
      // Initialize service worker if available
      this.initializeServiceWorker();
      
      console.log('F&Business app initialized successfully');
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }
  
  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      // You could send this to an error reporting service
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      // You could send this to an error reporting service
    });
  }
  
  initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }
}

// Start the application
const app = new App();
