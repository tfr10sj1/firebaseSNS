// Funktion för att gå tillbaka till startsidan när knappen klickas
function goToHomePage() {
  window.location.href = "index.html";
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
function displayCartItems(productInfo) {
  try {
    const cartItemsContainer = document.getElementById('cart-items'); // Hämta referensen till DOM-elementet
    if (!cartItemsContainer) {
      // Elementet 'cart-items' finns inte i DOM, avbryt funktionen
      return;
    }

    // Skapa en produktdiv för den enda produkten i kundvagnen
    const productDiv = document.createElement('div');
    productDiv.className = 'product-row';

    // Skapa en bildtagg för produkten
    const productImage = document.createElement('img');
    productImage.className = 'product-image';
    productImage.src = productInfo.imageBlob; // Lägg till bildkällan här
    //productImage.alt = productInfo.name; // Använd namnet från productInfo
    productDiv.appendChild(productImage);

    // Skapa en div för produktnamn, pris och annan information
    const productInfoDiv = document.createElement('div');
    productInfoDiv.className = 'product-info';

    // Skapa en rubrik för produktnamnet
    const productName = document.createElement('p');
    productName.innerHTML = `<strong>Namn:</strong> ${productInfo.name}`;
    productInfoDiv.appendChild(productName);

    // Skapa en element för priset
    const productPrice = document.createElement('p');
    productPrice.innerHTML = `<strong>Pris:</strong> ${productInfo.price} sek`;
    productInfoDiv.appendChild(productPrice);

    // Skapa en element för metalltypen (om den finns)
    if (productInfo.metal_type) {
      const productMetalType = document.createElement('p');
      productMetalType.innerHTML = `<strong>Metal Type:</strong> ${productInfo.metal_type}`;
      productInfoDiv.appendChild(productMetalType);
    }

    // Skapa en element för vikten (om den finns)
    if (productInfo.weight) {
      const productWeight = document.createElement('p');
      productWeight.innerHTML = `<strong>Vikt:</strong> ${productInfo.weight} gram`;
      productInfoDiv.appendChild(productWeight);
    }

    // Lägg till produktnamn, pris och annan information i produktens container (productDiv)
    productDiv.appendChild(productInfoDiv);

    // Lägg till produkten i kundvagnens container (cartItemsContainer)
    cartItemsContainer.appendChild(productDiv);

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
