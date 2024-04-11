//The element
const exact = document.getElementById("price").innerHTML;
const stockPrice = () => {
  let change = Math.random() * 100;
  let value = (Math.random() * 70 - change).toFixed(2);
  let price = document.getElementById("price");
  price.innerHTML = exact - value;
  return value;
};

// setInterval(stockPrice, 5000);
