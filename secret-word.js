function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function checkSecretWord() {
  var secretWord = document.getElementById("secretWord").value;
  if (secretWord == "Harmonie") {
    setCookie("lock1", "unlocked", 1);
    updateLocks();
  } else if (secretWord == "Paix") {
    setCookie("lock2", "unlocked", 1);
    updateLocks();
  } else if (secretWord == "Joie") {
    setCookie("lock3", "unlocked", 1);
    updateLocks();
  } else {
    alert("Mot secret incorrect.");
  }
}

function updateLocks() {
  var lock1 = getCookie("lock1");
  var lock2 = getCookie("lock2");
  var lock3 = getCookie("lock3");

  if (lock1 == "unlocked") {
    document.querySelector(".lock1").innerHTML = '<a href="https://bertrand9999.github.io/Challenges/stockholm.html"><i class="material-icons">lock_open</i></a>';
  }
  if (lock2 == "unlocked") {
    document.querySelector(".lock2").innerHTML = '<a href="https://bertrand9999.github.io/Challenges/lisbonne.html"><i class="material-icons">lock_open</i></a>';
  }
  if (lock3 == "unlocked") {
    document.querySelector(".lock3").innerHTML = '<a href="https://bertrand9999.github.io/Challenges/prague.html"><i class="material-icons">lock_open</i></a>';
  }
}

// Call updateLocks on page load to make sure locks are updated based on cookies
document.addEventListener("DOMContentLoaded", function () {
  updateLocks();
});
