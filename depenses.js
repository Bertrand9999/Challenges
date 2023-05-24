document.addEventListener("DOMContentLoaded", () => {
  const initialAmount = 400;
  let remainingAmount =
    parseFloat(localStorage.getItem("remainingAmount")) || initialAmount;
  let expenseList = JSON.parse(localStorage.getItem("expenseList")) || [];

  const remainingAmountElement = document.getElementById("remainingAmount");
  const expenseListElement = document.getElementById("expenseList");

  function addExpense() {
  const expenseName = document.getElementById("expenseName").value;
  const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);

  if (expenseName && expenseAmount) {
    const expense = { name: expenseName, amount: expenseAmount };

    // Envoyer la dépense à Firebase
    db.collection('expenses').add(expense)
      .then((docRef) => {
        console.log('Dépense enregistrée avec l\'ID: ', docRef.id);
        expenseList.push({ id: docRef.id, ...expense });
        remainingAmount -= expenseAmount;
        updateRemainingAmount();
        updateExpenseList();
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de la dépense: ', error);
      });
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

  // Supprimer la dépense de Firebase
  db.collection('expenses').doc(removedExpense.id).delete()
    .then(() => {
      console.log('Dépense supprimée avec succès');
      updateRemainingAmount();
      updateExpenseList();
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression de la dépense: ', error);
    });
}


  function saveToLocalStorage() {
    localStorage.setItem("remainingAmount", remainingAmount);
    localStorage.setItem("expenseList", JSON.stringify(expenseList));
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
