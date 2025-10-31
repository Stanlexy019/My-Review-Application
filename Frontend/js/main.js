const apiUrl = "http://51.20.104.192:5000/api/products";
const productContainer = document.getElementById("product-list");

async function loadProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();

    productContainer.innerHTML = "";

    products.forEach((product) => {
      const card = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <button class="view-btn">View Details</button>
          <strong>$${product.price}</strong>
        </div>
      `;
      productContainer.innerHTML += card;
    });
  } catch (error) {
    console.error("Failed to load products:", error);
    productContainer.innerHTML = "<p>⚠️ Failed to load products</p>";
  }
}

loadProducts();
