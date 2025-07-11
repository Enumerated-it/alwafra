import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [minutes, setMinutes] = useState(0);
  const [mocPlus, setMocPlus] = useState(0);
  const [dh, setDh] = useState(0);
  const [eligible, setEligible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("utilisateur");
  const [registerResult, setRegisterResult] = useState("");
  const [certificat, setCertificat] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const MOC_PLUS_RATE = 7;
  const PAYOUT_THRESHOLD = 100;

  const handleCalculate = () => {
    setMocPlus(minutes);
    setDh(minutes * MOC_PLUS_RATE);
    setEligible(minutes * MOC_PLUS_RATE >= PAYOUT_THRESHOLD);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setRegisterResult("");
    setCertificat(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      setRegisterResult(data.message);
      if (data.certificat) setCertificat(data.certificat);
    } catch (e) {
      setRegisterResult("Erreur d'inscription. Veuillez réessayer.");
    }
    setIsRegistering(false);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>ALWAFRA – L'abondance équitable</h1>
        <nav style={{ marginBottom: 32 }}>
          <a
            href="/production"
            style={{
              color: "#1a7f37",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            {" "}
            → Accéder à la production numérique
          </a>
        </nav>
        <section style={{ marginBottom: 40 }}>
          <h2>Inscription</h2>
          <form
            onSubmit={handleRegister}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxWidth: 400,
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="utilisateur">Utilisateur</option>
              <option value="fondateur">Fondateur</option>
              <option value="visionnaire">Visionnaire</option>
            </select>
            <button
              type="submit"
              disabled={isRegistering}
              style={{
                background: isRegistering ? "#ccc" : "green",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: 5,
              }}
            >
              {isRegistering ? "Inscription..." : "S'inscrire"}
            </button>
          </form>
          {registerResult && (
            <p style={{ marginTop: 10 }}>{registerResult}</p>
          )}
          {certificat && (
            <pre
              style={{
                background: "#f8f8f8",
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
              }}
            >
              {JSON.stringify(certificat, null, 2)}
            </pre>
          )}
        </section>
        <section>
          <h2>Convertir mon temps en MOC+ et DH</h2>
          <label>
            Minutes d'occupation constructive&nbsp;
            <input
              type="number"
              value={minutes}
              min={0}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </label>
          <button onClick={handleCalculate}>Calculer</button>
          <div style={{ marginTop: 20 }}>
            <p>
              MOC+ générés : <b>{mocPlus}</b>
            </p>
            <p>
              Montant en dirhams (DH) : <b>{dh}</b>
            </p>
            {eligible ? (
              <p style={{ color: "green" }}>
                Vous êtes éligible à un virement automatique sur votre compte
                bancaire !
              </p>
            ) : (
              <p style={{ color: "orange" }}>
                Atteignez {PAYOUT_THRESHOLD} DH pour déclencher le virement.
              </p>
            )}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
