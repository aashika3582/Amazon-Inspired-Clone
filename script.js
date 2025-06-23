
// GLOBAL VARIABLES AND CONFIGURATION


// Product database for all pages
const products = {
  headphone: {
    id: "headphone",
    name: "Skullcandy Hesh Evo Over Ear Wireless Headphones",
    price: 6999,
    image: "headphones.jpg",
  },
  gamepad: {
    id: "gamepad",
    name: "Cosmic Byte Ares Pro Wireless Gamepad",
    price: 2299,
    image: "gamepad.jpg",
  },
  mouse: {
    id: "mouse",
    name: "Logitech MX Master 3S - Wireless Performance Mouse",
    price: 9594,
    image: "mouse.jpg",
  },
  macbook: {
    id: "macbook",
    name: "Apple 2024 MacBook Pro Laptop",
    price: 162990,
    image: "macbook.jpg",
  },
  s25: {
    id: "s25",
    name: "Samsung Galaxy S24 FE 5G AI Smartphone",
    price: 35990,
    image: "s25.jpg",
  },
  tab: {
    id: "tab",
    name: "Samsung Galaxy Tab S10 FE",
    price: 42999,
    image: "tab.jpg",
  },
  oppo: {
    id: "oppo",
    name: "OPPO Enco Air3 Pro True Wireless",
    price: 5500,
    image: "oppo.jpg",
  },
  watch: {
    id: "watch",
    name: "Apple Watch Series 10",
    price: 49990,
    image: "watch.jpg",
  },
}

// Global variables
let cart = []
let currentUser = null

// Get current page and product
const currentPage = window.location.pathname.split("/").pop() || "index.html"
const currentProduct = products[currentPage]

// Global state
//let cart = []
//let currentUser = null

// Simple product database
const productDatabase = {
  "headphone.html": {
    id: "headphone-001",
    name: "Skullcandy Hesh Evo Over Ear Wireless Headphones",
    price: 6999,
    image: "headphones.jpg",
    description: "36 Hr Battery, Microphone, Works with iPhone Android and Bluetooth Devices - True Black",
  },
  "gamepad.html": {
    id: "gamepad-001",
    name: "Cosmic Byte Ares Pro Wireless Gamepad",
    price: 2299,
    image: "gamepad.jpg",
    description: "Tri-Mode (2.4GHz, Bluetooth, Wired), Hall Effect Joysticks & Triggers",
  },
  "mouse.html": {
    id: "mouse-001",
    name: "Logitech MX Master 3S - Wireless Performance Mouse",
    price: 9594,
    image: "mouse.png",
    description: "Ultra-Fast Scrolling, Ergo, 8K DPI, Track on Glass, Quiet Clicks",
  },
  "s25.html": {
    id: "s25-001",
    name: "Samsung Galaxy S24 FE 5G AI Smartphone",
    price: 35990,
    image: "s25.png",
    description: "Graphite, 8GB RAM, 128GB Storage",
  },
  "tab.html": {
    id: "tab-001",
    name: "Samsung Galaxy Tab S10 FE",
    price: 42999,
    image: "tab.png",
    description: "S Pen in-Box, 27.7 cm (10.9 inch) LCD Display, 8 GB RAM, 128 GB Storage",
  },
  "oppo.html": {
    id: "oppo-001",
    name: "OPPO Enco Air3 Pro True Wireless",
    price: 5500,
    image: "oppo.png",
    description: "Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime",
  },
  "watch.html": {
    id: "watch-001",
    name: "Apple Watch Series 10",
    price: 49990,
    image: "watch.png",
    description: "GPS 46 mm Smartwatch with Silver Aluminium Case",
  },
  "macbook.html": {
    id: "macbook-001",
    name: "Apple 2024 MacBook Pro Laptop",
    price: 162990,
    image: "macbook.png",
    description: "M4 chip with 10‑core CPU and 10‑core GPU, 35.97 cm (14.2″) Liquid Retina XDR Display",
  },
}

// Global application state
let globalCart = []
let globalCurrentUser = null
const currentPg = window.location.pathname.split("/").pop()
const currentProd = products[currentPg]

