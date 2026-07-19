// Application States loaded directly from the HTML components
let globalProducts = [];
let shoppingCart = JSON.parse(localStorage.getItem('mix_cart')) || [];


function parseHTMLProducts() {
    const htmlCards = document.querySelectorAll('#home-grid .card-home');
    
    globalProducts = []; 

    htmlCards.forEach(card => {
        const id = parseInt(card.getAttribute('data-id'));
        const category = card.getAttribute('data-category');
        const price = parseFloat(card.getAttribute('data-price'));
        const stock = parseInt(card.getAttribute('data-stock')) || 10;
        const desc = card.getAttribute('data-desc') || '';
        const name = card.querySelector('.title-label').textContent.trim();
        const image = card.querySelector('.img-frame').getAttribute('src');

        globalProducts.push({ id, name, price, category, stock, image, desc });
    });

    localStorage.setItem('mix_products', JSON.stringify(globalProducts));
    updateGlobalCartCounter();
}


function saveToLocalStorage() {
    localStorage.setItem('mix_products', JSON.stringify(globalProducts));
    localStorage.setItem('mix_cart', JSON.stringify(shoppingCart));
    updateGlobalCartCounter();
}

function navigateTo(pageId) {
    document.querySelectorAll('.app-page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.add('active');

    const navBtn = document.getElementById(`btn-${pageId}`);
    if (navBtn) navBtn.classList.add('active');

    if (pageId === 'home') handleHomeFilter();
    if (pageId === 'shop') handleShopFilter();
    if (pageId === 'cart') renderShoppingCartDashboard();
}

function openAddPage() {
    document.getElementById('product-form').reset();
    document.getElementById('edit-product-id').value = '';
    document.getElementById('form-title').textContent = "Add New Product";
    navigateTo('add-product');
}

document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const idField = document.getElementById('edit-product-id').value;
    const title = document.getElementById('prod-title').value.trim();
    const price = parseFloat(document.getElementById('prod-price').value);
    const category = document.getElementById('prod-category').value;
    const stock = parseInt(document.getElementById('prod-stock').value) || 10;
    const imgUrl = document.getElementById('prod-img').value.trim();
    const desc = document.getElementById('prod-desc').value.trim();

    if (idField) {
        const idx = globalProducts.findIndex(p => p.id === parseInt(idField));
        if (idx !== -1) globalProducts[idx] = { id: parseInt(idField), name: title, price, category, stock, image: imgUrl, desc };
    } else {
        globalProducts.push({ id: Date.now(), name: title, price, category, stock, image: imgUrl, desc });
    }
    saveToLocalStorage();
    navigateTo('home');
});

function setupEditProduct(id) {
    const target = globalProducts.find(p => p.id === id);
    if (!target) return;
    document.getElementById('edit-product-id').value = target.id;
    document.getElementById('prod-title').value = target.name;
    document.getElementById('prod-price').value = target.price;
    document.getElementById('prod-category').value = target.category;
    document.getElementById('prod-stock').value = target.stock;
    document.getElementById('prod-img').value = target.image;
    document.getElementById('prod-desc').value = target.desc;
    document.getElementById('form-title').textContent = "Edit Product Details";
    navigateTo('add-product');
}

function deleteProduct(id) {
    if (confirm("Permanently erase item from store data memory?")) {
        globalProducts = globalProducts.filter(p => p.id !== id);
        shoppingCart = shoppingCart.filter(item => item.id !== id);
        saveToLocalStorage();
        handleHomeFilter();
        handleShopFilter();
    }
}

function handleHomeFilter() {
    const searchVal = document.getElementById('home-search').value.toLowerCase();
    const catVal = document.getElementById('home-category').value;
    const sortVal = document.getElementById('home-sort').value;

    let result = globalProducts.filter(p => (catVal === 'all' || p.category === catVal) && p.name.toLowerCase().includes(searchVal));
    if (sortVal === 'price-low') result.sort((a,b) => a.price - b.price);
    if (sortVal === 'price-high') result.sort((a,b) => b.price - a.price);

    const grid = document.getElementById('home-grid');
    grid.innerHTML = result.map(p => `
        <div class="card-home">
            <img src="${p.image}" class="img-frame" onclick="viewSingleProduct(${p.id})">
            <div class="body-frame">
                <span class="cat-label">${p.category}</span>
                <h3 class="title-label" onclick="viewSingleProduct(${p.id})">${p.name}</h3>
                <div class="price-label">$${p.price.toFixed(2)}</div>
                <button class="btn primary" onclick="addToCart(${p.id})"><i class="fas fa-cart-plus"></i> Add To Cart</button>
            </div>
        </div>
    `).join('');
}

