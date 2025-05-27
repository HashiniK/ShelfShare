import React from "react";
import styles from "../styles/LandingPage.module.css";
import { Card, CardMedia } from "@mui/material";
import theAlchemist from "../assets/images/The Alchemist.jpg";
import atomicHabits from "../assets/images/Atomic-Habits.jpg";
import HarryPotterBooksSeries from "../assets/images/HarryPotterBooksSeries.png";

const BookHighlights = () => {
  return (
    <section className={styles.highlights}>
      <h3>📖 Popular Books</h3>
      <div className={styles.bookGrid}>
        <div className={styles.bookCard}>
          {/* Image Card */}
          <Card>
            <CardMedia
              component="img"
              // height="700"
              image={theAlchemist}
              alt="The Alchemist by Paulo Coelho"
            />
          </Card>
          <h4>The Alchemist</h4>
          <p>by Paulo Coelho</p>
        </div>
        <div className={styles.bookCard}>
          <Card>
            <CardMedia
              component="img"
              // height="700"
              image={atomicHabits}
              alt="Atomic Habits by James Clear"
            />
          </Card>
          <h4>Atomic Habits</h4>
          <p>by James Clear</p>
        </div>
        <div className={styles.bookCard}>
          <Card>
            <CardMedia
              component="img"
              height="606"
              image={HarryPotterBooksSeries}
              alt="Harry Potter Series by J.K. Rowling"
            />
          </Card>
          <h4>Harry Potter Series</h4>
          <p>by J.K. Rowling</p>
        </div>
      </div>
    </section>
  );
};

export default BookHighlights;