// ==========================================
// INITIALIZATION
// ==========================================

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  loadCart()
  loadUser()
  updateCartCount()
  updateUserGreeting()

  // Initialize page-specific functionality
  const currentPage = window.location.pathname.split("/").pop()

  if (currentPage === "cart.html") {
    displayCartItems()
    setupCartEventListeners()
  } else if (currentPage === "login.html") {
    setupLoginEventListeners()
  } else if (currentPage === "order.html") {
    displayOrders()
  }
})

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("amazonCart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("amazonCart", JSON.stringify(cart))
}

// Load user from localStorage
function loadUser() {
  const savedUser = localStorage.getItem("currentUser")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
  }
}

// Update cart count in header
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartCountElement = document.getElementById("cartCount")
  if (cartCountElement) {
    cartCountElement.textContent = totalItems
  }
}

// Update user greeting
function updateUserGreeting() {
  const userGreeting = document.getElementById("userGreeting")
  if (userGreeting) {
    if (currentUser) {
      userGreeting.textContent = `Hello, ${currentUser.name}`
    } else {
      userGreeting.textContent = "Hello, sign in"
    }
  }
}

// Add item to cart
function addToCart(productId) {
  const product = products[productId]
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
    })
  }

  saveCart()
  updateCartCount()
  showMessage("Item added to cart successfully!")
}

// Buy now functionality
function buyNow(productId) {
  addToCart(productId)
  window.location.href = "cart.html"
}

// Show success message
function showMessage(text) {
  const message = document.createElement("div")
  message.className = "success-message"
  message.textContent = text
  document.body.appendChild(message)

  setTimeout(() => {
    message.remove()
  }, 3000)
}

// Initialize page-specific functionality
function initializePage() {
  switch (currentPage) {
    case "login.html":
      initializeLoginPageFunc()
      break
    case "cart.html":
      initializeCartPage()
      break
    case "order.html":
      initializeOrderPage()
      break
    default:
      if (currentProduct) {
        initializeProductPageFunc()
      }
      break
  }
}

// Initialize product page
function initializeProductPageFunc() {
  const addToCartBtn = document.getElementById("addToCartBtn")
  const buyNowBtn = document.getElementById("buyNowBtn")

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", addToCart)
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", buyNow)
  }
}

// Initialize login page
function initializeLoginPageFunc() {
  let loginStep = 1
  const continueBtn = document.getElementById("continueBtn")

  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      const email = document.getElementById("email")
      const password = document.getElementById("password")
      const emailLabel = document.getElementById("email-label")
      const passwordLabel = document.getElementById("password-label")

      if (loginStep === 1) {
        if (!email || email.value.trim() === "") {
          alert("Please enter your email or mobile number.")
          return
        }

        // Move to password step
        email.style.display = "none"
        emailLabel.style.display = "none"
        password.style.display = "block"
        passwordLabel.style.display = "block"
        loginStep = 2
      } else if (loginStep === 2) {
        if (!password || password.value.trim() === "") {
          alert("Please enter your password.")
          return
        }

        // Process login
        const userData = {
          email: email.value.trim(),
          name: email.value.split("@")[0] || email.value.substring(0, 10),
          loginTime: new Date().toISOString(),
        }

        currentUser = userData
        localStorage.setItem("currentUser", JSON.stringify(userData))

        alert("Login successful!")

        // Redirect to return URL or homepage
        const urlParams = new URLSearchParams(window.location.search)
        const returnUrl = urlParams.get("return") || "index.html"
        window.location.href = returnUrl
      }
    })
  }
}

// Initialize cart page
function initializeCartPage() {
  displayCartItems()

  const checkoutBtn = document.getElementById("checkoutBtn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!currentUser) {
        alert("Please sign in to proceed to checkout")
        window.location.href = "login.html?return=cart.html"
        return
      }

      // Simple checkout process
      alert("Order placed successfully! Thank you for your purchase.")

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem("userOrders") || "[]")
      const newOrder = {
        id: "ORD" + Date.now(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        date: new Date().toLocaleDateString(),
        user: currentUser.email,
      }
      orders.push(newOrder)
      localStorage.setItem("userOrders", JSON.stringify(orders))

      // Clear cart
      cart = []
      saveCart()
      updateCartCount()

      window.location.href = "order.html"
    })
  }
}

