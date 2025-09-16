/**
 * validateReversements – Vérifie et valide les reversements QR
 * Auteur : MR MOHAMED MORCHID – BK71155 964 R/1970
 * Juridiction MOC+
 */

const fs = require('fs');
const path = require('path');

const dirname = __dirname;
const folder = path.join(dirname, '../reversementsqr');
const logFile = path.join(dirname, '../registressouverains/reversementsvalidés.log');

const log = [];

fs.readdirSync(folder).forEach(file => {
  if (file.endsWith('.json')) {
    const data = JSON.parse(fs.readFileSync(path.join(folder, file), 'utf8'));

    const isValid = data.qr_code && data.montant > 0 && data.surface;
    const status = isValid ? 'validé' : 'rejeté';

    log.push(`🔍 ${file} → ${status}`);
    data.status = status;

    fs.writeFileSync(path.join(folder, file), JSON.stringify(data, null, 2), 'utf8');
  }
});

fs.writeFileSync(logFile, log.join('\n'));
console.log('✅ Reversements QR vérifiés et consignés.');
