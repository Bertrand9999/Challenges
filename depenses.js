document.addEventListener("DOMContentLoaded", () => {
  const initialAmount = 400;
  let remainingAmount = initialAmount;
  let expenseList = [];

  const remainingAmountElement = document.getElementById("remainingAmount");
  const expenseListElement = document.getElementById("expenseList");

  function addExpense() {
    const expenseName = document.getElementById("expenseName").value;
    const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);

    if (expenseName && expenseAmount) {
      const expense = { name: expenseName, amount: expenseAmount };

      // Ajouter la dépense à la liste
      expenseList.push(expense);
      remainingAmount -= expenseAmount;

      updateRemainingAmount();
      updateExpenseList();
      clearInputFields();
    } else {
      alert("Veuillez entrer un nom et un montant valide pour la dépense.");
    }
  }

  function updateRemainingAmount() {
    remainingAmountElement.textContent = remainingAmount.toFixed(2);
  }

  function updateExpenseList() {
    expenseListElement.innerHTML = "";

    expenseList.forEach((expense, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${expense.name} - ${expense.amount} €`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Supprimer";
      removeButton.onclick = () => removeExpense(index);

      listItem.appendChild(removeButton);
      expenseListElement.appendChild(listItem);
    });
  }

  function removeExpense(index) {
    const removedExpense = expenseList.splice(index, 1)[0];
    remainingAmount += removedExpense.amount;

    updateRemainingAmount();
    updateExpenseList();
  }

  function clearInputFields() {
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
  }

  const addExpenseButton = document.getElementById("addExpenseButton");
  addExpenseButton.addEventListener("click", addExpense);

  updateRemainingAmount();
  updateExpenseList();
});
