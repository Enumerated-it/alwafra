import type { NextApiRequest, NextApiResponse } from "next";

// Simule une inscription utilisateur avec différenciation des rôles
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Méthode non autorisée" });
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email et mot de passe requis" });
    // Simuler la création d'utilisateur (à remplacer par une vraie base de données)
    // Vérifier si l'utilisateur existe déjà, etc.
    // Générer un certificat si le rôle est fondateur ou visionnaire
    let certificat = null;
    if (["fondateur", "visionnaire"].includes(role)) {
      certificat = {
        date: new Date().toISOString(),
        utilisateur: email,
        role,
        certification: "Certificat d'authenticité MOC+ (SEO, IA, Blockchain)"
      };
    }
    return res.status(200).json({ message: "Inscription réussie", certificat });
  } catch (e) {
    return res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
  }
}
