document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://course-api.com/react-store-products';
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const productDisplayElement = document.getElementById('product-display');
    const productContainerElement = document.getElementById('product-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let products = [];
    let currentIndex = 0;

    async function fetchProducts() {
        showElement(loadingElement);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            products = await response.json();
            displayProduct();
            showElement(productDisplayElement);
        } catch (error) {
            showElement(errorElement);
        } finally {
            hideElement(loadingElement);
        }
    }

    function displayProduct() {
        if (products.length === 0) return;
        const product = products[currentIndex];
        productContainerElement.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
        `;
    }

    function showElement(element) {
        element.classList.remove('hidden');
    }

    function hideElement(element) {
        element.classList.add('hidden');
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        displayProduct();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % products.length;
        displayProduct();
    });

    fetchProducts();
});