// Display cart items
function displayCartItems() {
  const cartContent = document.getElementById("cartContent")
  const cartTitle = document.getElementById("cartTitle")
  const cartTotalSection = document.getElementById("cartTotalSection")
  const cartTotal = document.getElementById("cartTotal")

  if (!cartContent) return

  if (cart.length === 0) {
    cartTitle.textContent = "Your Amazon Cart is empty"
    cartContent.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <p style="margin-bottom: 15px;">Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.</p>
        <p>Continue shopping on the <a href="index.html" style="color: #007185; text-decoration: none;">Amazon.in homepage</a>.</p>
      </div>
    `
    cartTotalSection.style.display = "none"
    return
  }

  cartTitle.textContent = "Shopping Cart"
  cartContent.innerHTML = ""

  let total = 0

  cart.forEach((item) => {
    total += item.price * item.quantity

    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 4px;">
      <div style="flex: 1;">
        <h4 style="margin-bottom: 10px;">${item.name}</h4>
        <div style="color: #b12704; font-size: 18px; font-weight: bold; margin-bottom: 10px;">₹${item.price.toLocaleString()}</div>
        <div style="display: flex; align-items: center; gap: 15px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <button onclick="updateQuantity('${item.id}', -1)" style="width: 30px; height: 30px; border: 1px solid #ddd; background: #f0f0f0; cursor: pointer;">-</button>
            <span>Qty: ${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', 1)" style="width: 30px; height: 30px; border: 1px solid #ddd; background: #f0f0f0; cursor: pointer;">+</button>
          </div>
          <button onclick="removeFromCart('${item.id}')" style="background: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Remove</button>
        </div>
      </div>
      <div style="font-size: 18px; font-weight: bold;">₹${(item.price * item.quantity).toLocaleString()}</div>
    `
    cartContent.appendChild(cartItem)
  })

  cartTotal.textContent = total.toLocaleString()
  cartTotalSection.style.display = "block"
}

// Change quantity in cart
function changeQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      saveCart()
      updateCartCount()
      displayCartItems()
    }
  }
}

// Remove item from cart
// function removeFromCart(productId) {
//   cart = cart.filter(item => item.id !== productId);
//   saveCart();
//   updateCartCount();
//   displayCartItems();
// }

// Initialize order page
function initializeOrderPage() {
  const orders = JSON.parse(localStorage.getItem("userOrders") || "[]")
  const userOrders = currentUser ? orders.filter((order) => order.user === currentUser.email) : []

  const ordersContent = document.getElementById("ordersContent")
  if (ordersContent && userOrders.length > 0) {
    ordersContent.innerHTML = ""
    userOrders.forEach((order) => {
      const orderDiv = document.createElement("div")
      orderDiv.style.cssText = "border: 1px solid #ddd; padding: 20px; margin-bottom: 15px; border-radius: 4px;"
      orderDiv.innerHTML = `
                <h3>Order #${order.id}</h3>
                <p>Date: ${order.date}</p>
                <p>Total: ₹${order.total.toLocaleString()}</p>
                <p>Items: ${order.items.length}</p>
            `
      ordersContent.appendChild(orderDiv)
    })
  }
}

// Make functions globally available
window.changeQuantity = changeQuantity
window.removeItem = removeItem

// Search functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector(".search-icon")
  const searchInput = document.querySelector(".search-input")

  if (searchIcon) {
    searchIcon.addEventListener("click", () => {
      const searchTerm = searchInput.value.trim()
      if (searchTerm) {
        showMessage(`Searching for "${searchTerm}"`)
      }
    })
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const searchTerm = e.target.value.trim()
        if (searchTerm) {
          showMessage(`Searching for "${searchTerm}"`)
        }
      }
    })
  }

  // Back to top functionality
  const backToTop = document.querySelector(".footpanel1")
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }
})

function loadGlobalCart() {
  const savedCart = localStorage.getItem("amazonCart")
  if (savedCart) {
    globalCart = JSON.parse(savedCart)
  }
}

function saveGlobalCart() {
  localStorage.setItem("amazonCart", JSON.stringify(globalCart))
}

function loadGlobalUser() {
  const savedUser = localStorage.getItem("currentUser")
  if (savedUser) {
    globalCurrentUser = JSON.parse(savedUser)
  }
}

function saveGlobalUser() {
  localStorage.setItem("currentUser", JSON.stringify(globalCurrentUser))
}

function updateGlobalCartCount() {
  const totalItems = globalCart.reduce((sum, item) => sum + item.quantity, 0)
  const cartCountElements = document.querySelectorAll("#cartCount")
  cartCountElements.forEach((element) => {
    if (element) element.textContent = totalItems
  })
}

