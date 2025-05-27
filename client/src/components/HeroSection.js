import { React } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LandingPage.module.css";
import { Button } from "@mui/material";
import AboutUs from "../pages/AboutUs";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <AboutUs />
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button className={styles.primaryBtn} variant="contained">
          Get Started
        </Button>
      </Link>
    </section>
  );
};

export default HeroSection;
