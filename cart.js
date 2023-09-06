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


