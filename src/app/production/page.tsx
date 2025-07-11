import Link from "next/link";
import styles from "./production.module.css";

export default function Production() {
  return (
    <div className={styles.productionPage}>
      <h1>Production numérique</h1>
      <p>
        Cette section vous permettra bientôt d'accéder à des outils d'IA et de production numérique à la demande.
      </p>
      <h2>Outils recommandés (bientôt disponibles) :</h2>
      <ul>
        <li>Générateur de texte IA (rédaction, résumé, traduction...)</li>
        <li>Générateur d'images IA</li>
        <li>Générateur de certificats numériques</li>
        <li>Outils de calcul et d'automatisation</li>
        <li>...et bien plus selon vos besoins !</li>
      </ul>
      <p>
        <b>Vous pourrez télécharger chaque outil à la demande selon votre besoin et votre rôle sur la plateforme.</b>
      </p>
      <Link href="/">← Retour à l'accueil</Link>
    </div>
  );
}
