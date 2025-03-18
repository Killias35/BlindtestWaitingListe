document.addEventListener("DOMContentLoaded", () => {
    const heures = [
        { nom: "aaron", heure: "13:58" },
        { nom: "bb", heure: "14:45" },
        { nom: "george", heure: "13:53" },
        { nom: "salam", heure: "13:55" }
    ];

    const dates = heures.map(item => {
        const [heures, minutes] = item.heure.split(":").map(Number);
        const date = new Date();
        date.setHours(heures, minutes, 0, 0);  
        return { date, nom: item.nom };
    });

    const currentDate = new Date();

    const datesFiltrées = dates.filter(item => item.date > currentDate);

    const plusProche = datesFiltrées.reduce((min, current) => (current.date < min.date ? current : min), datesFiltrées[0]);

    // Calculer la différence en millisecondes entre l'heure actuelle et la prochaine heure
    const diffInMs = plusProche.date - currentDate;
    const diffInMinutes = Math.round(diffInMs / (1000 * 60)); 

    console.log(plusProche.nom);
    console.log("Diff in minutes:", diffInMinutes);  

    // Si l'événement commence dans moins de 5 minutes, afficher le nom de l'équipe
    if (diffInMinutes <= 5) {
        document.getElementById("nomEquipe").textContent = `PREPAREZ-VOUS ÉQUIPE ${plusProche.nom}`;
        document.getElementById("loading").style.display = "none";  
    } else {
        window.location.href = "/home";  
    }

    updateCountdown(Math.round(diffInMs / 1000));  
});

function updateCountdown(time) {
    const countdownElement = document.getElementById("countdown");
    const progressRing = document.querySelector('.progress-ring'); 
    const radius = progressRing.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    const intervalId = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        countdownElement.textContent = `${minutes} : ${seconds.toString().padStart(2, "0")}`;

        // Calcul de la progression et mise à jour de stroke-dashoffset
        const offset = circumference - (time / 300) * circumference;
        progressRing.style.strokeDashoffset = offset;

        if (time === 0) {
            clearInterval(intervalId);
            countdownElement.textContent = "C'est parti!";
        } else {
            time--;  // Décrémenter le temps
        }
    }, 1000);
}
