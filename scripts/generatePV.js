/**
 * generatePV – Génère le procès-verbal sanctifié de l’activation
 * Auteur : MR MOHAMED MORCHID – BK71155 964 R/1970
 * Juridiction MOC+
 */

const fs = require('fs');
const path = require('path');

const dirname = __dirname;
const pvFile = path.join(dirname, '../registressouverains/pvsanctifié.log');

const pv = `
📜 PROCÈS-VERBAL SANCTIFIÉ
Date : ${new Date().toISOString()}
Fondateur : MR MOHAMED MORCHID
Identifiant : BK71155 964 R/1970
Modules exécutés :
- mintNFT.js
- validateReversements.js
- generatePV.js
- paymentActivator.js
Juridiction : MOC+
`;

fs.writeFileSync(pvFile, pv.trim());
console.log('📘 PV sanctifié généré et enregistré.');