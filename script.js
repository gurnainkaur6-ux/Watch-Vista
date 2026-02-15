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

// COMPLETE LuxuryCart System - 35+ Years Professional Implementation
class LuxuryCart {
    constructor() { this.cartKey = 'luxury_prime_cart_v2'; this.init(); }
    
    init() {
        this.renderCart();
        this.bindEvents();
        this.updateNavCount();
        this.persistCartState();
    }

    getCart() {
        try {
            const cart = JSON.parse(localStorage.getItem(this.cartKey)) || [];
            return cart.filter(item => item.qty > 0 && item.price > 0);
        } catch (e) {
            localStorage.removeItem(this.cartKey);
            return [];
        }
    }

    addItem(product) {
        const cart = this.getCart();
        const existing = cart.find(item => item.id === product.id);
        
        if (existing) {
            existing.qty += product.qty || 1;
        } else {
            cart.push({ ...product, id: product.id || Date.now(), addedAt: Date.now() });
        }
        
        this.saveCart(cart);
        this.showNotification(`${product.name} added to cart`, 'success');
        this.updateNavCount();
        this.animateCartIcon();
    }

    updateQty(index, qty) {
        const cart = this.getCart();
        const newQty = Math.max(1, parseInt(qty) || 1);
        
        if (cart[index]) {
            cart[index].qty = newQty;
            if (newQty < 1) cart.splice(index, 1);
            this.saveCart(cart);
            this.renderCart();
            this.updateNavCount();
        }
    }

    removeItem(index) {
        const cart = this.getCart();
        const item = cart[index];
        if (confirm(`Remove ${item.name}?`)) {
            cart.splice(index, 1);
            this.saveCart(cart);
            this.renderCart();
            this.updateNavCount();
            this.showNotification(`${item.name} removed`, 'warning');
        }
    }

    clearCart() {
        if (confirm('Clear entire cart?')) {
            localStorage.removeItem(this.cartKey);
            this.renderCart();
            this.updateNavCount();
            this.showNotification('Cart cleared', 'danger');
        }
    }

    saveCart(cart) {
        localStorage.setItem(this.cartKey, JSON.stringify(cart.filter(item => item.qty > 0)));
    }

    renderCart() {
        const cart = this.getCart();
        const tbody = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');
        
        if (!tbody || !totalEl) return;

        if (cart.length === 0) {
            tbody.innerHTML = `
                <tr><td colspan="5" style="text-align:center;padding:3rem;">
                    <i class="fas fa-shopping-cart" style="font-size:4rem;color:#666;"></i>
                    <p>Your cart is empty</p>
                    <a href="collection.html" class="cta-button">Shop Watches</a>
                </td></tr>`;
            totalEl.textContent = '0.00';
            return;
        }

        let total = 0;
        tbody.innerHTML = cart.map((item, index) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            return `
                <tr data-index="${index}">
                    <td>${item.name}<br><small style="color:#d4af37;">${item.brand}</small></td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <div style="display:flex;gap:0.5rem;align-items:center;">
                            <button class="qty-btn" data-index="${index}" style="background:#333;color:white;border:none;padding:0.3rem 0.8rem;">−</button>
                            <input type="number" value="${item.qty}" min="1" data-index="${index}" style="width:50px;text-align:center;border:1px solid #555;background:#111;color:white;">
                            <button class="qty-btn" data-index="${index}" style="background:#333;color:white;border:none;padding:0.3rem 0.8rem;">+</button>
                        </div>
                    </td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td><button class="remove-btn" data-index="${index}">✕</button></td>
                </tr>`;
        }).join('');
        totalEl.textContent = total.toFixed(2);
    }

    updateNavCount() {
        document.querySelectorAll('#cartCount').forEach(el => {
            const total = this.getCart().reduce((sum, item) => sum + item.qty, 0);
            el.textContent = total;
            el.style.display = total > 0 ? 'inline' : 'none';
        });
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.qty-btn')) {
                const index = e.target.dataset.index;
                const cart = this.getCart();
                const delta = e.target.textContent === '+' ? 1 : -1;
                this.updateQty(index, (cart[index]?.qty || 1) + delta);
            }
            if (e.target.matches('.remove-btn')) {
                this.removeItem(e.target.dataset.index);
            }
            if (e.target.matches('.add-to-cart-btn')) {
                const card = e.target.closest('.watch-card');
                const product = {
                    id: card.dataset.productId || Date.now(),
                    name: card.querySelector('h3')?.textContent || 'Watch',
                    brand: card.querySelector('.brand')?.textContent || '',
                    price: parseFloat(card.querySelector('.price')?.textContent.replace('$', '')) || 0,
                    qty: 1
                };
                this.addItem(product);
            }
        });
    }

    showNotification(msg, type = 'info') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position:fixed;top:100px;right:20px;z-index:10000;
            padding:1rem 1.5rem;border-radius:8px;color:white;font-weight:500;
            background:${type=='success'?'#28a745':'#ffc107'};box-shadow:0 4px 12px rgba(0,0,0,0.15);
            transform:translateX(400px);transition:all 0.3s ease;`;
        toast.textContent = msg;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.style.transform = 'translateX(0)');
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    animateCartIcon() {
        document.querySelectorAll('.cart-nav i').forEach(icon => {
            icon.style.animation = 'bounce 0.6s ease';
            setTimeout(() => icon.style.animation = '', 600);
        });
    }

    persistCartState() {
        window.addEventListener('beforeunload', () => {
            localStorage.setItem(`${this.cartKey}_timestamp`, Date.now());
        });
    }
}

// GLOBAL INIT - Works on ALL pages
document.addEventListener('DOMContentLoaded', () => {
    window.luxuryCart = new LuxuryCart();
    
    document.querySelector('.clear-cart-btn')?.addEventListener('click', () => luxuryCart.clearCart());
    document.querySelector('.checkout-btn')?.addEventListener('click', () => {
        const cart = luxuryCart.getCart();
        if (cart.length === 0) return luxuryCart.showNotification('Cart empty', 'warning');
        alert(`✅ Order confirmed: ${cart.reduce((sum,i)=>sum+i.qty,0)} items - $${luxuryCart.getCart().reduce((sum,i)=>sum+i.price*i.qty,0).toFixed(2)}`);
        luxuryCart.clearCart();
    });
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
