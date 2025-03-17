const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors()); // Autoriser les requêtes externes
app.use(express.json()); // Lire le JSON dans les requêtes

// Charger les données existantes au démarrage
let dataList = [];

fs.readFile('data.json', 'utf8', (err, data) => {
    if (!err) {
        try {
            dataList = JSON.parse(data);
            console.log("✅ Données chargées avec succès !");
        } catch (e) {
            console.error("❌ Erreur de parsing JSON :", e);
        }
    }
});

// Route POST pour ajouter un élément et renvoyer la liste complète
app.post('/add', (req, res) => {
    const newData = req.body;
    if (!newData) {
        return res.status(400).json({ error: "Aucune donnée envoyée" });
    }
    newData['id'] = dataList.length;

    dataList.push(newData);

    // Sauvegarder dans le fichier JSON
    fs.writeFile('data.json', JSON.stringify(dataList, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la sauvegarde" });
        }
        res.json(dataList); // Retourne la liste mise à jour
    });
});

// Route GET pour récupérer et afficher le contenu de data.json
app.get('/data', (req, res) => {
    // Lire le fichier JSON pour récupérer les données
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la lecture du fichier" });
        }
        // Convertir le contenu en un objet JavaScript et renvoyer
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (e) {
            return res.status(500).json({ error: "Erreur de parsing du JSON" });
        }
    });
});

// Route POST pour réinitialiser toute la liste
app.post('/reset', (req, res) => {
    dataList = [];  // Réinitialiser la liste des données

    // Sauvegarder une liste vide dans le fichier JSON
    fs.writeFile('data.json', JSON.stringify(dataList, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la réinitialisation" });
        }
        res.json(dataList);
    });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
