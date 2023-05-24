document.addEventListener("DOMContentLoaded", () => {
  const initialAmount = 400;
  let remainingAmount = initialAmount;
  let itemList = [];
  let validatedExpensesList = [];

  // Obtenir une référence à Firestore
  var db = firebase.firestore();

  function addItem() {
    const itemName = document.getElementById("itemName").value;
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);

    if (itemName && itemPrice && remainingAmount >= itemPrice) {
      const item = { name: itemName, price: itemPrice };
      
      // Envoyer l'objet à Firestore
      db.collection('depenses').add({
          nom: item.name,
          prix: item.price,
          date: firebase.firestore.Timestamp.fromDate(new Date())
      })
      .then(function(docRef) {
          console.log('Dépense enregistrée avec l\'ID: ', docRef.id);
          item.id = docRef.id;
          itemList.push(item);
          remainingAmount -= itemPrice;
          updateRemainingAmount();
          updateItemList();
      })
      .catch(function(error) {
          console.error('Erreur lors de l\'ajout de la dépense: ', error);
      });
    } else {
      alert(
        "Vérifiez le nom et le prix de l'élément, ou vérifiez si vous avez suffisamment d'argent restant."
      );
    }
  }

  function updateValidatedExpensesList() {
    const validatedExpensesListElement = document.getElementById("validatedExpensesList");
    validatedExpensesListElement.innerHTML = "";

    validatedExpensesList.forEach((expense, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${expense.nom} - ${expense.prix} €`;
      validatedExpensesListElement.appendChild(listItem);
    });
  }

  function updateRemainingAmount() {
    document.getElementById("remainingAmount").textContent = remainingAmount.toFixed(2);
    document.getElementById("initialAmount").textContent = initialAmount.toFixed(2);
  }

  function updateItemList() {
    db.collection('depenses').get().then(function(querySnapshot) {
      itemList = [];
      querySnapshot.forEach(function(doc) {
        const item = doc.data();
        item.id = doc.id;
        itemList.push(item);
      });

      const itemListElement = document.getElementById("itemList");
      itemListElement.innerHTML = "";

      itemList.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.nom} - ${item.prix} €`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Supprimer";
        removeButton.onclick = () => removeItem(index);
        li.appendChild(removeButton);
        itemListElement.appendChild(li);
      });
    });
  }

  function removeItem(index) {
    const item = itemList[index];
    db.collection('depenses').doc(item.id).delete()
      .then(function() {
        console.log('Dépense supprimée avec l\'ID: ', item.id);
        remainingAmount += item.prix;
        itemList.splice(index, 1);
        updateRemainingAmount();
        updateItemList();
      })
      .catch(function(error) {
        console.error('Erreur lors de la suppression de la dépense: ', error);
      });
  }

  function validateExpenses() {
    if (itemList.length > 0) {
      const batch = db.batch();

      itemList.forEach((item) => {
        const docRef = db.collection('validatedExpenses').doc();
        batch.set(docRef, item);
      });

      batch.commit().then(() => {
        console.log('Dépenses validées enregistrées avec succès');
        remainingAmount -= itemList.reduce((total, item) => total + item.prix, 0);
        itemList = [];
        updateRemainingAmount();
        updateItemList();
        updateValidatedExpensesList();
      }).catch((error) => {
        console.error('Erreur lors de l\'enregistrement des dépenses validées : ', error);
      });
    } else {
      alert("Il n'y a pas d'éléments à valider.");
    }
  }

  const validateExpensesButton = document.getElementById("validateExpensesButton");
  validateExpensesButton.addEventListener("click", validateExpenses);

  const addItemButton = document.getElementById("addItemButton");
  addItemButton.addEventListener("click", addItem);

  // Récupérer les données initiales depuis Firebase
  db.collection('remainingAmount').doc('amount').get()
    .then((doc) => {
      if (doc.exists) {
        remainingAmount = doc.data().value;
        updateRemainingAmount();
      }
    });

  // Récupérer les dépenses validées depuis Firebase
  db.collection('validatedExpenses').get()
    .then((querySnapshot) => {
      validatedExpensesList = [];
      querySnapshot.forEach((doc) => {
        validatedExpensesList.push(doc.data());
      });
      updateValidatedExpensesList();
    });

  // Mettre à jour la liste des dépenses
  updateItemList();
});
