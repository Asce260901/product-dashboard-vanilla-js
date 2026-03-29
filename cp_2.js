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
}

function handleError(error) {
    console.log(`An error occurred: ${error.message}`);
}

fetchProductsThen();
fetchProductsAsync();