function updateGlobalUserGreeting() {
  const userGreetingElements = document.querySelectorAll("#userGreeting")
  userGreetingElements.forEach((element) => {
    if (element) {
      if (globalCurrentUser) {
        element.textContent = `Hello, ${globalCurrentUser.name}`
      } else {
        element.textContent = "Hello, sign in"
      }
    }
  })
}

function removeFromCart(productId) {
  globalCart = globalCart.filter((item) => item.id !== productId)
  saveGlobalCart()
  updateGlobalCartCount()

  // Refresh cart display if on cart page
  if (currentPage === "cart.html") {
    renderCartPageFunc()
  }
}

function updateQuantity(productId, change) {
  const item = globalCart.find((item) => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      saveGlobalCart()
      updateGlobalCartCount()

      // Refresh cart display if on cart page
      if (currentPage === "cart.html") {
        renderCartPageFunc()
      }
    }
  }
}

function getCartTotal() {
  return globalCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function showSuccessMessage(message) {
  const successDiv = document.createElement("div")
  successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #d4edda;
        color: #155724;
        padding: 15px 20px;
        border-radius: 4px;
        border: 1px solid #c3e6cb;
        z-index: 3000;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `
  successDiv.textContent = message
  document.body.appendChild(successDiv)

  setTimeout(() => {
    successDiv.remove()
  }, 3000)
}

function showLoading() {
  const loadingSpinner = document.getElementById("loadingSpinner")
  if (loadingSpinner) {
    loadingSpinner.style.display = "block"
  }
}

function hideLoading() {
  const loadingSpinner = document.getElementById("loadingSpinner")
  if (loadingSpinner) {
    loadingSpinner.style.display = "none"
  }
}

function handleSearch() {
  const searchInput = document.querySelector(".search-input")
  const searchTerm = searchInput ? searchInput.value.trim() : ""
  if (searchTerm) {
    window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`
  }
}

function setupUniversalEventListeners() {
  // Search functionality
  const searchIcon = document.querySelector(".search-icon")
  const searchInput = document.querySelector(".search-input")

  if (searchIcon) {
    searchIcon.addEventListener("click", handleSearch)
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch()
      }
    })
  }

  // Cart icon navigation
  const cartIcon = document.querySelector("#cartIcon")
  if (cartIcon && currentPage !== "cart.html") {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault()
      showCart()
    })
  }

  // Back to top
  const backToTop = document.querySelector(".footpanel1")
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }
}

// ==========================================
// LOGIN PAGE FUNCTIONALITY
// ==========================================

let loginStep = 1

function handleLoginProcess() {
  const email = document.querySelector("#email")
  const password = document.querySelector("#password")
  const emailLabel = document.querySelector("#email-label")
  const passwordLabel = document.querySelector("#password-label")

  if (loginStep === 1) {
    if (!email || email.value.trim() === "") {
      alert("Please enter your email or mobile number.")
      return
    }

    // Move to password step
    email.style.display = "none"
    emailLabel.style.display = "none"
    password.style.display = "block"
    passwordLabel.style.display = "block"
    loginStep = 2
  } else if (loginStep === 2) {
    if (!password || password.value.trim() === "") {
      alert("Please enter your password.")
      return
    }

    // Process login
    const userData = {
      email: email.value.trim(),
      name: email.value.split("@")[0] || email.value.substring(0, 10),
      loginTime: new Date().toISOString(),
    }

    // Save user data
    globalCurrentUser = userData
    saveGlobalUser()

    // Save to users list for future logins
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const existingUser = users.find((u) => u.email === userData.email)
    if (!existingUser) {
      users.push({
        email: userData.email,
        name: userData.name,
        password: password.value,
      })
      localStorage.setItem("users", JSON.stringify(users))
    }

    alert("Login successful!")

    // Redirect to return URL or homepage
    const urlParams = new URLSearchParams(window.location.search)
    const returnUrl = urlParams.get("return") || "index.html"
    window.location.href = returnUrl
  }
}

// ==========================================
// PRODUCT PAGE FUNCTIONALITY
// ==========================================

function setupModalEventListeners() {
  // Close modals
  document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal")
      hideModal(modal)
    })
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      hideModal(e.target)
    }
  })

  // Checkout button
  const checkoutBtn = document.getElementById("checkoutBtn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!globalCurrentUser) {
        alert("Please sign in to proceed to checkout")
        window.location.href = "login.html?return=" + currentPage
        return
      }
      hideModal(document.getElementById("cartModal"))
      showCheckout()
    })
  }

  // Checkout form
  const checkoutForm = document.getElementById("checkoutForm")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckout)
  }
}