function handleShopFilter() {
    const searchVal = document.getElementById('shop-search').value.toLowerCase();
    const catVal = document.getElementById('shop-category').value;
    const sortVal = document.getElementById('shop-sort').value;

    let result = globalProducts.filter(p => (catVal === 'all' || p.category === catVal) && p.name.toLowerCase().includes(searchVal));
    if (sortVal === 'price-low') result.sort((a,b) => a.price - b.price);
    if (sortVal === 'price-high') result.sort((a,b) => b.price - a.price);

    document.getElementById('shop-counter-text').textContent = `${result.length} products`;

    const grid = document.getElementById('shop-grid');
    grid.innerHTML = result.map(p => {
        const stockPct = Math.min(100, (p.stock / 40) * 100);
        return `
        <div class="card-shop">
            <img src="${p.image}" class="img-frame" onclick="viewSingleProduct(${p.id})">
            <span class="cat-label">${p.category}</span>
            <h3 class="title-label" onclick="viewSingleProduct(${p.id})">${p.name}</h3>
            <div class="price-label">$${p.price.toFixed(2)}</div>
            <div class="stock-wrap">
                <div class="stock-track"><div class="stock-fill" style="width:${stockPct}%"></div></div>
                <div class="stock-lbl">${p.stock} in stock</div>
            </div>
            <button class="btn-action-cart" onclick="addToCart(${p.id})">Add to Cart</button>
            <div class="admin-row">
                <button class="btn-inline-edit" onclick="setupEditProduct(${p.id})">Edit</button>
                <button class="btn-inline-delete" onclick="deleteProduct(${p.id})">Delete</button>
            </div>
        </div>
    `}).join('');
}

function viewSingleProduct(id) {
    const p = globalProducts.find(prod => prod.id === id);
    if (!p) return;
    document.getElementById('single-product-target').innerHTML = `
        <img src="${p.image}" class="single-img" alt="">
        <div class="single-details">
            <span class="cat-label" style="color:var(--primary); font-weight:700;">${p.category}</span>
            <h2>${p.name}</h2>
            <div class="single-price">$${p.price.toFixed(2)}</div>
            <p class="single-desc">${p.desc}</p>
            <button class="btn primary" onclick="addToCart(${p.id})">Add to Basket</button>
        </div>`;
    navigateTo('single-view');
}

function addToCart(id) {
    const match = shoppingCart.find(i => i.id === id);
    if (match) match.qty += 1;
    else shoppingCart.push({ ...globalProducts.find(p => p.id === id), qty: 1 });
    saveToLocalStorage();
    alert("Item added to cart.");
}

function changeQuantity(id, mod) {
    const item = shoppingCart.find(i => i.id === id);
    if (!item) return;
    item.qty += mod;
    if (item.qty <= 0) shoppingCart = shoppingCart.filter(i => i.id !== id);
    saveToLocalStorage();
    renderShoppingCartDashboard();
}

function renderShoppingCartDashboard() {
    const wrap = document.getElementById('cart-layout-wrapper');
    const empty = document.getElementById('cart-empty-state');
    if (shoppingCart.length === 0) { wrap.style.display = 'none'; empty.style.display = 'block'; return; }
    wrap.style.display = 'grid'; empty.style.display = 'none';

    document.getElementById('cart-list').innerHTML = shoppingCart.map(item => `
        <div class="cart-item-row">
            <img src="${item.image}" class="cart-thumb">
            <div class="cart-info"><h4>${item.name}</h4><div>$${item.price}</div></div>
            <div class="qty-controls">
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <button style="background:none; border:none; color:var(--accent-red); cursor:pointer;" onclick="changeQuantity(${item.id}, -${item.qty})"><i class="fas fa-trash-alt"></i></button>
        </div>`).join('');
    
    const subtotal = shoppingCart.reduce((s, i) => s + (i.price * i.qty), 0);
    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summary-tax').textContent = `$${(subtotal * 0.05).toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${(subtotal * 1.05).toFixed(2)}`;
}

function updateGlobalCartCounter() {
    document.getElementById('global-cart-count').textContent = shoppingCart.reduce((s, i) => s + i.qty, 0);
}


parseHTMLProducts();
updateGlobalCartCounter();
handleHomeFilter();