// Fonction pour récupérer et afficher les données toutes les 3 secondes

function fetchData() {
    fetch('http://localhost:3000/data', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        setDatas(data);
    })
    .catch(error => {
        console.error("Erreur :", error);
        document.getElementById('response').textContent = "Erreur : " + error;
    });
}

function setDatas(datas){
    console.log("Données récupérées :", datas);

    var leaderboardDiv = document.getElementById('joueurs');
    console.log(leaderboardDiv);
    let htmlContent = "";
    let rang = "";
    if (leaderboardDiv){
        datas.forEach(joueur => {
            if (joueur.id <= 2 && joueur.id >= 0){
                rang = `<img class="solar-ranking-bold" src="img/solar-ranking-bold-${joueur.id+1}.svg" alt="Premier rang" />`;
            }
            else{
                rang = ``;
            }
            htmlContent += `
                <li class="leaderboard-row">
                    <div class="frame">
                        ${rang}
                        <span class="text-wrapper-3">${joueur.squadName}</span>
                    </div>
                    <span class="text-wrapper-3">${joueur.id} pts</span>
                </li>
            `;
        });
        leaderboardDiv.setHTMLUnsafe(htmlContent);
    }


}

// Appeler fetchData toutes les 3 secondes
setInterval(fetchData, 3000);

// Appel initial pour obtenir les données immédiatement au chargement
fetchData();
