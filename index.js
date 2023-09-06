// Import the functions you need from the SDKs you need
// Importera de nödvändiga funktionerna från Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI_bZFy1g73Hq_SLZcgy3Y0w4SWPOmAu0",
  authDomain: "sns-jewllery.firebaseapp.com",
  databaseURL: "https://sns-jewllery-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sns-jewllery",
  storageBucket: "sns-jewllery.appspot.com",
  messagingSenderId: "390632077656",
  appId: "1:390632077656:web:a5b84a0597da42c78c8d2d",
  measurementId: "G-VR33F4VQP4"
};

// Initialisera Firebase-appen
const app = initializeApp(firebaseConfig);

// Hämta en referens till Firebase Storage
const storage = getStorage(app);

// Hämta en referens till Firestore-databasen
const db = getFirestore(app);

// Funktion för att hämta och visa bilder och text från Firestore och Firebase Storage
async function getAndDisplayImages() {
  try {
    // Hämta bilder från Firestore
    const querySnapshot = await getDocs(collection(db, "webshop"));

    // Hämta bildbehållaren på sidan
    const imageContainer = document.getElementById("image-container");

    // Hämta alla bild-URL:er parallellt
    const imageUrls = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const imageFilename = data.image_filename;

        if (imageFilename) {
          const imageRef = ref(storage, "images/" + imageFilename);
          return {
            imageUrl: await getDownloadURL(imageRef),
            data: {
              id: data.id,
              metal_type: data.metal_type,
              name: data.name,
              price: data.price,
              weight: data.weight,
            },
          };
        } else {
          console.error("Image name is undefined or missing in Firestore document.");
          return null; // Returnera null för att markera problemet
        }
      })
    );

    // Rensa bildbehållaren om det finns element i den
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }

    // Skapa element för varje bild och dess information
    imageUrls.forEach((item) => {
      if (item) {
        const { imageUrl, data } = item;

        const imageLink = document.createElement("a");
        imageLink.href = `processImage.html?image=${encodeURIComponent(imageUrl)}&id=${data.id}&metal_type=${data.metal_type}&name=${encodeURIComponent(data.name)}&price=${data.price}&weight=${data.weight}`;

        const image = document.createElement("img");
        image.src = imageUrl;

        const metalTypeElement = document.createElement("p");
        metalTypeElement.textContent = "Metal Type: " + data.metal_type;

        const nameElement = document.createElement("p");
        nameElement.textContent = "Name: " + data.name;

        const weightElement = document.createElement("p");
        weightElement.textContent = "Weight: " + data.weight;

        const priceElement = document.createElement("p");
        priceElement.textContent = "Price: " + data.price;

        imageLink.appendChild(image);
        imageLink.appendChild(metalTypeElement);
        imageLink.appendChild(nameElement);
        imageLink.appendChild(weightElement);
        imageLink.appendChild(priceElement);

        imageContainer.appendChild(imageLink);
      }
    });
  } catch (error) {
    console.error("Error getting data from Firestore:", error);
  }
}


// Använd funktionen för att hämta och visa bilder och text
getAndDisplayImages();



// Lyssna på klick för att ta bort produkt från varukorgen
document.addEventListener('click', async function(event) {
  if (event.target.classList.contains('remove-item')) {
    const itemId = event.target.getAttribute('data-item-id');
    await removeItemFromCart(itemId);
  }
});

// Lyssna på klick för att visa varukorgen
document.addEventListener('click', async function(event) {
  if (event.target.classList.contains('view-cart')) {
    showCart();
  }
});
