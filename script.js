document.addEventListener("DOMContentLoaded", () => {
  // Code to be executed after the DOM is loaded

  // Get form element
  const form = document.getElementById("form1");

  // Get output elements
  const outputSize = document.getElementById("outputSize");
  const outputType = document.getElementById("outputType");
  const outputCrusting = document.getElementById("outputCrusting");
  const price = document.getElementById("price");

  // Get deliver button
  const deliverButton = document.getElementById("deliver");

  // Get deliver-now button
  const deliverNowButton = document.getElementById("deliver-now");

  // Fetch menu data from API
  fetch("https://private-c1294-pizzaapp.apiary-mock.com/restaurants/2/menu")
    .then(response => response.json())
    .then(menuData => {
      console.log("Menu Data:", menuData);
      
      // Add event listener to submit button
      document.getElementById("submit").addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission

        // Get selected size
        const sizeSelection = document.querySelector('input[name="size"]:checked');
        const size = sizeSelection.value;

        // Get selected type
        const typeSelection = document.querySelector('input[name="type"]:checked');
        const type = typeSelection.value;

        // Get selected crustings
        const crustings = Array.from(document.querySelectorAll('input[name="crust"]:checked')).map(crust => crust.value);

        // Calculate total cost
        const totalCost = calculateTotalCost(size, type, crustings, menuData);

        // Update output elements
        outputSize.textContent = size;
        outputType.textContent = type;
        outputCrusting.textContent = crustings.join(", ");
        price.textContent = totalCost;

        // Show deliver button
        deliverButton.style.display = "block";

        console.log("Form submitted!");
        console.log("Size: " + size);
        console.log("Type: " + type);
        console.log("Crustings: " + crustings);
        console.log("Total Cost: " + totalCost);
      });
    })
    .catch(error => {
      console.log("Error fetching menu data:", error);
    });

  // Add event listener to deliver button
  deliverButton.addEventListener("click", () => {
    // Code to deliver the pizza
    alert("Your pizza will be delivered soon!");

    console.log("Pizza delivered!");
  });

  // Add event listener to deliver-now button
  document.querySelector('form').addEventListener("submit", (e) => {
    // Get location details
    e.preventDefault()
    let estate = e.target.address.value
    let phoneNumber = e.target.phoneNumber.value
    e.target.reset()


    // Code to deliver the pizza to the specified location
    alert("Your pizza will be delivered to " + estate + ". Contact number: " + phoneNumber);

    console.log("Pizza delivered to: " + estate);
    console.log("Contact number: " + phoneNumber);
  });

  // Function to calculate the total cost
  const calculateTotalCost = (size, type, crustings, menuData) => {
    const sizeCost = getSizeCost(size, menuData.sizes);
    const typeCost = getTypeCost(type, menuData.types);
    const crustingsCost = crustings.length * menuData.crustingsCost;

    return sizeCost + typeCost + crustingsCost;
  };

  // Function to get the cost based on the size
  const getSizeCost = (size, sizes) => {
    const selectedSize = sizes.find(s => s.name === size);
    return selectedSize ? selectedSize.price : 0;
  };

// Function to get the cost based on the type
  const getTypeCost = (type, types) => {
    const selectedType = types.find(t => t.name === type);
    return selectedType ? selectedType.price : 0;
  };
});
