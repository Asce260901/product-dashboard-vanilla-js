function fetchProductsThen() {
    fetch('https://www.course-api.com/javascript-store-products')
        .then(response => response.json())
        .then(data => {
            // Log each product's name
            data.forEach(product => {
                console.log(product.name);
            });
        })
        .catch(error => {
            // Handle any errors
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
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    
    products.slice(0, 5).forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${(product.price / 100).toFixed(2)}</p>
        `;
        container.appendChild(productCard);
    });
}

function handleError(error) {
    console.log(`An error occurred: ${error.message}`);
}

fetchProductsThen();
fetchProductsAsync();