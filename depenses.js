document.addEventListener("DOMContentLoaded", () => {
  const initialAmount = 400;
  let remainingAmount =
    parseFloat(localStorage.getItem("remainingAmount")) || initialAmount;
  let itemList = JSON.parse(localStorage.getItem("itemList")) || [];
  let validatedExpensesList =
    JSON.parse(localStorage.getItem("validatedExpensesList")) || [];

  // Initialiser Firebase
  firebase.initializeApp(firebaseConfig);

  // Obtenir une référence à Firestore
  var db = firebase.firestore();

  function addItem() {
    const itemName = document.getElementById("itemName").value;
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);

    if (itemName && itemPrice && remainingAmount >= itemPrice) {
      const item = { name: itemName, price: itemPrice };
      itemList.push(item);
      remainingAmount -= itemPrice;
      
      // Envoyer l'objet à Firestore
      db.collection('depenses').add({
          nom: item.name,
          prix: item.price,
          date: firebase.firestore.Timestamp.fromDate(new Date())
      })
      .then(function(docRef) {
          console.log('Dépense enregistrée avec l\'ID: ', docRef.id);
      })
      .catch(function(error) {
          console.error('Erreur lors de l\'ajout de la dépense: ', error);
      });

      updateRemainingAmount();
      updateItemList();
      saveToLocalStorage();
    } else {
      alert(
        "Vérifiez le nom et le prix de l'élément, ou vérifiez si vous avez suffisamment d'argent restant."
      );
    }
  }

  // Reste du script...
});


  function updateValidatedExpensesList() {
    const validatedExpensesListElement = document.getElementById(
      "validatedExpensesList"
    );
    validatedExpensesListElement.innerHTML = "";

    validatedExpensesList.forEach((expense, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${expense.name} - ${expense.price} €`;
      validatedExpensesListElement.appendChild(listItem);
    });
  }

  function updateRemainingAmount() {
  document.getElementById("remainingAmount").textContent = remainingAmount.toFixed(2);
  document.getElementById("initialAmount").textContent = initialAmount.toFixed(2);

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
    if (itemList.length > 0) {
      validatedExpensesList = validatedExpensesList.concat(itemList);
      localStorage.setItem(
        "validatedExpensesList",
        JSON.stringify(validatedExpensesList)
      );
      itemList = [];
      localStorage.setItem("itemList", JSON.stringify(itemList));
      updateItemList();
      updateValidatedExpensesList();
      updateRemainingAmount();
    } else {
      alert("Il n'y a pas d'éléments à valider.");
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem("remainingAmount", remainingAmount);
    localStorage.setItem("itemList", JSON.stringify(itemList));
  }

  const validateExpensesButton = document.getElementById(
    "validateExpensesButton"
  );
  validateExpensesButton.addEventListener("click", validateExpenses);

  const addItemButton = document.getElementById("addItemButton");
  addItemButton.addEventListener("click", addItem);

  updateRemainingAmount();
  updateItemList();
  updateValidatedExpensesList();
});
