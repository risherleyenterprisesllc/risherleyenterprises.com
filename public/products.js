const productList = [
    {
        name: "RISHERLEY PREMIUM GROUND COFFEE, dark espresso roast, arabica and Robusta blend, 12 oz (Pack of 1)",
        price: 25,
        description: "Rich, aromatic dark espresso roast coffee. A perfect blend of Arabica and Robusta beans for a bold flavor experience.",
        image: "https://m.media-amazon.com/images/I/41LdBY90ByL.jpg",
        url: "https://a.co/d/03itoJdP",
        category: "coffee"
    },
    {
        name: "TUMBLER WITH HANDLE AND STRAW, 30 oz, White, 100% Leak Proof, BPA-Free",
        price: 35,
        description: "Premium stainless steel tumbler keeps your drinks hot or cold for hours. Leak-proof design with comfortable handle and straw.",
        image: "https://m.media-amazon.com/images/I/51ZnHG752ZL._AC_SY879_.jpg",
        url: "https://a.co/d/0bsqYgoL",
        category: "mug"
    },
    {
        name: "RISHERLEY PREMIUM GROUND COFFEE, dark espresso roast, 12 oz (Pack of 4)",
        price: 90,
        description: "Bundle pack of 4 premium ground coffee bags. Perfect for coffee lovers who want to stock up on their favorite blend.",
        image: "https://m.media-amazon.com/images/I/71F+KUoj8tL._SX679_PIbundle-4,TopRight,0,0_SX679SY602SH20_.jpg",
        url: "https://a.co/d/07OuEABZ",
        category: "coffee"
    },
    {
        name: "RISHERLEY PREMIUM GROUND COFFEE, dark espresso roast, 12 oz (Pack of 2)",
        price: 48,
        description: "Double pack of our premium ground coffee. Great value for everyday coffee enjoyment.",
        image: "https://m.media-amazon.com/images/I/61cSQFhch3L._SX522_PIbundle-2,TopRight,0,0_SX522SY662SH20_.jpg",
        url: "https://a.co/d/07tqNatN",
        category: "coffee"
    },
    {
        name: "TUMBLER WITH HANDLE AND STRAW, 40 oz, White, 100% Leak Proof, BPA-Free",
        price: 45,
        description: "Large 40 oz tumbler perfect for all-day hydration. Premium stainless steel construction with leak-proof lid.",
        image: "https://m.media-amazon.com/images/I/51ZnHG752ZL._AC_SL1287_.jpg",
        url: "https://a.co/d/004nOvii",
        category: "mug"
    },
    {
        name: "TUMBLER WITH HANDLE AND STRAW, 30 oz, Gray, 100% Leak Proof, BPA-Free",
        price: 35,
        description: "Sleek gray tumbler with handle and straw. Perfect for hot coffee or iced beverages.",
        image: "https://m.media-amazon.com/images/I/61XLqEFbYWL._AC_SX679_.jpg",
        url: "https://a.co/d/078aYeFw",
        category: "mug"
    },
    {
        name: "TUMBLER WITH HANDLE AND STRAW, 40 oz, Beige, 100% Leak Proof, BPA-Free",
        price: 45,
        description: "Elegant beige tumbler that keeps beverages at the perfect temperature. Durable and stylish.",
        image: "https://m.media-amazon.com/images/I/61rsJsHLLsL._AC_SY300_SX300_QL70_FMwebp_.jpg",
        url: "https://a.co/d/0cWxnKQu",
        category: "mug"
    }
];

const container = document.getElementById("products");

function renderProducts(category = "all") {
    const filteredProducts = category === "all" 
        ? productList 
        : productList.filter(product => product.category === category);
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="buyProduct('${product.url}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/400x400/1a1a2e/white?text=Product'">
                <span class="product-badge">${product.category === "coffee" ? "☕ Coffee" : "🥤 Tumbler"}</span>
            </div>
            <div class="product-info">
                <h3 title="${product.name.replace(/"/g, '&quot;')}">${truncateText(product.name, 80)}</h3>
                <p style="color: #6c757d; font-size: 0.85rem; margin: 0.5rem 0;">${truncateText(product.description, 100)}</p>
                <div class="product-price">$${product.price}</div>
                <button class="product-button" onclick="event.stopPropagation(); buyProduct('${product.url}')">
                    Buy Now <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function buyProduct(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter');
        renderProducts(category);
    });
});

// Initial render
renderProducts('all');