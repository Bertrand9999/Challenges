document.addEventListener("DOMContentLoaded", () => {
  const initialAmount = 400;
  let remainingAmount = initialAmount;

  // Obtenir une référence à Firestore
  const db = firebase.firestore();

  function addItem() {
    const itemName = document.getElementById("itemName").value;
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);

    if (itemName && itemPrice && remainingAmount >= itemPrice) {
      const item = { name: itemName, price: itemPrice };

      db.collection("expenses")
        .add(item)
        .then((docRef) => {
          item.id = docRef.id; // Ajoutez cette ligne pour récupérer l'ID de l'élément ajouté
          remainingAmount -= itemPrice;
          updateRemainingAmount();
          updateItemList();
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la dépense :", error);
        });
    } else {
      alert(
        "Vérifiez le nom et le prix de l'élément, ou vérifiez si vous avez suffisamment d'argent restant."
      );
    }
  }

  function updateRemainingAmount() {
    document.getElementById("remainingAmount").textContent = remainingAmount.toFixed(2);
  }

  function updateItemList() {
    const itemListElement = document.getElementById("itemList");
    itemListElement.innerHTML = "";

    db.collection("expenses").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        item.id = doc.id;

        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price} €`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Supprimer";
        removeButton.onclick = () => removeItem(item.id);
        li.appendChild(removeButton);
        itemListElement.appendChild(li);
      });
    });
  }

  function removeItem(itemId) {
    db.collection("expenses")
      .doc(itemId)
      .delete()
      .then(() => {
        updateRemainingAmount();
        updateItemList();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la dépense :", error);
      });
  }

  const addItemButton = document.getElementById("addItemButton");
  addItemButton.addEventListener("click", addItem);

  updateRemainingAmount();
  updateItemList();

  // Observer les modifications de la collection "expenses" en temps réel
  db.collection("expenses").onSnapshot((snapshot) => {
    remainingAmount = initialAmount - snapshot.docs.reduce((total, doc) => total + doc.data().price, 0);
    updateRemainingAmount();
    updateItemList();
  });
});