// CART FUNCTIONALITY

function showCart() {
  renderCart()
  showModal(document.getElementById("cartModal"))
}

function renderCart() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (!cartItems || !cartTotal) return

  if (globalCart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">Your cart is empty</p>'
    cartTotal.textContent = "0"
    return
  }

  cartItems.innerHTML = ""
  globalCart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>Qty: ${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
            <div style="font-size: 18px; font-weight: bold;">₹${(item.price * item.quantity).toLocaleString()}</div>
        `
    cartItems.appendChild(cartItem)
  })

  cartTotal.textContent = getCartTotal().toLocaleString()
}

// CHECKOUT FUNCTIONALITY

function showCheckout() {
  renderCheckout()
  showModal(document.getElementById("checkoutModal"))
}

function renderCheckout() {
  const checkoutItems = document.getElementById("checkoutItems")
  const checkoutTotal = document.getElementById("checkoutTotal")

  if (!checkoutItems || !checkoutTotal) return

  checkoutItems.innerHTML = ""
  globalCart.forEach((item) => {
    const checkoutItem = document.createElement("div")
    checkoutItem.className = "checkout-item"
    checkoutItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toLocaleString()}</span>
        `
    checkoutItems.appendChild(checkoutItem)
  })

  checkoutTotal.textContent = getCartTotal().toLocaleString()
}

function handleCheckout(e) {
  e.preventDefault()

  const submitBtn = e.target.querySelector(".place-order-btn")
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Processing..."
  submitBtn.disabled = true

  setTimeout(() => {
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("userOrders") || "[]")
    const newOrder = {
      id: "ORD" + Date.now(),
      items: [...globalCart],
      total: getCartTotal(),
      date: new Date().toLocaleDateString(),
      user: globalCurrentUser.email,
    }
    orders.push(newOrder)
    localStorage.setItem("userOrders", JSON.stringify(orders))

    // Clear cart
    globalCart = []
    saveGlobalCart()
    updateGlobalCartCount()

    // Hide modal
    hideModal(document.getElementById("checkoutModal"))

    // Show success message
    showSuccessMessage("Order placed successfully! Thank you for your purchase.")

    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false

    // Redirect to orders page after a delay
    setTimeout(() => {
      window.location.href = "order.html"
    }, 2000)
  }, 2000)
}

// MODAL UTILITIES

function showModal(modal) {
  if (modal) {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
  }
}

function hideModal(modal) {
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }
}

// Cart functions
function getCart() {
  return JSON.parse(localStorage.getItem("amazonCart") || "[]")
}

// function updateCartCount() {
//   const cart = getCart()
//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
//   const cartCountElement = document.getElementById("cartCount")
//   if (cartCountElement) {
//     cartCountElement.textContent = totalItems
//   }
// }

function addItemToCart() {
  if (!currentProduct) return

  const existingItem = cart.find((item) => item.id === currentProduct.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...currentProduct,
      quantity: 1,
    })
  }

  saveCart()
  updateCartCount()
  showMessage("Item added to cart successfully!")
}

function buyNow() {
  addItemToCart()
  // Redirect to cart page
  window.location.href = "cart.html"
}

