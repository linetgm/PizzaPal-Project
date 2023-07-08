document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('delivery-details').style.display = 'block';

  fetch('db.json')
    .then(response => response.json())
    .then(data => {
      const sizeSelect = document.getElementById('size');
      const typeSelect = document.getElementById('type');

       // Populate size options
       data.pizzas.sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size.price;
        option.textContent = `${size.name} [$${size.price}]`;
        sizeSelect.appendChild(option);
      });

      / Populate type options
      data.pizzas.types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.price;
        option.textContent = `${type.name} [$${type.price}]`;
        typeSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.log(error);
      // Show alert for error in data fetching
      alert('An error occurred while fetching pizza data.');
    });
});


document.getElementById("pizza-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get selected values
  var size = document.getElementById("size").value;
  var type = document.getElementById("type").value;
  var crustings = [];
  var crustingsInputs = document.getElementsByName("crustings");
  for (var i = 0; i < crustingsInputs.length; i++) {
    if (crustingsInputs[i].checked) {
      crustings.push(crustingsInputs[i].value);
    }
  }

  // Calculate total cost
  var crustingsCost = crustings.length * 50;
  var totalCost = parseInt(size) + parseInt(type) + crustingsCost;

  // Display selections in the table
  document.getElementById('size-selection').textContent = document.getElementById('size').options[document.getElementById('size').selectedIndex].text;
  document.getElementById('type-selection').textContent = document.getElementById('type').options[document.getElementById('type').selectedIndex].text;
  document.getElementById('crustings-selection').textContent = crustings.join(', ');
  document.getElementById('total-cost').textContent = `Ksh ${totalCost}`;
});

document.getElementById("submit-button").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get selected values
  var size = document.getElementById("size").value;
  var type = document.getElementById("type").value;
  var crustings = [];
  var crustingsInputs = document.getElementsByName("crustings");
  for (var i = 0; i < crustingsInputs.length; i++) {
    if (crustingsInputs[i].checked) {
      crustings.push(crustingsInputs[i].value);
    }
  }

  // Get location details
  var estate = document.getElementById("estate").value;
  var phoneNumber = document.getElementById("phone-number").value;

  // Display alert with order details
  var message = "SUCCESSFULY BOOKED:\n";
  message += "Size: " + size + "\n";
  message += "Type: " + type + "\n";
  message += "Crustings: " + crustings.join(", ") + "\n";
  message += "ESTATE: " + estate + "\n";
  message += "Phone Number: " + phoneNumber;
 

  alert(message);
});
