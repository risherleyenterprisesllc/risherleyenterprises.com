const productList = [
  {
    name: "Business Consulting",
    price: 99,
    description: "Professional consulting services",
    image: "https://via.placeholder.com/250"
  },
  {
    name: "Project Management",
    price: 149,
    description: "End-to-end project handling",
    image: "https://via.placeholder.com/250"
  }
];

const container = document.getElementById("products");

productList.forEach(product => {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${product.image}" style="width:100%; border-radius:10px;">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <strong>$${product.price}</strong>
    <button onclick="buyProduct('${product.name}', ${product.price})">
      Buy Now
    </button>
  `;

  container.appendChild(div);
});

function buyProduct(name, price) {
  const user = firebase.auth().currentUser;

  if (!user) {
    alert("Please login first!");
    return;
  }

  db.collection("orders").add({
    user: user.email,
    product: name,
    price: price,
    created: new Date()
  });

  alert("✅ Purchase recorded (demo)");
}