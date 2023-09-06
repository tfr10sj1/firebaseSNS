
   // Hämta produktinformationen från query-parametrarna
   const urlParams = new URLSearchParams(window.location.search);
   let image = urlParams.get("image");
   let id = urlParams.get("id");
   let metalType = urlParams.get("metal_type");
   let name = urlParams.get("name");
   let price = urlParams.get("price");
   let weight = urlParams.get("weight");
 
   // Uppdatera elementens innehåll med de hämtade värdena
   document.getElementById("product-image").src = image;
   document.getElementById("product-id").textContent = "Product ID: " + id;
   document.getElementById("product-metal").textContent = "Metal Type: " + metalType;
   document.getElementById("product-name").textContent = "Product Name: " + name;
   document.getElementById("product-price").textContent = "Product Price: " + price;
   document.getElementById("product-weight").textContent = "Product Weight: " + weight;

// Hämta knappen med id "save-button"
var saveButton = document.getElementById("save-button");

// Lägg till en händelselyssnare för klickhändelsen på knappen
saveButton.addEventListener("click", function() {
    // Skapa ett objekt med produktinformationen
    const productInfoData = {
        image,
        id,
        metalType,
        name,
        price,
        weight,
    };

    // Anropa saveProcessedImage och skicka med produktinformationen
    saveProcessedImage(productInfoData);
});
  