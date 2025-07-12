import Link from "next/link";
import styles from "./attestation.module.css";

export default function Attestation() {
  return (
    <main className={styles.container}>
      <h1>Attestation de réussite et d'intelligence collective</h1>
      <p>
        Ce projet, <b>Alwafra</b>, a été conçu, développé et synchronisé grâce à la collaboration entre <b>MOHAMED MORCHID</b>, plusieurs intelligences artificielles (DeepSeek, Copilot, Manus, Bolt, Gemini) et la communauté open source.<br /><br />
        L’ensemble du code, des scripts et des innovations est certifié, versionné et accessible publiquement sur GitHub (<a href="https://github.com/Enumerated-it/alwafra" target="_blank" rel="noopener noreferrer">Enumerated-it/alwafra</a>), garantissant la traçabilité, l’équité et la propriété intellectuelle.<br /><br />
        Cette attestation numérique marque une étape vers une intelligence collective, éthique et équitable, au service de l’humain et du bien commun.
      </p>
      <a href="/attestation/attestation-alwafra.pdf" download className={styles.downloadBtn}>
        Télécharger l'attestation PDF
      </a>
      <div className={styles.signature}>
        <p>MOHAMED MORCHID<br />Sentinel Cloud Studio Morchid</p>
      </div>
    </main>
  );
}
