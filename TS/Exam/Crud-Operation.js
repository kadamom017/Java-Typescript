let products = [];
let isEditing = false;

const productForm = document.getElementById('product-form');
const productIdInput = document.getElementById('product-id');
const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const imageInput = document.getElementById('image');
const categoryInput = document.getElementById('category');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');

const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('search-input');
const filterCategory = document.getElementById('filter-category');
const sortPrice = document.getElementById('sort-price');

const placeholderImg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='18' height='18' rx='2' ry='2'/><circle cx='8.5' cy='8.5' r='1.5'/><polyline points='21 15 16 10 5 21'/></svg>";

function loadProductsFromStorage() {
    const stored = localStorage.getItem('products');
    products = stored ? JSON.parse(stored) : [];
}

function saveProductsToStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function addProduct(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const price = parseFloat(priceInput.value);
    const image = imageInput.value.trim() || placeholderImg;
    const category = categoryInput.value;

    if (!title || isNaN(price)) {
        alert('Please provide both a valid product name and price.');
        return;
    }

    if (isEditing) {
    
        const id = productIdInput.value;
        products = products.map(p => p.id === id ? { ...p, title, price, image, category } : p);
        
        isEditing = false;
        formTitle.textContent = "Add New Product";
        submitBtn.textContent = "Add Product";
    } else {

        const newProduct = {
            id: Date.now().toString(), 
            title,
            price,
            image,
            category
        };
        products.push(newProduct);
    }

    saveProductsToStorage();
    renderApp();
    
    productForm.reset();
    productIdInput.value = '';
}

function editProduct(id) {
    const targetProduct = products.find(p => p.id === id);
    if (!targetProduct) return;

    productIdInput.value = targetProduct.id;
    titleInput.value = targetProduct.title;
    priceInput.value = targetProduct.price;
    imageInput.value = targetProduct.image === placeholderImg ? '' : targetProduct.image;
    categoryInput.value = targetProduct.category;

    isEditing = true;
    formTitle.textContent = "Modify Product";
    submitBtn.textContent = "Update Product";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        products = products.filter(p => p.id !== id);
        saveProductsToStorage();
        renderApp();
        
        if (isEditing && productIdInput.value === id) {
            productForm.reset();
            isEditing = false;
            formTitle.textContent = "Add New Product";
            submitBtn.textContent = "Add Product";
        }
    }
}

function renderApp() {
    productContainer.innerHTML = '';

    let updatedList = [...products];

    const searchQuery = searchInput.value.toLowerCase().trim();
    if (searchQuery) {
        updatedList = updatedList.filter(p => p.title.toLowerCase().includes(searchQuery));
    }

    const activeCategory = filterCategory.value;
    if (activeCategory !== 'all') {
        updatedList = updatedList.filter(p => p.category === activeCategory);
    }

    const sortingOrder = sortPrice.value;
    if (sortingOrder === 'low-to-high') {
        updatedList.sort((a, b) => a.price - b.price);
    } else if (sortingOrder === 'high-to-low') {
        updatedList.sort((a, b) => b.price - a.price);
    }

    if (updatedList.length === 0) {
        productContainer.innerHTML = '<div class="no-products">No products found matching the criteria.</div>';
        return;
    }

    updatedList.forEach(product => addProductToList(product));
}

function addProductToList(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
        <div class="img-container">
            <img class="product-img" src="${product.image}" alt="${product.title}" onerror="this.src='${placeholderImg}'">
        </div>
        <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">₹${product.price.toFixed(2)}</div>
            <div class="product-actions">
                <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                <button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
            </div>
        </div>
    `;
    
    productContainer.appendChild(productCard);
}

productForm.addEventListener('submit', addProduct);
searchInput.addEventListener('input', renderApp);
filterCategory.addEventListener('change', renderApp);
sortPrice.addEventListener('change', renderApp);

window.addEventListener('DOMContentLoaded', () => {
    loadProductsFromStorage();
    renderApp();
});