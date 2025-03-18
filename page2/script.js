document.addEventListener("DOMContentLoaded", () => {
    // Generate random heures array with 4 entries
    const generateRandomTime = () => {
        const hours = Math.floor(Math.random() * 24);  // Random hour between 0 and 23
        const minutes = Math.floor(Math.random() * 60);  // Random minute between 0 and 59
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const generateRandomName = () => {
        const names = ['aaron', 'bob', 'george', 'salam', 'max', 'lucas', 'zoe', 'emily', 'jane', 'john'];
        const randomIndex = Math.floor(Math.random() * names.length);  // Pick a random name from the array
        return names[randomIndex];
    };

    // Generate random heures array
    const heures = Array.from({ length: 3000 }, () => ({
        nom: generateRandomName(),
        heure: generateRandomTime()
    }));

    console.log("Generated heures:", heures);

    // Rest of your code
    const dates = heures.map(item => {
        const [heures, minutes] = item.heure.split(":").map(Number);
        const date = new Date();
        date.setHours(heures, minutes, 0, 0);  
        return { date, nom: item.nom };
    });

    const currentDate = new Date();
    const datesFiltrées = dates.filter(item => item.date > currentDate);

    // Check if there are any filtered dates
    if (datesFiltrées.length === 0) {
        console.log("No future events found.");
        return;
    }

    const plusProche = datesFiltrées.reduce((min, current) => (current.date < min.date ? current : min), datesFiltrées[0]);

    const diffInMs = plusProche.date - currentDate;
    const diffInMinutes = Math.round(diffInMs / (1000 * 60));

    console.log(plusProche.nom);
    console.log("Diff in minutes:", diffInMinutes);  

    if (diffInMinutes <= 5) {
        document.getElementById("nomEquipe").textContent = `PREPAREZ-VOUS ÉQUIPE ${plusProche.nom}`;
        document.getElementById("loading").style.display = "none";  
    } else {
        window.location.href = "/home.html";  
    }

    updateCountdown(Math.round(diffInMs / 1000)); 
});

// Function for updating the countdown
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
            countdownElement.textContent = "Maintenant!";
        } else {
            time--;  // Décrémenter le temps
        }
    }, 1000);
}
