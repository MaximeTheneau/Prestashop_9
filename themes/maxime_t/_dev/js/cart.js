// cart.js

document.addEventListener('DOMContentLoaded', () => {
  // Fonction pour charger le panier
  function loadCart() {
    fetch('/index.php?controller=cart&ajax=true', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const cartContainer = document.querySelector('#cart-container');
        cartContainer.innerHTML = '';

        if (data.products.length > 0) {
          data.products.forEach((product) => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-product');
            productElement.innerHTML = `
                      <div class="product-name">${product.name}</div>
                      <div class="product-quantity">Quantité: ${product.quantity}</div>
                      <div class="product-price">Prix: ${product.price}</div>
                  `;
            cartContainer.appendChild(productElement);
          });
        } else {
          cartContainer.innerHTML = '<p>Votre panier est vide.</p>';
        }
      })
      .catch((error) => {
        console.error('Erreur:', error);
      });
  }

  // Appeler la fonction pour charger le panier
  loadCart();
});
