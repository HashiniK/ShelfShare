import React from "react";
import HeroSection from "../components/HeroSection";
import BookHighlights from "../components/BookHighlights";
import styles from "../styles/Home.module.css"; // Add this CSS file for specific styling if needed.

const Home = () => {
  return (
    <main className={styles.home}>
      <HeroSection />
      <BookHighlights />
    </main>
  );
};

export default Home;
