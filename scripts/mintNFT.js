/**
 * mintNFT – Génère un NFT citoyen à partir d’un fichier JSON
 * Auteur : MR MOHAMED MORCHID – Fondateur Visionnaire, BK71155 964 R/1970
 * Juridiction MOC+
 */

const fs = require('fs');
const path = require('path');

/**
 * Crée un NFT citoyen à partir d’un fichier JSON.
 * @param {string} jsonFilePath - Chemin vers le fichier JSON décrivant le citoyen.
 * @returns {object} L’objet NFT généré et sauvegardé.
 */
function mintNFT(jsonFilePath) {
    try {
        // Lecture des données du citoyen
        const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

        // Génération d’un identifiant unique (timestamp + hash simple)
        const nftId = `NFT-${Date.now()}-${Math.floor(Math.random()*1000000)}`;

        const nft = {
            id: nftId,
            ...data,
            date_mint: new Date().toISOString(),
            sanctifie_par: "MR MOHAMED MORCHID",
            juridiction: "MOC+"
        };

        // Création du dossier de sortie si besoin
        const outputDir = path.join(__dirname, '../nftcertifications');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

        // Sauvegarde du NFT citoyen
        const outputPath = path.join(outputDir, `${nftId}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(nft, null, 2), 'utf8');

        console.log(`✅ NFT citoyen généré et sanctifié : ${outputPath}`);
        return nft;
    } catch (err) {
        console.error('Erreur lors du mint NFT citoyen :', err);
        return null;
    }
}

// Exemple d’utilisation (décommentez pour tester)
// mintNFT('./citoyen_exemple.json');

module.exports = { mintNFT };