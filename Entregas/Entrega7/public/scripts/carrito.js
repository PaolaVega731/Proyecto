const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
addToCartButtons.forEach(button => {
  button.addEventListener("click", async () => {
    try {
      const productId = button.dataset.pid; 
      const cantidad = parseInt(prompt("Ingrese la cantidad"));
      if (isNaN(cantidad) || cantidad <= 0) {
        alert("Cantidad inválida");
        return;
      }

      const data = {
        productId: productId,
        cantidad: cantidad
      };

      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      let response = await fetch("/carrito/agregar", opts);
      response = await response.json();
      alert(response.message);

    } catch (error) {
      alert(error.message);
    }
  });
});


const removeFromCartButtons = document.querySelectorAll(".btn-remove-from-cart");
removeFromCartButtons.forEach(button => {
  button.addEventListener("click", async () => {
    try {
      const productId = button.dataset.pid; 
      const data = {
        productId: productId
      };
      const opts = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      let response = await fetch("/carrito/eliminar", opts);
      response = await response.json();
      alert(response.message);

    } catch (error) {
      alert(error.message);
    }
  });
});
