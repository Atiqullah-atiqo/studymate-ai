"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function askAI() {
    const res = await fetch("/api/groq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>
        AI Assignment Helper
      </h1>

      <p className={styles.description}>
        Get help understanding your assignments with AI.
      </p>

      <textarea
        className={styles.input}
        placeholder="Enter your assignment question..."
        rows={5}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <br />

      <button
        className={styles.button}
        onClick={askAI}
      >
        Explain with AI
      </button>

      <h2>AI Response:</h2>

      <p>{answer}</p>
    </main>
  );
}