// Fetch data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');

        // Loop through each product in the JSON data
        (data?.products || []).forEach(product => {
            // Create a card element for each product
            const card = document.createElement('div');
            card.classList.add('col-lg-4', 'col-md-6', 'mb-4');

            // Construct card HTML
            card.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                        <button class="btn btn-primary" id="addToCartBtn${product.id}" onclick="addToCart('${product.id}')">Add to Cart</button>
            <span id="clickCount${product.id}">0</span> Clicks
                    </div>
                </div>
            `;

            // Append card to the product list
            productList.appendChild(card);
        });
    })
    .catch(error => console.error('', error));

    function addToCart(productId) {
        let clickCount = parseInt(document.getElementById(`clickCount${productId}`).innerText);
        clickCount++;
        document.getElementById(`clickCount${productId}`).innerText = clickCount;
      }
