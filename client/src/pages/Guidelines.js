import React from "react";
import styles from "../styles/LandingPage.module.css";

const Guidelines = () => {
  return (
    <div className={styles.authContainer}>
      <h2>📚 ShelfShare Community Guidelines</h2>
      <p>
        We're excited to have you in our book-loving community! To keep things
        safe and fun, please follow these guidelines:
      </p>

      <ul
        style={{ textAlign: "left", marginTop: "1rem", paddingLeft: "1.5rem" }}
      >
        <li style={{ marginBottom: "1rem" }}>
          <strong>🤝 Respect and Trust:</strong> Be honest, kind, and punctual.
          Treat books and people with respect.
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <strong>📖 Lending Expectations:</strong> Only lend books in good
          condition, and be clear about return dates.
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <strong>📦 Borrowing Responsibilities:</strong> Return books on time
          and in good shape. Communicate if something comes up.
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <strong>🛡️ Safety and Privacy:</strong> Meet in public, don't
          overshare personal info, and report anything suspicious.
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <strong>📅 Duration and Limits:</strong> Stick to the agreed lending
          periods and terms.
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <strong>🚫 Prohibited Activities:</strong> No selling, pirated
          content, or harassment of any kind.
        </li>
      </ul>

      <p style={{ marginTop: "1.5rem" }}>
        By registering, you agree to follow these rules and help us build a
        friendly, trustworthy book-sharing community.
      </p>
      <p style={{ fontWeight: "bold", marginTop: "1rem" }}>
        Happy Reading! 💜
        <br />— The ShelfShare Team
      </p>
    </div>
  );
};

export default Guidelines;
