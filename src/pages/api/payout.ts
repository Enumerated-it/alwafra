// /src/pages/api/payout.ts
import type { NextApiRequest, NextApiResponse } from "next";

// Simule la détection de fraude (exemple simple)
function detectFraud({ amount, rib, apiUrl }: { amount: number; rib: string; apiUrl: string }) {
  // Exemples de règles :
  if (!apiUrl.startsWith("https://")) return "URL API invalide";
  if (!/^\d{21,24}$/.test(rib)) return "RIB invalide";
  if (amount <= 0) return "Montant invalide";
  // Ajouter ici d'autres règles (vérification d'identité, blacklist, etc.)
  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Méthode non autorisée" });
  const { amount, rib, apiUrl } = req.body;

  // Détection de fraude
  const fraud = detectFraud({ amount, rib, apiUrl });
  if (fraud) return res.status(400).json({ message: `Blocage sécurité : ${fraud}` });

  // Ici, intégrer l'appel à l'API bancaire réelle (Attijari, CIH, etc.)
  // Exemple fictif :
  // const response = await fetch(apiUrl, { method: 'POST', body: JSON.stringify({ amount, rib }) });
  // const result = await response.json();
  // if (!result.success) return res.status(400).json({ message: 'Erreur API bancaire' });

  // Pour la démo, on simule le succès :
  return res.status(200).json({ message: `Virement de ${amount} DH vers le compte ${rib} via ${apiUrl} déclenché avec succès !` });
}
