// Funktion för att gå tillbaka till startsidan när knappen klickas
function goToHomePage() {
  window.location.href = "/";
}
//5a- Enklare version av addToCart utan kontroll för olika sessioner
async function addToCart(productInfo) {
  try {
    const cartRef = firebase.firestore().collection('carts').doc(userUid);
    const cartDoc = await cartRef.get();
    const cartData = cartDoc.data();

    const updatedCart = [...cartData.products, productInfo];
    await cartRef.update({ products: updatedCart });

    // Lista produkter med samma session_num som nuvarande produkt
    const productsInSameSession = listProductsBySession(productInfo.session_num);
    console.log('Produkter med samma session_num:', productsInSameSession);

    alert('Produkten har lagts till i varukorgen.');
  } catch (error) {
    console.error(error);
    alert('Det uppstod ett fel. Försök igen senare.');
  }
}

//5b- Funktion för att lista produkter med samma session_num
async function listProductsBySession(sessionNum) {
  try {
    const cartRef = firebase.firestore().collection('carts').doc(userUid);
    const cartDoc = await cartRef.get();
    const cartData = cartDoc.data();

    const productsInSameSession = cartData.products.filter(item => item.session_num === sessionNum);
    return productsInSameSession;
  } catch (error) {
    console.error(error);
    return [];
  }
}

//6- Funktion för att ta bort produkt från varukorgen och Firebase
async function removeProduct(productId, imageName) {
  try {
    // Ta bort produkten från varukorgen
    const cartRef = firebase.firestore().collection('carts').doc(userUid);
    const cartDoc = await cartRef.get();
    const cartData = cartDoc.data();
    
    const updatedCart = cartData.products.filter(item => item.id !== productId);
    await cartRef.update({ products: updatedCart });

    // Ta bort bilden från Firebase Storage
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child('orders/' + imageName); // Justera sökvägen om nödvändigt
    await imageRef.delete();

    alert('Produkten har tagits bort från varukorgen och bilden har tagits bort från Firebase Storage.');
    location.reload(); // Uppdatera sidan efter borttagning
  } catch (error) {
    console.error(error);
    alert('Det uppstod ett fel. Försök igen senare.');
  }
}

function editProduct(productId) {
  // Implementera din logik för att redigera produkten här
  // Till exempel, du kan öppna en redigeringspopup eller navigera till en redigeringsvy med produktinformationen.
  console.log("Redigerar produkt med ID: " + productId);
}


// Funktion för att räkna totalpriset för alla produkter i kundvagnen
function calculateTotalPrice() {
  var totalPrice = 0;

  // Loopa igenom alla produkter i kundvagnen
  for (var i = 0; i < ordered_items.length; i++) {
      var item = ordered_items[i];
      totalPrice += parseFloat(item.price); // Lägg till produkts prissumma till totalpriset
  }

  return totalPrice;
}

// Funktion för att uppdatera det visade totalpriset
function updateTotalPrice() {
  var totalTextElement = document.querySelector(".total-price");
  var totalPrice = calculateTotalPrice();

  // Uppdatera totalpriset på sidan
  totalTextElement.textContent = totalPrice.toFixed(2) + " sek"; // Visar totalpriset med två decimaler
}

// Anropa funktionen för att initialt visa totalpriset när sidan laddas
updateTotalPrice();

// Funktion för att hämta och visa produkterna i kundvagnen
function displayCartProducts() {
  // Hämta referens till den container där produkterna ska visas
  var cartContainer = document.querySelector(".product-list");

  // Loopa igenom ordered_items och skapa en HTML-sträng för varje produkt
  var productsHTML = "";
  for (var i = 0; i < ordered_items.length; i++) {
    var item = ordered_items[i];
    var productHTML = `
      <div class="product-row">
        <div class="product-container">
          <img src="${item.image_url}" alt="${item.name}" class="product-image">
          <div class="product-info">
            <p><strong>Id:</strong> ${item.id}</p>
            <p><strong>Namn:</strong> ${item.name}</p>
            <p><strong>Pris:</strong> ${item.price}</p>
            <p><strong>Vikt:</strong> ${item.weight}</p>
            <p><strong>Metalltyp:</strong> ${item.metal_type}</p>
          </div>
        </div>
        <div class="product-actions">
          <button onclick="removeFromCart('${item.id}', '${item.image_url}')">Ta bort</button>
          <button onclick="editProduct('${item.id}')">Redigera</button>
        </div>
      </div>
    `;
    productsHTML += productHTML;
  }

  // Uppdatera innehållet i cartContainer med produkterna
  cartContainer.innerHTML = productsHTML;
}

// Ladda produkterna när sidan laddas
window.addEventListener("DOMContentLoaded", function () {
  displayCartProducts();
});
