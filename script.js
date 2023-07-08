document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('delivery-details').style.display = 'block';

  fetch('db.json')
    .then(response => response.json())
    .then(data => {
      const sizeSelect = document.getElementById('size');
      const typeSelect = document.getElementById('type');
