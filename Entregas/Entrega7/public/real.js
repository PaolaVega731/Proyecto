const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  socket.on("products", (updatedProducts) => {
    renderProducts(updatedProducts);
  });

  // Agregar un manejador de eventos a los botones "ADD TO CART"
  document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.pid; 
      addToCart(productId);
    });
  });
});

function renderProducts(products) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");

    productElement.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.photo}" alt="${product.title}">
      <p>Precio: $${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button class="btn btn-add-to-cart" data-pid="${product.pid}">ADD TO CART</button> 
    `;
    productsContainer.appendChild(productElement);
  });
}

async function addToCart(productId) {
  try {
    const response = await fetch('/api/cart/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId })
    });

    if (response.ok) {
      alert('Product added to cart successfully!');
    } else {
      const errorMessage = await response.json();
      alert(errorMessage.message);
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    alert('An error occurred while adding the product to cart');
  }
}
