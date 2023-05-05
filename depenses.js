let initialAmount = 1000;
let remainingAmount = initialAmount;
let itemList = [];

function addItem() {
  const itemName = document.getElementById("itemName").value;
  const itemPrice = parseFloat(document.getElementById("itemPrice").value);

  if (itemName && itemPrice && remainingAmount >= itemPrice) {
    itemList.push({ name: itemName, price: itemPrice });
    remainingAmount -= itemPrice;
    updateRemainingAmount();
    updateItemList();
  } else {
    alert("Vérifiez le nom et le prix de l'élément, ou vérifiez si vous avez suffisamment d'argent restant.");
  }
}

function updateRemainingAmount() {
  document.getElementById("remainingAmount").textContent = remainingAmount.toFixed(2);
}

function updateItemList() {
  const itemListElement = document.getElementById("itemList");
  itemListElement.innerHTML = "";

  itemList.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} €`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Supprimer";
    removeButton.onclick = () => removeItem(index);
    li.appendChild(removeButton);
    itemListElement.appendChild(li);
  });
}

function removeItem(index) {
  remaining