function showMessage(text) {
  // Create and show a simple message
  const message = document.createElement("div")
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #d4edda;
    color: #155724;
    padding: 15px 20px;
    border-radius: 4px;
    border: 1px solid #c3e6cb;
    z-index: 9999;
    font-family: Arial, sans-serif;
  `
  message.textContent = text
  document.body.appendChild(message)

  setTimeout(() => {
    message.remove()
  }, 3000)
}

// CART PAGE FUNCTIONALITY


function setupCartEventListeners() {
  const checkoutBtn = document.getElementById("checkoutBtn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!currentUser) {
        alert("Please sign in to proceed to checkout")
        window.location.href = "login.html?return=cart.html"
        return
      }

      // Simple checkout process
      alert("Order placed successfully! Thank you for your purchase.")

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem("userOrders") || "[]")
      const newOrder = {
        id: "ORD" + Date.now(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        date: new Date().toLocaleDateString(),
        user: currentUser.email,
      }
      orders.push(newOrder)
      localStorage.setItem("userOrders", JSON.stringify(orders))

      // Clear cart
      cart = []
      saveCart()
      updateCartCount()

      window.location.href = "order.html"
    })
  }
}

// Cart page functionality
function displayCartItems() {
  const cartContent = document.getElementById("cartContent")
  const cartTitle = document.getElementById("cartTitle")
  const cartTotalSection = document.getElementById("cartTotalSection")
  const cartTotal = document.getElementById("cartTotal")

  if (!cartContent) return

  if (cart.length === 0) {
    cartTitle.textContent = "Your Amazon Cart is empty"
    cartContent.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="margin-bottom: 15px;">Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.</p>
                <p>Continue shopping on the <a href="index.html" style="color: #007185; text-decoration: none;">Amazon.in homepage</a>.</p>
            </div>
        `
    cartTotalSection.style.display = "none"
    return
  }

  cartTitle.textContent = "Shopping Cart"
  cartContent.innerHTML = ""

  let total = 0

  cart.forEach((item) => {
    total += item.price * item.quantity

    const cartItem = document.createElement("div")
    cartItem.style.cssText =
      "border-bottom: 1px solid #ddd; padding: 20px 0; display: flex; gap: 20px; align-items: center;"
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 4px;">
            <div style="flex: 1;">
                <h4 style="margin-bottom: 10px;">${item.name}</h4>
                <div style="color: #b12704; font-size: 18px; font-weight: bold; margin-bottom: 10px;">₹${item.price.toLocaleString()}</div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button onclick="updateQuantity('${item.id}', -1)" style="width: 30px; height: 30px; border: 1px solid #ddd; background: #f0f0f0; cursor: pointer;">-</button>
                        <span>Qty: ${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)" style="width: 30px; height: 30px; border: 1px solid #ddd; background: #f0f0f0; cursor: pointer;">+</button>
                    </div>
                    <button onclick="removeItem('${item.id}')" style="background: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Remove</button>
                </div>
            </div>
            <div style="font-size: 18px; font-weight: bold;">₹${(item.price * item.quantity).toLocaleString()}</div>
        `
    cartContent.appendChild(cartItem)
  })

  cartTotal.textContent = total.toLocaleString()
  cartTotalSection.style.display = "block"

  // Add checkout button functionality
  const checkoutBtn = document.getElementById("checkoutBtn")
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      alert("Order placed successfully! Thank you for your purchase.")
      localStorage.removeItem("amazonCart")
      window.location.href = "index.html"
    }
  }
}

function changeQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)

  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeItem(productId)
      return
    }
    saveCart()
    updateCartCount()
    displayCartItems()
  }
}

function removeItem(productId) {
  cart = cart.filter((item) => item.id !== productId)
  saveCart()
  updateCartCount()
  displayCartItems()
}


// INDEX PAGE FUNCTIONALITY


function initializeIndexPage() {
  handleURLSearch()
}

function handleURLSearch() {
  const urlParams = new URLSearchParams(window.location.search)
  const searchTerm = urlParams.get("search")

  if (searchTerm) {
    const searchInput = document.querySelector(".search-input")
    if (searchInput) {
      searchInput.value = searchTerm
    }
    showSuccessMessage(`Searching for "${searchTerm}"`)
  }
}


// ORDER PAGE FUNCTIONALITY


function initializeOrderPage() {
  const orders = JSON.parse(localStorage.getItem("userOrders") || "[]")
  const userOrders = currentUser ? orders.filter((order) => order.user === currentUser.email) : []

  const ordersContent = document.getElementById("ordersContent")
  if (ordersContent && userOrders.length > 0) {
    ordersContent.innerHTML = ""
    userOrders.forEach((order) => {
      const orderDiv = document.createElement("div")
      orderDiv.style.cssText = "border: 1px solid #ddd; padding: 20px; margin-bottom: 15px; border-radius: 4px;"
      orderDiv.innerHTML = `
                <h3>Order #${order.id}</h3>
                <p>Date: ${order.date}</p>
                <p>Total: ₹${order.total.toLocaleString()}</p>
                <p>Items: ${order.items.length}</p>
            `
      ordersContent.appendChild(orderDiv)
    })
  }
}

// Login functionality
function handleLogin() {
  const email = document.getElementById("email")
  if (email && email.value.trim()) {
    const userData = {
      email: email.value.trim(),
      name: email.value.split("@")[0] || "User",
    }
    localStorage.setItem("currentUser", JSON.stringify(userData))
    alert("Login successful!")
    window.location.href = "index.html"
  } else {
    alert("Please enter your email.")
  }
}

// Update user greeting
function updateGreeting() {
  const userGreeting = document.getElementById("userGreeting")
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null")

  if (userGreeting) {
    if (currentUser) {
      userGreeting.textContent = `Hello, ${currentUser.name}`
    } else {
      userGreeting.textContent = "Hello, sign in"
    }
  }
}

// Update user greeting on page load
document.addEventListener("DOMContentLoaded", updateGreeting)

// Make functions global for onclick handlers
window.changeQuantity = changeQuantity
window.removeItem = removeItem

// ==========================================
// GLOBAL FUNCTION EXPORTS
// ==========================================

// Make functions globally available for onclick handlers
window.addToCart = addToCart
window.buyNow = buyNow
window.removeFromCart = removeFromCart
window.updateQuantity = updateQuantity
window.handleSearch = handleSearch

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()

  // Add event listeners for product pages
  const addToCartBtn = document.getElementById("addToCartBtn")
  const buyNowBtn = document.getElementById("buyNowBtn")

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", addItemToCart)
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", buyNow)
  }

  // Make cart icon clickable
  const cartIcon = document.querySelector(".navcart")
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault()
      window.location.href = "cart.html"
    })
  }

  // Initialize cart page if we're on it
  if (currentPage === "cart.html") {
    displayCartItems()
  }

  // Initialize login page if we're on it
  if (currentPage === "login.html") {
    const continueBtn = document.getElementById("continueBtn")
    if (continueBtn) {
      continueBtn.addEventListener("click", handleLogin)
    }
  }
})


// HEADPHONE PAGE SPECIFIC FUNCTIONALITY


// Headphone product data
const headphoneProduct = {
  id: "headphone-001",
  name: "Skullcandy Hesh Evo Over Ear Wireless Headphones",
  price: 6999,
  image: "headphones.jpg",
  description: "36 Hr Battery, Microphone, Works with iPhone Android and Bluetooth Devices - True Black",
}

// Initialize headphone page functionality
function initializeHeadphonePage() {
  const addToCartBtn = document.getElementById("addToCartBtn")
  const buyNowBtn = document.getElementById("buyNowBtn")

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      addHeadphoneToCart()
    })
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      buyHeadphoneNow()
    })
  }

  // Setup headphone modals
  setupHeadphoneModals()
}

function addHeadphoneToCart() {
  const existingItem = globalCart.find((item) => item.id === headphoneProduct.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    globalCart.push({
      ...headphoneProduct,
      quantity: 1,
    })
  }

  saveGlobalCart()
  updateGlobalCartCount()
  showSuccessMessage("Headphones added to cart successfully!")
}

function buyHeadphoneNow() {
  // Add to cart first
  addHeadphoneToCart()

  // Check if user is logged in
  if (!globalCurrentUser) {
    alert("Please sign in to proceed with purchase")
    window.location.href = "login.html?return=headphone.html"
    return
  }

  // Show checkout directly
  setTimeout(() => {
    showHeadphoneCheckout()
  }, 600)
}

function showHeadphoneCart() {
  renderHeadphoneCart()
  const cartModal = document.getElementById("cartModal")
  if (cartModal) {
    cartModal.style.display = "block"
    document.body.style.overflow = "hidden"
  }
}

function renderHeadphoneCart() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (!cartItems || !cartTotal) return

  if (globalCart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">Your cart is empty</p>'
    cartTotal.textContent = "0"
    return
  }

  cartItems.innerHTML = ""
  globalCart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
      <div class="cart-item-info" style="flex: 1; margin-left: 15px;">
        <h4 style="margin-bottom: 5px; font-size: 16px;">${item.name}</h4>
        <div style="color: #b12704; font-weight: bold; font-size: 18px;">₹${item.price.toLocaleString()}</div>
        <div style="display: flex; align-items: center; gap: 10px; margin: 10px 0;">
          <button onclick="updateHeadphoneQuantity('${item.id}', -1)" style="background: #f0f0f0; border: 1px solid #ddd; width: 30px; height: 30px; border-radius: 4px; cursor: pointer;">-</button>
          <span>Qty: ${item.quantity}</span>
          <button onclick="updateHeadphoneQuantity('${item.id}', 1)" style="background: #f0f0f0; border: 1px solid #ddd; width: 30px; height: 30px; border-radius: 4px; cursor: pointer;">+</button>
        </div>
        <button onclick="removeHeadphoneFromCart('${item.id}')" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Remove</button>
      </div>
      <div style="font-size: 18px; font-weight: bold;">₹${(item.price * item.quantity).toLocaleString()}</div>
    `
    cartItems.appendChild(cartItem)
  })

  cartTotal.textContent = getCartTotal().toLocaleString()
}

