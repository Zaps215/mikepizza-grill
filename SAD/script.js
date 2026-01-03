// ===== RESTAURANT WEBSITE - IMPROVED VERSION =====
// Comprehensive JavaScript for Mike's Pizza & Grill Redesign

// Configuration
const CONFIG = {
    itemsPerPage: 6,
    cartStorageKey: 'mikes_pizza_cart',
    favoritesStorageKey: 'mikes_pizza_favorites'
};

// ===== DOM ELEMENTS =====
const elements = {
    // Navigation
    menuToggle: document.querySelector('.menu-toggle'),
    navMenu: document.querySelector('.nav-menu'),
    
    // Menu System
    categoryButtons: document.querySelectorAll('.category-btn'),
    menuSearch: document.getElementById('menu-search'),
    searchClear: document.querySelector('.search-clear'),
    menuContainer: document.getElementById('menu-container'),
    loadMoreBtn: document.getElementById('load-more'),
    
    // Modals & Forms
    orderModal: document.getElementById('orderModal'),
    modalClose: document.querySelector('.modal-close'),
    contactForm: document.getElementById('contact-form'),
    
    // Cart
    cartFab: document.querySelector('.cart-fab'),
    cartCount: document.querySelector('.cart-count'),
    
    // Stats Counter
    statNumbers: document.querySelectorAll('.stat-number[data-count]'),
    
    // Testimonials
    testimonialContainer: document.querySelector('.testimonials-slider'),
    
    // Footer
    currentYear: document.getElementById('current-year')
};

