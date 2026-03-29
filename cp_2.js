// Stores all products from the API and tracks how many are shown
let allProducts = [];
let currentIndex = 0;
const PAGE_SIZE = 5;

function fetchProductsThen() {
    fetch('https://www.course-api.com/javascript-store-products')
        .then(response => response.json())
        .then(data => {
            // Log each product's name — data is nested inside product.fields
            data.forEach(product => {
                console.log(product.fields.name);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

async function fetchProductsAsync() {
    try {
        const response = await fetch('https://www.course-api.com/javascript-store-products');
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        handleError(error);
    }
}

function displayProducts(products) {
    // Save all products and reset state
    allProducts = products;
    currentIndex = 0;

    // Clear the container and show first batch
    document.getElementById('product-container').innerHTML = '';
    loadMoreProducts();

    // Wire up the Load More button
    const btn = document.getElementById('load-more-btn');
    btn.addEventListener('click', loadMoreProducts);
}

function loadMoreProducts() {
    const container = document.getElementById('product-container');
    const btn = document.getElementById('load-more-btn');

    // Slice the next 5 products
    const nextBatch = allProducts.slice(currentIndex, currentIndex + PAGE_SIZE);

    nextBatch.forEach(product => {
        const { name, price, image } = product.fields;

        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${image[0].url}" alt="${name}">
            <div class="card-body">
                <h3>${name}</h3>
                <p class="price">$${(price / 100).toFixed(2)}</p>
            </div>
        `;
        container.appendChild(productCard);
    });

    currentIndex += PAGE_SIZE;

    // Hide button when all products are loaded
    if (currentIndex >= allProducts.length) {
        btn.style.display = 'none';
    }
}

function handleError(error) {
    console.log(`An error occurred: ${error.message}`);
}

fetchProductsThen();
fetchProductsAsync();