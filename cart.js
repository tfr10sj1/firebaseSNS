// Funktion för att gå tillbaka till startsidan när knappen klickas
function goToHomePage() {
  window.location.href = "/";
}

// Funktion för att hämta produkterna från localStorage
function getOrderedItemsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('ordered_items')) || [];
}

// Funktion för att beräkna det totala priset
function calculateTotalPrice() {
  const ordered_items = getOrderedItemsFromLocalStorage();
  let totalPrice = 0;
  for (const item of ordered_items) {
      totalPrice += item.price;
  }
  return totalPrice;
}


// Funktion för att visa produkterna i kundvagnen
// cart.js
// cart.js

/// Funktion för att visa produkterna i kundvagnen
function displayCartItems(productInfo) {
  try {
   
    const cartItemsContainer = document.getElementById('cart-items'); // Hämta referensen till DOM-elementet
    if (!cartItemsContainer) {
      // Elementet 'cart-items' finns inte i DOM, avbryt funktionen
      return;
    }

    // Hämta beställda produkter från localStorage
    const ordered_items = productInfo || [];
    console.log("inside displayCartItems", ordered_items);
    // Skapa productsContainer om den inte finns
    let productsContainer = cartItemsContainer.querySelector('.products-container');

    if (!productsContainer) {
      productsContainer = document.createElement('div');
      productsContainer.className = 'products-container';
      cartItemsContainer.appendChild(productsContainer);
    }
    console.log("inside ordered_items", productInfo);
    // Loopa igenom de beställda produkterna och skapa en produktdiv för varje produkt
    for (const item of ordered_items) {
      const productDiv = document.createElement('div');
      productDiv.className = 'product-row';

      // Skapa element för produkten (t.ex. bild, namn, pris, etc.)
      // Du kan använda item-objektet här för att hämta produktinformation

      // Bild
      const productImage = document.createElement('img');
      productImage.src = item.imageBlob; // Använd bildkällan från item

      // Namn
      const productName = document.createElement('p');
      productName.innerHTML = `<strong>Namn:</strong> ${item.name}`;

      // Metal Type
      const productMetalType = document.createElement('p');
      productMetalType.innerHTML = `<strong>Metal Type:</strong> ${item.metal_type}`;

      // Pris
      const productPrice = document.createElement('p');
      productPrice.innerHTML = `<strong>Pris:</strong> ${item.price} sek`;

      // Vikt
      const productWeight = document.createElement('p');
      productWeight.innerHTML = `<strong>Vikt:</strong> ${item.weight} gram`;

      // Lägg till elementen i produktens container (productDiv)
      productDiv.appendChild(productImage);
      productDiv.appendChild(productName);
      productDiv.appendChild(productMetalType);
      productDiv.appendChild(productPrice);
      productDiv.appendChild(productWeight);

      // Lägg till produkten i kundvagnens container (productsContainer)
      productsContainer.appendChild(productDiv);
    }

    // Uppdatera det totala priset
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `${calculateTotalPrice(productInfo)} sek`;
  } catch (error) {
    console.error(error);
  }
}


// cart.js
document.addEventListener("DOMContentLoaded", function() {
  // Hämta produktinformationen från localStorage
  const productInfo = JSON.parse(localStorage.getItem('product_info'));
  console.log(productInfo)
  // Anropa displayCartItems när sidan har laddats
  displayCartItems(productInfo);
});

// Här kan du lägga till andra funktioner som är relaterade till din kundvagnslogik
