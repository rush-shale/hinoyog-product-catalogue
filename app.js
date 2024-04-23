document.addEventListener("DOMContentLoaded", function() {
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        const ProductCardsContainer = document.getElementById("product-cards");
        const ProductListItemsContainer = document.getElementById("cart-items");
        const ProductList = {}; // Object to store cart items and their quantities
  
ProductCardsContainer.classList.add("card-group"); // Adding card-group class to ProductCardsContainer

data.products.forEach(Product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    
    <img src="${Product.Product_Image}" class="card-img-top" alt="${Product.Product_Name}">
    <div class="card-body">
      <h5 class="card-title">${Product.Product_Name}</h5>
      <p class="card-text">${Product.Product_Description}</p>
      <p class="card-text">Price: $${Product.Product_Price.toFixed(2)}</p>
      <p class="card-text"><small class="text-body-secondary">Date Added: ${Product.Product_Date_Added}</small></p>
      <p class="card-text"><small class="text-body-secondary">Expiration Date: ${Product.Product_Expiration_Date}</small></p>
      <button class="btn btn-primary add-to-cart" data-product="${Product.Product_Name}">Add to Cart</button>
    </div>
  `;
    ProductCardsContainer.appendChild(card);
  });



    // Event listener for Add to Cart buttons
    ProductCardsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("add-to-cart")) {
            const ProductName = event.target.getAttribute("data-product");
            if (ProductList[ProductName]) {
                ProductList[ProductName]++;
            } else {
                ProductList[ProductName] = 1;
            }
            updateProductListDisplay();
          }
        });

        // Function to update the ProductList display
        function updateProductListDisplay() {
            ProductListItemsContainer.innerHTML = "";

          Object.keys(ProductList).forEach(ProductName => {
            const quantity = ProductList[ProductName];
            const li = document.createElement("li");
            li.textContent = `${ProductName}: ${quantity}`;
            ProductListItemsContainer.appendChild(li);
        });
      
        // Update the count element to display the number of unique items in the ProductList
        document.getElementById('count').style.display = 'flex'; // Assuming you're using flexbox
        document.getElementById('count').innerText = Object.keys(ProductList).length;
      }
    })
    .catch(error => {
        console.error("Error fetching products:", error);
      });
           const ProductListLink = document.querySelector('.cart');
           const ProductListItems = document.getElementById('cart-items');
    
           // Prevent default behavior on click
        ProductListLink.addEventListener('click', function(event) {
        event.preventDefault();

        // Toggle display of ProductListItems
        if (ProductListItems.style.display === 'none') {
            ProductListItems.style.display = 'flex';
        } else {
            ProductListItems.style.display = 'none';
        }
    });
});