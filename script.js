// Fetch menu data from the API
fetch('https://private-c1294-pizzaapp.apiary-mock.com/restaurants/restaurantId/menu?category=Pizza&orderBy=rank')
  .then(response => response.json())
  .then(data => {
    // Process the menu data and populate the options dynamically
    const pizzaOptions = data.menu.items;

    const sizeSelection = document.getElementById('sizeSelection');
    const typeSelection = document.getElementById('typeSelection');

    pizzaOptions.forEach(pizza => {
      const sizeInput = document.createElement('input');
      sizeInput.type = 'radio';
      sizeInput.name = 'size';
      sizeInput.value = pizza.size;
      sizeInput.id = pizza.size.toLowerCase();

      const sizeLabel = document.createElement('label');
      sizeLabel.textContent = `${pizza.size} [${pizza.price}]`;
      sizeLabel.appendChild(sizeInput);

      sizeSelection.appendChild(sizeLabel);

      const typeInput = document.createElement('input');
      typeInput.type = 'radio';
      typeInput.name = 'type';
      typeInput.value = pizza.type;
      typeInput.id = pizza.type.toLowerCase();

      const typeLabel = document.createElement('label');
      typeLabel.textContent = `${pizza.type} [${pizza.price}]`;
      typeLabel.appendChild(typeInput);

      typeSelection.appendChild(typeLabel);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Event listener for form submission
document.getElementById('form1').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get selected values from the form
  const size = document.querySelector('input[name="size"]:checked');
  const type = document.querySelector('input[name="type"]:checked');
  const crusts = Array.from(document.querySelectorAll('input[name="crust"]:checked'));

  // Calculate total cost
  let totalCost = 0;
  if (size && type) {
    totalCost += parseInt(size.value);
    totalCost += parseInt(type.value);
  }
  crusts.forEach(crust => {
    totalCost += parseInt(crust.value);
  });

  // Update output in the order table
  document.getElementById('outputSize').textContent = size ? size.value : '';
  document.getElementById('outputType').textContent = type ? type.value : '';
  document.getElementById('outputCrusting').textContent = crusts.length > 0 ? crusts.map(crust => crust.value).join(', ') : '';
  document.getElementById('price').textContent = totalCost;

  // Show the order table
  document.querySelector('.Order').style.display = 'block';
});

// Event listener for delivery button
document.getElementById('deliver-now').addEventListener('click', function (event) {
  event.preventDefault();

  // Get location details
  const estate = document.querySelector('input[name="adress"]').value;
  const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;

  // Perform validation or further processing if required

  // Simulate delivery by displaying a success message
  const deliveryMessage = document.createElement('p');
  deliveryMessage.textContent = 'Your order will be delivered to ' + estate + '. Thank you for choosing PizzaPal!';
  deliveryMessage.style.color = 'green';
  document.querySelector('.location').appendChild(deliveryMessage);

  // Hide the delivery button
  document.getElementById('deliver-now').style.display = 'none';
});
