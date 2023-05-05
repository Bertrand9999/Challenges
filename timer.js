const joursElement = document.getElementById('jours');
const heuresElement = document.getElementById('heures');
const minutesElement = document.getElementById('minutes');
const secondesElement = document.getElementById('secondes');

const dateCible = new Date('2023-07-19T00:00:00'); // Modifiez cette date en fonction de la date cible souhaitée.

function updateTimer() {
    const maintenant = new Date();
    const tempsRestant = dateCible - maintenant;

    if (tempsRestant >= 0) {
        const jours = Math.floor(tempsRestant / (1000 * 60 * 60 * 24));
        const heures = Math.floor((tempsRestant % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((tempsRestant % (1000 * 60 * 60)) / (1000 * 60));
        const secondes = Math.floor((tempsRestant % (1000 * 60)) / 1000);

        joursElement.innerText = jours + ' Jours';
        heuresElement.innerText = heures + ' Heures';
        minutesElement.innerText = minutes + ' Minutes';
        secondesElement.innerText = secondes + ' Secondes';
    } else {
        joursElement.innerText = '0 Jours';
        heuresElement.innerText = '0 Heures';
        minutesElement.innerText = '0 Minutes';
        secondesElement.innerText = '0 Secondes';
    }
}

updateTimer();
setInterval(updateTimer, 1000);
