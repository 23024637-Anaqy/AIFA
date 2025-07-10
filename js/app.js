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
    showNotification(`Searching for ${category} positions...`, 'success');
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
      this.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const contactData = {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        };
        
        showLoading();
        
        try {
          await this.submitContactForm(contactData);
          showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
          this.form.reset();
        } catch (error) {
          showNotification('Failed to send message. Please try again.', 'error');
        } finally {
          hideLoading();
        }
      });
    }
  }
  
  async submitContactForm(data) {
    // Simulate API call
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// ===== GLOBAL HELPER FUNCTIONS =====

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    word-wrap: break-word;
  `;
  
  // Set background color based on type
  const colors = {
    success: '#27AE60',
    error: '#E74C3C',
    info: '#3498DB',
    warning: '#F39C12'
  };
  
  notification.style.backgroundColor = colors[type] || colors.info;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Chat toggle function for the floating chat button
function toggleChat() {
  // This will interact with the Flowise widget
  const event = new CustomEvent('flowise-toggle');
  window.dispatchEvent(event);
}

// ===== INITIALIZATION =====

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  const navigation = new Navigation();
  const jobSearch = new JobSearch();
  const contactForm = new ContactForm();
  
  // Performance monitoring
  if ('performance' in window && 'measure' in performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
      }, 0);
    });
  }
  
  // Initialize tooltips for better UX
  const elements = document.querySelectorAll('[data-tooltip]');
  elements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
});

// Tooltip functions
function showTooltip(e) {
  const tooltipText = e.target.getAttribute('data-tooltip');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = tooltipText;
  tooltip.style.cssText = `
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    pointer-events: none;
    z-index: 1000;
    white-space: nowrap;
  `;
  
  document.body.appendChild(tooltip);
  
  const rect = e.target.getBoundingClientRect();
  tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
  tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
  
  e.target._tooltip = tooltip;
}

function hideTooltip(e) {
  if (e.target._tooltip) {
    e.target._tooltip.remove();
    delete e.target._tooltip;
  }
}