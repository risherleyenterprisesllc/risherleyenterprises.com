const productList = [
  {
    name: "RISHERLEY PREMIUM GROUND COFFEE,dark espresso roast,arabica and Robusta blend,12 oz (Park of 1)",
    price: 25,
    description: "",
    image: "https://m.media-amazon.com/images/I/41LdBY90ByL.jpg",
    url: "https://a.co/d/03itoJdP",
  },
  {
    name: "TUMBLER WITH HANDLE AND STRAW 30 OZ,WHITE,100% LEAK PROOF,BPA-FREE,constructed with durable stainless steel,ideal to keep your drink hot or cold as you please.",
    price: 35,
    description: "",
    image: "https://m.media-amazon.com/images/I/51ZnHG752ZL._AC_SY879_.jpg",
    url: "https://a.co/d/0bsqYgoL",
  },
  {
    name: "RISHERLEY PREMIUM GROUND COFFEE,dark espresso roast,arabica and Robusta blend,12 oz (PARK OF 4)",
    price: 90,
    description: "",
    image:
      "https://m.media-amazon.com/images/I/71F+KUoj8tL._SX679_PIbundle-4,TopRight,0,0_SX679SY602SH20_.jpg",
    url: "https://a.co/d/07OuEABZ",
  },
  {
    name: "RISHERLEY PREMIUM GROUND COFFEE,dark espresso roast,arabica and Robusta blend,12 oz (PARK OF 2)",
    price: 48,
    description: "",
    image:
      "https://m.media-amazon.com/images/I/61cSQFhch3L._SX522_PIbundle-2,TopRight,0,0_SX522SY662SH20_.jpg",
    url: "https://a.co/d/07tqNatN",
  },
  {
    name: "TUMBLER WITH HANDLE AND STRAW 40 OZ,WHITE,100 LEAK PROOF BPA-FREE,constructed with durable stainless steel,ideal to keep your drink hot or cold as you please.",
    price: 45,
    description: "",
    image: "https://m.media-amazon.com/images/I/51ZnHG752ZL._AC_SL1287_.jpg",
    url: "https://a.co/d/004nOvii",
  },
  {
    name: "TRUMBLER WITH HANDLE AND STRAW,30 OZ,GRAY,100% LEAK PROOF BPA-FREE,CONSTRUCTED WITH DURABLE MATERIALS,NUMBER ONE TO KEEP YOUR BEVERAGES HOT OR COLD AS YOU PLEASE.",
    price: 35,
    description: "",
    image: "https://m.media-amazon.com/images/I/61XLqEFbYWL._AC_SX679_.jpg",
    url: "https://a.co/d/078aYeFw",
  },
  {
    name: "TUMBLER WITH HANDLE AND STRAW 40 OZ,BEIGE,100 LEAK PROOF BPA-FREE,constructed with durable stainless steel,ideal to keep your drink hot or cold as you please.",
    price: 45,
    description: "",
    image:
      "https://m.media-amazon.com/images/I/61rsJsHLLsL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    url: "https://a.co/d/0cWxnKQu",
  },
];

const container = document.getElementById("products");

productList.forEach((product) => {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${product.image}" style="width:100%; border-radius:10px;">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <strong>$${product.price}</strong>
    <button onclick="buyProduct('${product.url}')">
      Buy Now
    </button>
  `;

  container.appendChild(div);
});

function buyProduct(url) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.click();
}