// ===== MENU DATA =====
const menuData = {
    pizza: [
        {
            id: 1,
            name: "Pepperoni Classic",
            description: "Traditional pepperoni pizza with mozzarella cheese and our signature tomato sauce",
            price: 14.99,
            category: "pizza",
            tags: ["spicy", "popular"],
            rating: 4.8,
            calories: 285,
            prepTime: 20,
            image: "🍕"
        },
        {
            id: 2,
            name: "Margherita",
            description: "Fresh mozzarella, vine-ripened tomatoes, and basil on thin crust",
            price: 12.99,
            category: "pizza",
            tags: ["vegetarian", "fresh"],
            rating: 4.5,
            calories: 240,
            prepTime: 15,
            image: "🍕"
        },
        {
            id: 3,
            name: "Hawaiian Delight",
            description: "Ham, pineapple, mozzarella cheese with sweet and tangy sauce",
            price: 15.99,
            category: "pizza",
            tags: ["sweet", "family"],
            rating: 4.2,
            calories: 275,
            prepTime: 22,
            image: "🍕"
        },
        {
            id: 4,
            name: "Meat Lovers Feast",
            description: "Pepperoni, sausage, ham, bacon, and ground beef loaded with cheese",
            price: 17.99,
            category: "pizza",
            tags: ["spicy", "hearty", "popular"],
            rating: 4.9,
            calories: 350,
            prepTime: 25,
            image: "🍕"
        },
        {
            id: 5,
            name: "Veggie Supreme",
            description: "Mushrooms, bell peppers, onions, olives, tomatoes, and spinach",
            price: 13.99,
            category: "pizza",
            tags: ["vegetarian", "healthy"],
            rating: 4.3,
            calories: 220,
            prepTime: 18,
            image: "🍕"
        },
        {
            id: 6,
            name: "BBQ Chicken",
            description: "Grilled chicken, red onions, cilantro with smoky BBQ sauce",
            price: 16.99,
            category: "pizza",
            tags: ["spicy", "bbq"],
            rating: 4.7,
            calories: 295,
            prepTime: 20,
            image: "🍕"
        }
    ],
    pasta: [
        {
            id: 7,
            name: "Spaghetti Bolognese",
            description: "Traditional Italian meat sauce served with spaghetti pasta",
            price: 13.99,
            category: "pasta",
            tags: ["classic", "hearty"],
            rating: 4.6,
            calories: 320,
            prepTime: 15,
            image: "🍝"
        },
        {
            id: 8,
            name: "Fettuccine Alfredo",
            description: "Creamy Alfredo sauce with fettuccine pasta and parmesan",
            price: 12.99,
            category: "pasta",
            tags: ["creamy", "vegetarian"],
            rating: 4.4,
            calories: 380,
            prepTime: 12,
            image: "🍝"
        },
        {
            id: 9,
            name: "Lasagna",
            description: "Layers of pasta, meat sauce, and three cheeses baked to perfection",
            price: 14.99,
            category: "pasta",
            tags: ["baked", "hearty"],
            rating: 4.8,
            calories: 420,
            prepTime: 30,
            image: "🍝"
        }
    ],
    sides: [
        {
            id: 10,
            name: "Garlic Breadsticks",
            description: "Fresh baked breadsticks with garlic butter and herbs",
            price: 5.99,
            category: "sides",
            tags: ["vegetarian", "popular"],
            rating: 4.7,
            calories: 180,
            prepTime: 8,
            image: "🥖"
        },
        {
            id: 11,
            name: "Caesar Salad",
            description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan",
            price: 8.99,
            category: "sides",
            tags: ["vegetarian", "fresh"],
            rating: 4.3,
            calories: 150,
            prepTime: 5,
            image: "🥗"
        },
        {
            id: 12,
            name: "Mozzarella Sticks",
            description: "Breaded mozzarella cheese sticks served with marinara sauce",
            price: 7.99,
            category: "sides",
            tags: ["vegetarian", "fried"],
            rating: 4.5,
            calories: 280,
            prepTime: 10,
            image: "🧀"
        }
    ],
    drinks: [
        {
            id: 13,
            name: "Italian Soda",
            description: "Sparkling water with flavored syrup in assorted flavors",
            price: 3.99,
            category: "drinks",
            tags: ["refreshing", "sweet"],
            rating: 4.2,
            calories: 120,
            prepTime: 2,
            image: "🧃"
        },
        {
            id: 14,
            name: "Fresh Lemonade",
            description: "Homemade lemonade with fresh lemons and mint",
            price: 4.99,
            category: "drinks",
            tags: ["fresh", "refreshing"],
            rating: 4.6,
            calories: 110,
            prepTime: 3,
            image: "🍋"
        },
        {
            id: 15,
            name: "Craft Root Beer",
            description: "Handcrafted root beer with vanilla and spices",
            price: 4.49,
            category: "drinks",
            tags: ["craft", "classic"],
            rating: 4.4,
            calories: 150,
            prepTime: 1,
            image: "🍺"
        }
    ]
};

// ===== STATE MANAGEMENT =====
const state = {
    currentCategory: 'all',
    currentPage: 1,
    searchQuery: '',
    cart: [],
    favorites: new Set(),
    displayedItems: new Set()
};

// ===== INITIALIZATION =====
function init() {
    // Set current year in footer
    if (elements.currentYear) {
        elements.currentYear.textContent = new Date().getFullYear();
    }
    
    // Load saved state from localStorage
    loadSavedState();
    
    // Initialize components
    initNavigation();
    initMenuSystem();
    initModalSystem();
    initContactForm();
    initCartSystem();
    initStatsCounter();
    initTestimonials();
    
    // Initial render
    renderMenuItems();
    updateCartDisplay();
    
    // Add event listeners
    setupEventListeners();
    
    console.log('Mike\'s Pizza & Grill website initialized successfully!');
}

