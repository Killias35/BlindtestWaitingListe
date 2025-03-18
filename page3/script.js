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

function setDatas(datas) {
    const container = document.getElementById('response');
    container.innerHTML = ''; // Nettoie le contenu précédent
    console.log(datas)
    datas.slice(0, 5).forEach(data => { // Prend seulement les 5 premiers
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('data-item'); // Ajoute une classe pour le style
    
        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = `Nom : ${data.squadName}`;
    
        const timeParagraph = document.createElement('p');
        const beginTime = dateTohour(data.beginDate)
        timeParagraph.textContent = `${beginTime}`;
    
        dataDiv.appendChild(nameParagraph);
        dataDiv.appendChild(timeParagraph);
        container.appendChild(dataDiv);
    });    
}

function dateTohour(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0'); // Ajoute un 0 si nécessaire
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ajoute un 0 si nécessaire
    return `${hours}:${minutes}`;
}

// Appeler fetchData toutes les 3 secondes
setInterval(fetchData, 3000);

// Appel initial pour obtenir les données immédiatement au chargement
fetchData();
