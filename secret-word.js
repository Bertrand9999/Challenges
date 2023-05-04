  function checkSecretWord() {
    var secretWord = document.getElementById("secretWord").value;
    var correctWord1 = "Harmonie";
    var correctWord2 = "Paix"; 
    var correctWord3 = "Joie"; 
    
    if (secretWord === correctWord1) {
      var lockedElement1 = document.querySelector(".lock1");
      lockedElement1.innerHTML = '<a href="https://bertrand9999.github.io/Challenges/stockholm.html"><i class="material-icons">lock_open</i></a>';
    } else if (secretWord === correctWord2) {
      var lockedElement2 = document.querySelector(".lock2");
       lockedElement2.innerHTML = '<a href="https://bertrand9999.github.io/Challenges/lisbonne.html"><i class="material-icons">lock_open</i></a>';
    } else if (secretWord === correctWord3) {
      var lockedElement3 = document.querySelector(".lock3");
      lockedElement3.innerHTML = '<a href="https://bertrand9999.github.io/Challenges/prague.html"><i class="material-icons">lock_open</i></a>';
    } else {
      alert("Le mot entré est incorrect. Veuillez réessayer.");
    }
  }
