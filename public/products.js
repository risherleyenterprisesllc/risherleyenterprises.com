const productList = [
    /*
    {
        name: "Product Name",
        price: 0,
        description: "Product description goes here.",
        image: "https://example.com/product-image.jpg",
        url: "https://example.com/product-page",
        category: "coffee" // or "mug"
    }
    */
   {
        name: "30 oz Insulated Stainless Steel Tumbler with Lid and straw Double Wall Vacuum Travel Mug, Leak Proof Coffee Cup, Keeps Drinks Hot & Cold, BPA-Free Reusable Thermal Cup for Office, Gym & Car.",
        price: 29.99,
        description: "Premium stainless steel tumbler keeps your drinks hot or cold for hours. Leak-proof design with comfortable handle and straw. Cold 24 Hours,hot 24 hours.",
        image: "https://m.media-amazon.com/images/I/512HMF4bnhL._AC_SY879_.jpg",
        url: "https://a.co/d/0cXHWPJ1",
        category: "mug"
   },
   {
        name: "12 oz Insulated Stainless Steel Tumbler with Lid and straw Double Wall Vacuum Travel Mug,Leak Proof Coffee Cup,Keeps Drinks Hot & Cold,BPA-Free Reusable Thermal Cup for Office,Gym & Car.",
        price: "???",
        description: "",
        image: "https://m.media-amazon.com/images/I/51SQcs2uslL._AC_SX679_.jpg",
        url: "https://a.co/d/0ebiO3UV",
        category: "mug"
    },
    {
        name: "Risherley Premium Ground Coffee – Gourmet Arabica Blend, Fresh Roasted, Smooth Rich Flavor,Dark Roast, Low Acidity, Perfect for Drip, French Press & Espresso (Park of 1)",
        price: "17.99 ($1.50/oz) - 10% off",
        description: "",
        image: "https://m.media-amazon.com/images/I/61-Lc2CZ+nL._SY679_.jpg",
        url: "https://a.co/d/0bYjG1UE",
        category: "coffee"
    },
    {
        name: "12 oz Insulated Stainless Steel Tumbler with Lid and straw Double Wall Vacuum Travel Mug,Leak Proof Coffee Cup,Keeps Drinks Hot & Cold,BPA-Free Reusable Thermal Cup for Office,Gym & Car.",
        price: 14.99,
        description: "",
        image: "https://m.media-amazon.com/images/I/51+c6bRNDmL._AC_SX679_.jpg",
        url: "https://a.co/d/068bB2o1",
        category: "mug"
    },
    {
        name: "30 oz Insulated Stainless Steel Tumbler with Lid and straw Double Wall Vacuum Travel Mug,Leak Proof Coffee Cup,Keeps Drinks Hot & Cold,BPA-Free Reusable Thermal Cup for Office,Gym & Car.",
        price: 29.99,
        description: "Material: Stainless Steel,Recycled plastic. Capacity: 1.9lb. Special Feature: Adjustable.",
        image: "https://m.media-amazon.com/images/I/51SAUE6Xj-L._AC_SX679_.jpg",
        url: "https://a.co/d/05Ed3REr",
        category: "mug"
    },
    {
        name: "40 oz Insulated Stainless Steel Tumbler with Lid and straw Double Wall Vacuum Travel Mug,Leak Proof Coffee Cup,Keeps Drinks Hot & Cold,BPA-Free Reusable Thermal Cup for Office,Gym & Car.",
        price: 35.99,
        description: "Hot more than 24 hours, cold more than 8 hours.",
        image: "https://m.media-amazon.com/images/I/51h300tQLiL._AC_SY879_.jpg",
        url: "https://a.co/d/03JrHF2e",
        category: "mug"
    },
    {
        name: "40 oz Insulated Stainless Steel Tumbler with Lid and straw Double Wall Vacuum Travel Mug,Leak Proof Coffee Cup,Keeps Drinks Hot & Cold,BPA-Free Reusable Thermal Cup for Office,Gym & Car.",
        price: 35.99,
        description: "Hot more than 24 hours, cold more than 8 hours.",
        image: "https://m.media-amazon.com/images/I/512HMF4bnhL._AC_SY879_.jpg",
        url: "https://a.co/d/0dHVGk17",
        category: "mug"
    },
    {
        name: "Risherley Premium Ground Coffee – Gourmet Arabica Blend, Fresh Roasted, Smooth Rich Flavor,Dark Roast, Low Acidity, Perfect for Drip, French Press & Espresso (PARK OF 2)",
        price: "44.99 ($1.87/oz)",
        description: "",
        image: "https://m.media-amazon.com/images/I/614CrfCozVL._SX679_PIbundle-2,TopRight,0,0_AA679SH20_.jpg",
        url: "https://a.co/d/0gYie1wl",
        category: "coffee"
    },
    {
        name: "Risherley Premium Ground Coffee – Gourmet Arabica Blend, Fresh Roasted, Smooth Rich Flavor,Dark Roast, Low Acidity, Perfect for Drip, French Press & Espresso (PARK OF 4)",
        price: "84.99 ($1.77/oz)",
        description: "",
        image: "https://m.media-amazon.com/images/I/51kMzTn9fHL._SY679_PIbundle-4,TopRight,0,0_SX452SY679SH20_.jpg",
        url: "https://a.co/d/0g1gKnaz",
        category: "coffee"
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