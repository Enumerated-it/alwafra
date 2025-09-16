/**
 * autoAudit – Génère un rapport hebdomadaire citoyen sanctifié
 * Auteur : MR MOHAMED MORCHID – BK71155 964 R/1970
 * Juridiction MOC+
 */

const fs = require('fs');
const path = require('path');

const dirname = __dirname;

// Chemins vers les ressources à auditer
const reversementsDir = path.join(dirname, '../reversementsqr');
const nftDir = path.join(dirname, '../nftcertifications');
const pvFile = path.join(dirname, '../registressouverains/pvsanctifié.log');
const auditFile = path.join(dirname, '../registressouverains/audit_hebdo.log');

// Agrégation des reversements validés
let reversements = [];
let surfaceTotale = 0;
if (fs.existsSync(reversementsDir)) {
  fs.readdirSync(reversementsDir).forEach(file => {
    if (file.endsWith('.json')) {
      const data = JSON.parse(fs.readFileSync(path.join(reversementsDir, file), 'utf8'));
      if (data.status === 'validé') {
        reversements.push(`- ${file} | Surface : ${data.surface} m² | Montant : ${data.montant} | QR : ${data.qr_code}`);
        surfaceTotale += Number(data.surface) || 0;
      }
    }
  });
}

// Comptage des NFT générés
let nftCount = 0;
if (fs.existsSync(nftDir)) {
  nftCount = fs.readdirSync(nftDir).filter(f => f.endsWith('.json')).length;
}

// Lecture du dernier PV sanctifié
let pvResume = '';
if (fs.existsSync(pvFile)) {
  const pvContent = fs.readFileSync(pvFile, 'utf8');
  const lines = pvContent.trim().split('\n');
  pvResume = lines.slice(0, 8).join('\n') + '\n...';
}

const now = new Date().toISOString();

// Génération du rapport sanctifié
const rapport = `
🗂️ RAPPORT HEBDOMADAIRE CITOYEN SANCTIFIÉ
Date/heure d’exécution : ${now}

1️⃣ Reversements validés :
${reversements.length ? reversements.join('\n') : 'Aucun reversement validé.'}

2️⃣ Surface totale activée : ${surfaceTotale} m²

3️⃣ Nombre de NFT citoyen générés : ${nftCount}

4️⃣ Résumé du dernier PV sanctifié :
${pvResume}

Fondateur : MR MOHAMED MORCHID – BK71155 964 R/1970
Juridiction : MOC+
`;

fs.writeFileSync(auditFile, rapport.trim());
console.log('🗂️ Rapport hebdomadaire citoyen sanctifié généré et archivé.');
