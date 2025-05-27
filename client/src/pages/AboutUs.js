import React from "react";
import styles from "../styles/AboutUs.module.css";

const AboutUs = () => {
  return (
    <section className={styles.aboutUs}>
      <h2>Welcome to ShelfShare</h2>
      <p>
        ShelfShare, a platform designed to bring book lovers
        together. Whether you're looking to borrow, lend, or discover your next
        favorite read, we've got you covered!
      </p>
      <p>
        Join our community and start sharing the joy of reading with others in
        your area.
      </p>
    </section>
  );
};

export default AboutUs;
