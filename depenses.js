const initialAmount = 400;
let remainingAmount = parseFloat(localStorage.getItem("remainingAmount")) || initialAmount;
let itemList = JSON.parse(localStorage.getItem("itemList")) || [];
let validatedExpensesList = JSON.parse(localStorage.getItem("validatedExpensesList")) || [];


function addItem() {
  const itemName = document.getElementById("itemName").value;
  const itemPrice = parseFloat(document.getElementById("itemPrice").value);

  if (itemName && itemPrice && remainingAmount >= itemPrice) {
    itemList.push({ name: itemName, price: itemPrice });
    remainingAmount -= itemPrice;
    updateRemainingAmount();
    updateItemList();
    saveToLocalStorage();
  } else {
    alert("Vérifiez le nom et le prix de l'élément, ou vérifiez si vous avez suffisamment d'argent restant.");
  }
}

function updateValidatedExpensesList() {
  const validatedExpensesListElement = document.getElementById("validatedExpensesList");
  validatedExpensesListElement.innerHTML = "";

  validatedExpensesList.forEach((expense, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${expense.name} - ${expense.price} €`;
    validatedExpensesListElement.appendChild(listItem);
  });
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
  remainingAmount += itemList[index].price;
  itemList.splice(index, 1);
  updateRemainingAmount();
  updateItemList();
  saveToLocalStorage();
}

function validateExpenses() {
  if (itemList.length === 0) {
    alert("Le panier est vide.");
    return;
  }

  itemList.forEach((item) => {
    validatedExpensesList.push(item);
  });

  itemList = [];
  updateRemainingAmount();
  updateItemList();
  updateValidatedExpensesList();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("remainingAmount", remainingAmount);
  localStorage.setItem("itemList", JSON.stringify(itemList));
}

updateRemainingAmount();
updateItemList();
updateValidatedExpensesList();