// ===== NAVIGATION =====
function initNavigation() {
    if (!elements.menuToggle || !elements.navMenu) return;
    
    elements.menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar') && 
            elements.navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function toggleMobileMenu() {
    const isExpanded = elements.menuToggle.getAttribute('aria-expanded') === 'true';
    elements.menuToggle.setAttribute('aria-expanded', !isExpanded);
    elements.navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
}

function closeMobileMenu() {
    elements.menuToggle.setAttribute('aria-expanded', 'false');
    elements.navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== MENU SYSTEM =====
function initMenuSystem() {
    // Category switching
    elements.categoryButtons.forEach(button => {
        button.addEventListener('click', handleCategorySwitch);
    });
    
    // Search functionality
    if (elements.menuSearch) {
        elements.menuSearch.addEventListener('input', handleSearch);
    }
    
    if (elements.searchClear) {
        elements.searchClear.addEventListener('click', clearSearch);
    }
    
    // Load more items
    if (elements.loadMoreBtn) {
        elements.loadMoreBtn.addEventListener('click', loadMoreItems);
    }
}

function handleCategorySwitch(event) {
    const button = event.currentTarget;
    const category = button.dataset.category;
    
    // Update active state
    elements.categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    
    // Update state and render
    state.currentCategory = category;
    state.currentPage = 1;
    state.displayedItems.clear();
    
    renderMenuItems();
    
    // Scroll to menu section
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

function handleSearch(event) {
    state.searchQuery = event.target.value.toLowerCase();
    state.currentPage = 1;
    state.displayedItems.clear();
    
    // Show/hide clear button
    if (elements.searchClear) {
        elements.searchClear.style.display = state.searchQuery ? 'block' : 'none';
    }
    
    renderMenuItems();
}

function clearSearch() {
    if (elements.menuSearch) {
        elements.menuSearch.value = '';
        state.searchQuery = '';
        state.currentPage = 1;
        state.displayedItems.clear();
        
        if (elements.searchClear) {
            elements.searchClear.style.display = 'none';
        }
        
        renderMenuItems();
    }
}

function getFilteredMenuItems() {
    let items = [];
    
    // Get items based on category
    if (state.currentCategory === 'all') {
        Object.values(menuData).forEach(categoryItems => {
            items.push(...categoryItems);
        });
    } else {
        items = menuData[state.currentCategory] || [];
    }
    
    // Apply search filter
    if (state.searchQuery) {
        items = items.filter(item => 
            item.name.toLowerCase().includes(state.searchQuery) ||
            item.description.toLowerCase().includes(state.searchQuery) ||
            item.tags.some(tag => tag.toLowerCase().includes(state.searchQuery))
        );
    }
    
    return items;
}

function renderMenuItems() {
    const items = getFilteredMenuItems();
    const startIndex = (state.currentPage - 1) * CONFIG.itemsPerPage;
    const endIndex = startIndex + CONFIG.itemsPerPage;
    const itemsToShow = items.slice(startIndex, endIndex);
    
    // Clear container if it's the first page
    if (state.currentPage === 1) {
        elements.menuContainer.innerHTML = '';
    }
    
    // Add items to container
    itemsToShow.forEach(item => {
        if (!state.displayedItems.has(item.id)) {
            const menuItem = createMenuItemElement(item);
            elements.menuContainer.appendChild(menuItem);
            state.displayedItems.add(item.id);
        }
    });
    
    // Update load more button visibility
    updateLoadMoreButton(items.length);
    
    // Update item count in category buttons
    updateCategoryCounts();
}

function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.dataset.id = item.id;
    div.dataset.category = item.category;
    
    // Format price
    const formattedPrice = item.price.toFixed(2);
    
    // Create tags HTML
    const tagsHTML = item.tags.map(tag => 
        `<span class="tag ${tag}">${tag}</span>`
    ).join('');
    
    // Create rating stars
    const ratingStars = createRatingStars(item.rating);
    
    // Check if item is in favorites
    const isFavorite = state.favorites.has(item.id);
    const favoriteIcon = isFavorite ? 'fas' : 'far';
    
    div.innerHTML = `
        <div class="item-image" role="img" aria-label="${item.name}">
            <span style="font-size: 3rem;">${item.image}</span>
        </div>
        <div class="item-content">
            <div class="item-header">
                <h3 class="item-title">${item.name}</h3>
                <span class="item-price">$${formattedPrice}</span>
            </div>
            <div class="item-rating">
                ${ratingStars}
                <span>(${item.rating})</span>
            </div>
            <p class="item-description">${item.description}</p>
            <div class="item-meta">
                <div class="item-tags">
                    ${tagsHTML}
                </div>
                <div class="item-info">
                    <small>${item.calories} cal • ${item.prepTime} min</small>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn-primary btn-add" data-id="${item.id}">
                    <i class="fas fa-cart-plus" aria-hidden="true"></i> Add to Cart
                </button>
                <button class="btn btn-favorite ${isFavorite ? 'active' : ''}" data-id="${item.id}" 
                        aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                    <i class="${favoriteIcon} fa-heart" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons
    const addButton = div.querySelector('.btn-add');
    const favoriteButton = div.querySelector('.btn-favorite');
    
    if (addButton) {
        addButton.addEventListener('click', () => addToCart(item));
    }
    
    if (favoriteButton) {
        favoriteButton.addEventListener('click', () => toggleFavorite(item.id, favoriteButton));
    }
    
    return div;
}

function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

function loadMoreItems() {
    state.currentPage++;
    renderMenuItems();
    
    // Scroll to newly loaded items
    const lastItem = elements.menuContainer.lastElementChild;
    if (lastItem) {
        lastItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function updateLoadMoreButton(totalItems) {
    if (!elements.loadMoreBtn) return;
    
    const displayedCount = state.displayedItems.size;
    const hasMoreItems = displayedCount < totalItems;
    
    elements.loadMoreBtn.style.display = hasMoreItems ? 'block' : 'none';
    
    if (hasMoreItems) {
        const remaining = totalItems - displayedCount;
        elements.loadMoreBtn.innerHTML = `
            <i class="fas fa-plus" aria-hidden="true"></i> 
            Load More (${remaining} remaining)
        `;
    }
}

function updateCategoryCounts() {
    elements.categoryButtons.forEach(button => {
        const category = button.dataset.category;
        let count;
        
        if (category === 'all') {
            count = Object.values(menuData).flat().length;
        } else {
            count = menuData[category]?.length || 0;
        }
        
        // Update button text to include count
        const icon = button.querySelector('i').cloneNode(true);
        const text = button.textContent.replace(/\(\d+\)/, '').trim();
        button.innerHTML = '';
        button.appendChild(icon);
        button.appendChild(document.createTextNode(` ${text} (${count})`));
    });
}

// ===== CART SYSTEM =====
function initCartSystem() {
    if (!elements.cartFab) return;
    
    elements.cartFab.addEventListener('click', openCart);
}

function addToCart(item) {
    // Check if item already exists in cart
    const existingItemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex > -1) {
        // Update quantity
        state.cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item
        state.cart.push({
            ...item,
            quantity: 1
        });
    }
    
    // Save to localStorage
    saveCart();
    
    // Update display
    updateCartDisplay();
    
    // Show feedback
    showNotification(`${item.name} added to cart!`, 'success');
    
    // Update the specific add button
    const addButton = document.querySelector(`.btn-add[data-id="${item.id}"]`);
    if (addButton) {
        const originalHTML = addButton.innerHTML;
        addButton.innerHTML = '<i class="fas fa-check"></i> Added!';
        addButton.disabled = true;
        
        setTimeout(() => {
            addButton.innerHTML = originalHTML;
            addButton.disabled = false;
        }, 2000);
    }
}

function removeFromCart(itemId) {
    const itemIndex = state.cart.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
        state.cart.splice(itemIndex, 1);
        saveCart();
        updateCartDisplay();
        showNotification('Item removed from cart', 'info');
    }
}

function updateCartQuantity(itemId, newQuantity) {
    const item = state.cart.find(item => item.id === itemId);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const totalItems = state.cart.reduce((total, item) => total + item.quantity, 0);
    
    if (elements.cartCount) {
        elements.cartCount.textContent = totalItems;
        elements.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    if (elements.cartFab) {
        elements.cartFab.setAttribute('aria-label', `View cart (${totalItems} items)`);
    }
}

function openCart() {
    // In a real implementation, this would open a cart modal
    showNotification(`Cart has ${state.cart.length} items. Total: $${calculateCartTotal().toFixed(2)}`, 'info');
    
    // For now, we'll just show a simple alert with cart contents
    if (state.cart.length === 0) {
        alert('Your cart is empty. Add some delicious items from our menu!');
    } else {
        const cartSummary = state.cart.map(item => 
            `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');
        
        alert(`Your Cart:\n\n${cartSummary}\n\nTotal: $${calculateCartTotal().toFixed(2)}`);
    }
}

function calculateCartTotal() {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function saveCart() {
    try {
        localStorage.setItem(CONFIG.cartStorageKey, JSON.stringify(state.cart));
    } catch (error) {
        console.error('Failed to save cart:', error);
    }
}

function loadCart() {
    try {
        const savedCart = localStorage.getItem(CONFIG.cartStorageKey);
        if (savedCart) {
            state.cart = JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('Failed to load cart:', error);
        state.cart = [];
    }
}

// ===== FAVORITES SYSTEM =====
function toggleFavorite(itemId, button) {
    if (state.favorites.has(itemId)) {
        state.favorites.delete(itemId);
        button.classList.remove('active');
        button.setAttribute('aria-label', 'Add to favorites');
        button.querySelector('i').className = 'far fa-heart';
        showNotification('Removed from favorites', 'info');
    } else {
        state.favorites.add(itemId);
        button.classList.add('active');
        button.setAttribute('aria-label', 'Remove from favorites');
        button.querySelector('i').className = 'fas fa-heart';
        showNotification('Added to favorites!', 'success');
    }
    
    saveFavorites();
}

function saveFavorites() {
    try {
        const favoritesArray = Array.from(state.favorites);
        localStorage.setItem(CONFIG.favoritesStorageKey, JSON.stringify(favoritesArray));
    } catch (error) {
        console.error('Failed to save favorites:', error);
    }
}

function loadFavorites() {
    try {
        const savedFavorites = localStorage.getItem(CONFIG.favoritesStorageKey);
        if (savedFavorites) {
            const favoritesArray = JSON.parse(savedFavorites);
            state.favorites = new Set(favoritesArray);
        }
    } catch (error) {
        console.error('Failed to load favorites:', error);
        state.favorites = new Set();
    }
}

// ===== MODAL SYSTEM =====
function initModalSystem() {
    if (!elements.orderModal || !elements.modalClose) return;
    
    // Close modal buttons
    elements.modalClose.addEventListener('click', closeOrderModal);
    
    // Close modal when clicking outside
    elements.orderModal.addEventListener('click', (event) => {
        if (event.target === elements.orderModal || event.target.classList.contains('modal-backdrop')) {
            closeOrderModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !elements.orderModal.hidden) {
            closeOrderModal();
        }
    });
    
    // Order buttons
    document.querySelectorAll('.btn-order, .offer-btn').forEach(button => {
        button.addEventListener('click', openOrderModal);
    });
}

function openOrderModal(event) {
    event.preventDefault();
    
    if (elements.orderModal) {
        elements.orderModal.hidden = false;
        elements.orderModal.setAttribute('aria-hidden', 'false');
        
        // Focus on first focusable element in modal
        const focusableElements = elements.orderModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeOrderModal() {
    if (elements.orderModal) {
        elements.orderModal.hidden = true;
        elements.orderModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    if (!elements.contactForm) return;
    
    elements.contactForm.addEventListener('submit', handleContactFormSubmit);
    
    // Add real-time validation
    const inputs = elements.contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearFieldError(event);
    
    // Required validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class to field
    field.classList.add('error');
    
    // Create and insert error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    formGroup.appendChild(errorElement);
    
    // Focus on field
    field.focus();
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    
    // Validate all fields
    const fields = elements.contactForm.querySelectorAll('input, textarea');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please fix the errors in the form', 'error');
        return;
    }
    
    // Get form data
    const formData = new FormData(elements.contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // In a real implementation, you would send this to a server
    console.log('Form submitted:', data);
    
    // Show success message
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    // Reset form
    elements.contactForm.reset();
    
    // Remove any remaining errors
    elements.contactForm.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });
    elements.contactForm.querySelectorAll('.error-message').forEach(el => {
        el.remove();
    });
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    if (!elements.statNumbers.length) return;
    
    // Check if element is in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounterAnimation(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    elements.statNumbers.forEach(stat => observer.observe(stat));
}

function startCounterAnimation(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.dataset.count.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== TESTIMONIALS =====
function initTestimonials() {
    if (!elements.testimonialContainer) return;
    
    // In a real implementation, you would fetch testimonials from an API
    // For now, we'll use static data
    const testimonials = [
        {
            text: "Best pizza in town! The crust is perfect and the ingredients are always fresh. Our family has been coming here for years.",
            author: "John Smith",
            role: "Regular Customer",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            text: "The lasagna is absolutely amazing! Homemade taste that reminds me of my grandmother's cooking. Highly recommended!",
            author: "Maria Garcia",
            role: "Food Blogger",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            text: "Great service and even better food. The garlic breadsticks are to die for! We order from here every Friday night.",
            author: "Robert Johnson",
            role: "Local Resident",
            rating: 4.5,
            image: "https://randomuser.me/api/portraits/men/67.jpg"
        }
    ];
    
    // Create testimonial elements
    testimonials.forEach((testimonial, index) => {
        if (index > 0) { // First one is already in HTML
            const testimonialElement = createTestimonialElement(testimonial);
            elements.testimonialContainer.appendChild(testimonialElement);
        }
    });
    
    // Set up testimonial slider (simple version)
    let currentTestimonial = 0;
    const testimonialElements = elements.testimonialContainer.querySelectorAll('.testimonial');
    
    function showTestimonial(index) {
        testimonialElements.forEach((el, i) => {
            el.classList.toggle('active', i === index);
        });
        currentTestimonial = index;
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        const nextIndex = (currentTestimonial + 1) % testimonialElements.length;
        showTestimonial(nextIndex);
    }, 5000);
}

function createTestimonialElement(testimonial) {
    const div = document.createElement('div');
    div.className = 'testimonial';
    
    // Create rating stars
    const ratingStars = createRatingStars(testimonial.rating);
    
    div.innerHTML = `
        <div class="testimonial-content">
            <div class="rating">
                ${ratingStars}
            </div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.author}">
                <div>
                    <h4>${testimonial.author}</h4>
                    <span>${testimonial.role}</span>
                </div>
            </div>
        </div>
    `;
    
    return div;
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '300px'
    });
    
    // Set background color based on type
    const colors = {
        success: '#2ecc71',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Add keyframe animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function loadSavedState() {
    loadCart();
    loadFavorites();
}

function setupEventListeners() {
    // Smooth scroll for anchor links
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        event.preventDefault();
        
        // Close mobile menu if open
        if (elements.navMenu && elements.navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Smooth scroll to element
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
            navLink.removeAttribute('aria-current');
        });
        
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (event) => {
        // Tab key - add focus styles
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('click', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus styles for keyboard navigation
    if (!document.querySelector('#focus-styles')) {
        const style = document.createElement('style');
        style.id = 'focus-styles';
        style.textContent = `
            .keyboard-navigation :focus {
                outline: 3px solid var(--primary);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INITIALIZE WHEN DOM IS LOADED =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== EXPORT FOR TESTING (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        menuData,
        state,
        CONFIG,
        init,
        addToCart,
        removeFromCart,
        toggleFavorite,
        showNotification
    };
}