function updateHeadphoneQuantity(productId, change) {
  const item = globalCart.find((item) => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeHeadphoneFromCart(productId)
    } else {
      saveGlobalCart()
      updateGlobalCartCount()
      renderHeadphoneCart()
    }
  }
}

function removeHeadphoneFromCart(productId) {
  globalCart = globalCart.filter((item) => item.id !== productId)
  saveGlobalCart()
  updateGlobalCartCount()
  renderHeadphoneCart()
}

function showHeadphoneCheckout() {
  renderHeadphoneCheckout()
  const checkoutModal = document.getElementById("checkoutModal")
  if (checkoutModal) {
    checkoutModal.style.display = "block"
    document.body.style.overflow = "hidden"
  }
}

function renderHeadphoneCheckout() {
  const checkoutItems = document.getElementById("checkoutItems")
  const checkoutTotal = document.getElementById("checkoutTotal")

  if (!checkoutItems || !checkoutTotal) return

  checkoutItems.innerHTML = ""
  globalCart.forEach((item) => {
    const checkoutItem = document.createElement("div")
    checkoutItem.style.cssText =
      "display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #ddd;"
    checkoutItem.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <span>₹${(item.price * item.quantity).toLocaleString()}</span>
    `
    checkoutItems.appendChild(checkoutItem)
  })

  checkoutTotal.textContent = getCartTotal().toLocaleString()
}

function handleHeadphoneCheckout(e) {
  e.preventDefault()

  const submitBtn = e.target.querySelector(".place-order-btn")
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Processing..."
  submitBtn.disabled = true

  setTimeout(() => {
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("userOrders") || "[]")
    const newOrder = {
      id: "ORD" + Date.now(),
      items: [...globalCart],
      total: getCartTotal(),
      date: new Date().toLocaleDateString(),
      user: globalCurrentUser ? globalCurrentUser.email : "guest",
    }
    orders.push(newOrder)
    localStorage.setItem("userOrders", JSON.stringify(orders))

    // Clear cart
    globalCart = []
    saveGlobalCart()
    updateGlobalCartCount()

    // Hide modal
    const checkoutModal = document.getElementById("checkoutModal")
    if (checkoutModal) {
      checkoutModal.style.display = "none"
      document.body.style.overflow = "auto"
    }

    // Show success message
    showSuccessMessage("Order placed successfully! Thank you for your purchase.")

    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false

    // Redirect to orders page after a delay
    setTimeout(() => {
      window.location.href = "order.html"
    }, 2000)
  }, 2000)
}

function setupHeadphoneModals() {
  // Cart icon click
  const cartIcon = document.getElementById("cartIcon")
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault()
      showHeadphoneCart()
    })
  }

  // Close buttons
  const closeButtons = document.querySelectorAll(".close")
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal")
      if (modal) {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  })

  // Checkout button\
  const checkoutBtn = document.getElementById("checkoutBtn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!globalCurrentUser) {
        alert("Please sign in to proceed to checkout")
        window.location.href = "login.html?return=headphone.html"
        return
      }
      const cartModal = document.getElementById("cartModal")
      if (cartModal) {
        cartModal.style.display = "none"
      }
      showHeadphoneCheckout()
    })
  }

  // Checkout form
  const checkoutForm = document.getElementById("checkoutForm")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleHeadphoneCheckout)
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })
}

// Make headphone functions globally available
window.updateHeadphoneQuantity = updateHeadphoneQuantity
window.removeHeadphoneFromCart = removeHeadphoneFromCart

// Initialize headphone page if we're on headphone.html
if (window.location.pathname.includes("headphone.html") || window.location.pathname.endsWith("headphone.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    initializeHeadphonePage()
  })
}

function initializeCartPageFunc() {
  setupCartEventListeners()
  displayCartItems()
}

function renderCartPageFunc() {
  displayCartItems()
}
