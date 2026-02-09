// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // Handle Add to Cart
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Item added to cart!');
        // Later you can integrate with a real cart system
    });
});

// Handle Buy Now
document.querySelectorAll('.buy-now-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Proceeding to checkout...');
        // Redirect to checkout page if available
        // window.location.href = "checkout.html";
    });
});

// Function to update cart count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = document.getElementById('cartCount');
  if (cartCount) cartCount.innerText = totalQty;
}

// Add to Cart
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.watch-info');
    const name = card.querySelector('h3').innerText;
    const price = card.querySelector('.price').innerText.replace('$','');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existing = cart.find(item => item.name === name);

    if(existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price: parseFloat(price), qty: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
  });
});


// Buy Now
document.querySelectorAll('.buy-now-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.watch-info');
    const name = card.querySelector('h3').innerText;
    const price = card.querySelector('.price').innerText.replace('$','');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existing = cart.find(item => item.name === name);

    if(existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price: parseFloat(price), qty: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Small animation on Buy Now button
    e.target.classList.add('pulse');
    setTimeout(() => e.target.classList.remove('pulse'), 300);

    // Redirect to cart page
    window.location.href = "cart.html";
  });
});

// Update cart count when page loads
document.addEventListener('DOMContentLoaded', updateCartCount);

    // Initialize slider
    initializeSlider();

    // Initialize filters
    initializeFilters();

    // Initialize contact form
    initializeContactForm();

    // Initialize scroll animations
    initializeScrollAnimations();

    // Hero CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            window.location.href = 'collection.html';
        });
    }
});

// Watch Slider Functionality
function initializeSlider() {
    const slider = document.getElementById('watchSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!slider) return;

    const cards = slider.querySelectorAll('.watch-card');
    const cardWidth = 350 + 32; // card width + gap
    let currentIndex = 0;
    let maxIndex = Math.max(0, cards.length - Math.floor(slider.parentElement.offsetWidth / cardWidth));

    // Create dots
    if (dotsContainer) {
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const translateX = -currentIndex * cardWidth;
        slider.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        if (dotsContainer) {
            dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Update button states
        if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        if (nextBtn) nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(maxIndex, index));
        updateSlider();
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
function renderCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');
  cartItems.innerHTML = '';
  let total = 0;
  let totalQty = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<tr><td colspan="5">🛒 Your cart is empty.</td></tr>`;
    cartTotal.innerText = "0.00";
    if (cartCount) cartCount.innerText = "0";
    return;
  }

  cart.forEach((item, index) => {
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <div class="qty-controls">
          <button class="qty-btn minus" data-index="${index}">-</button>
          <input type="number" value="${item.qty}" min="1" data-index="${index}" class="qty-input">
          <button class="qty-btn plus" data-index="${index}">+</button>
        </div>
      </td>
      <td>$${(item.price * item.qty).toFixed(2)}</td>
      <td><button class="remove-btn" data-index="${index}"><i class="fas fa-trash"></i></button></td>
    `;
    cartItems.appendChild(row);
    total += item.price * item.qty;
    totalQty += item.qty;
  });

  cartTotal.innerText = total.toFixed(2);
  if (cartCount) cartCount.innerText = totalQty;
}

