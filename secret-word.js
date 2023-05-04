function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}  

function checkOpenedCadenas() {
  for (var i = 1; i <= 3; i++) {
    var cadenaStatus = getCookie("cadenas_" + i);
    var URL1 = "https://bertrand9999.github.io/Challenges/stockholm.html";
    var URL2 = "https://bertrand9999.github.io/Challenges/lisbonne.html";
    var URL3 = "https://bertrand9999.github.io/Challenges/prague.html";
    if (cadenaStatus == "open") {
      document.querySelector('.lock' + i).innerHTML = '<a href=URL + i><i class="material-icons">lock_open</i></a>';
    }
  }
}

function checkSecretWord(cadenaNumber) {
    var secretWord = document.getElementById("secretWord").value;
    var correctWord1 = "Harmonie";
    var correctWord2 = "Paix"; 
    var correctWord3 = "Joie"; 
  
    var cadenaNumber = 0;
      
    if (secretWord === correctWord1) {
      cadenaNumber=1;
      setCookie("cadenas_" + cadenaNumber, "open", 30); // Le cookie expire dans 30 jours
          var lockedElement1 = document.querySelector(".lock1");
      lockedElement1.innerHTML = '<a href="https://bertrand9999.github.io/Challenges/stockholm.html"><i class="material-icons">lock_open</i></a>';
    } else if (secretWord === correctWord2) {
      cadenaNumber=2;
      setCookie("cadenas_" + cadenaNumber, "open", 30); // Le cookie expire dans 30 jours
      var lockedElement2 = document.querySelector(".lock2");
      lockedElement2.innerHTML = '<a href="https://bertrand9999.github.io/Challenges/lisbonne.html"><i class="material-icons">lock_open</i></a>';
    } else if (secretWord === correctWord3) {
      cadenaNumber=3;
      setCookie("cadenas_" + cadenaNumber, "open", 30); // Le cookie expire dans 30 jours
      var lockedElement3 = document.querySelector(".lock3");
      lockedElement3.innerHTML = '<a href="https://bertrand9999.github.io/Challenges/prague.html"><i class="material-icons">lock_open</i></a>';
    } else {
      alert("Le mot entré est incorrect. Veuillez réessayer.");
    }
  }