function updateQty(index, qty) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  qty = parseInt(qty);
  if (qty < 1) qty = 1; // prevent 0 or negative
  cart[index].qty = qty;
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  // Quantity Buttons
  document.getElementById('cartItems').addEventListener('click', (e) => {
    if (e.target.classList.contains('plus')) {
      const index = e.target.dataset.index;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      updateQty(index, cart[index].qty + 1);
    }
    if (e.target.classList.contains('minus')) {
      const index = e.target.dataset.index;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      updateQty(index, cart[index].qty - 1);
    }
    if (e.target.classList.contains('remove-btn') || e.target.closest('.remove-btn')) {
      const index = e.target.dataset.index || e.target.closest('.remove-btn').dataset.index;
      removeItem(index);
    }
  });

  // Quantity Input (manual typing)
  document.getElementById('cartItems').addEventListener('change', (e) => {
    if (e.target.classList.contains('qty-input')) {
      const index = e.target.dataset.index;
      updateQty(index, e.target.value);
    }
  });

  // Clear Cart Button
  const clearBtn = document.querySelector('.clear-cart-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to clear the cart?")) {
        clearCart();
      }
    });
  }

  // Checkout Button
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      alert("✅ Checkout successful! (Demo mode)\nThank you for shopping.");
      clearCart();
      // Or redirect: window.location.href = "checkout.html";
    });
  }
});

    // Auto-play slider
    let autoPlayInterval = setInterval(nextSlide, 5000);

    // Pause auto-play on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    slider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        maxIndex = Math.max(0, cards.length - Math.floor(slider.parentElement.offsetWidth / cardWidth));
        currentIndex = Math.min(currentIndex, maxIndex);
        updateSlider();
    });

    // Initialize
    updateSlider();

    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        clearInterval(autoPlayInterval);
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Only trigger if horizontal swipe is longer than vertical
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                nextSlide();
            } else if (diffX < -50) {
                prevSlide();
            }
        }

        autoPlayInterval = setInterval(nextSlide, 5000);
    });
}

// Filter Functionality for Collection Page
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const watchItems = document.querySelectorAll('.watch-item');

    if (filterButtons.length === 0 || watchItems.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            watchItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });

            // Animate visible items
            setTimeout(() => {
                watchItems.forEach(item => {
                    if (!item.classList.contains('hidden')) {
                        item.style.animation = 'fadeInUp 0.6s ease forwards';
                    }
                });
            }, 100);
        });
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Validate form
        if (!validateForm(data)) {
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function validateForm(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.subject) {
        errors.push('Please select a subject');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }

    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.watch-card, .brand-item, .value-item, .team-member, .service-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
});

// Watch card interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('buy-btn') || e.target.textContent === 'View Details') {
        e.preventDefault();
        
        // Get watch info
        const watchCard = e.target.closest('.watch-card');
        const watchName = watchCard.querySelector('h3').textContent;
        const watchBrand = watchCard.querySelector('.brand').textContent;
        const watchPrice = watchCard.querySelector('.price').textContent;
        
        // Create modal or alert with watch details
        const message = `
Watch Details:
${watchName}
Brand: ${watchBrand}
Price: ${watchPrice}

Would you like to inquire about this watch?
        `;
        
        if (confirm(message)) {
            // Redirect to contact page with pre-filled information
            const contactUrl = `contact.html?watch=${encodeURIComponent(watchName)}&brand=${encodeURIComponent(watchBrand)}`;
            window.location.href = contactUrl;
        }
    }
});

// Pre-fill contact form if coming from watch inquiry
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const watchName = urlParams.get('watch');
    const watchBrand = urlParams.get('brand');
    
    if (watchName && watchBrand) {
        const subjectSelect = document.getElementById('subject');
        const messageTextarea = document.getElementById('message');
        
        if (subjectSelect) {
            subjectSelect.value = 'purchase';
        }
        
        if (messageTextarea) {
            messageTextarea.value = `I am interested in the ${watchName} by ${watchBrand}. Could you please provide more information about availability and pricing?`;
        }
    }
});

// Utility function for smooth transitions
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = progress;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
    const start = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = 1 - progress;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance optimization - lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Arrow keys for slider navigation
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn && document.activeElement.closest('.slider-container')) {
            prevBtn.click();
        }
    }
    
    if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn && document.activeElement.closest('.slider-container')) {
            nextBtn.click();
        }
    }
});

// Add accessibility improvements
function enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (button.classList.contains('slider-btn')) {
            button.setAttribute('aria-label', button.classList.contains('prev-btn') ? 'Previous slide' : 'Next slide');
        }
        if (button.classList.contains('filter-btn')) {
            button.setAttribute('aria-label', `Filter by ${button.textContent}`);
        }
    });
    
    // Add role attributes where needed
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.setAttribute('role', 'region');
        sliderContainer.setAttribute('aria-label', 'Featured watches carousel');
    }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

