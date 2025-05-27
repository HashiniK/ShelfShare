import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/LandingPage.module.css";

const Register = () => {
  const [role, setRole] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      setError("Please agree to the community guidelines");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Collect form data
      const formData = new FormData(e.target);
      const userData = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: role,
        favoriteGenre: formData.get("favoriteGenre"),
        address: formData.get("address"),
        ...(role === "lender" && {
          booksToLend: formData.get("booksToLend"),
          preferredDuration: formData.get("preferredDuration"),
        }),
        ...(role === "borrower" && {
          interestedBooks: formData.get("interestedBooks"),
          pickupLocation: formData.get("pickupLocation"),
        }),
      };

      // Send registration request using Axios
      const response = await axios.post(
        "http://localhost:8080/register",
        userData
      );

      const data = response.data;

      if (data.success) {
        // Registration successful
        console.log("User registered successfully:", data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/login");
      } else {
        // Handle validation errors or failed registration
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        error.response?.data?.message ||
          "Network error. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Create an Account</h2>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        {error && <div className={styles.errorBox}>{error}</div>}

        <input type="text" name="fullName" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength="6"
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="lender">Lender</option>
          <option value="borrower">Borrower</option>
        </select>

        <input
          type="text"
          name="favoriteGenre"
          placeholder="Favorite Genre"
          required
        />
        <input type="text" name="address" placeholder="Address" required />

        {role === "lender" && (
          <>
            <input
              type="text"
              name="booksToLend"
              placeholder="Books You're Willing to Lend"
              required
            />
            <input
              type="text"
              name="preferredDuration"
              placeholder="Preferred Lend Duration (e.g., 2 weeks)"
              required
            />
          </>
        )}

        {role === "borrower" && (
          <>
            <input
              type="text"
              name="interestedBooks"
              placeholder="Books You're Interested In"
              required
            />
            <input
              type="text"
              name="pickupLocation"
              placeholder="Preferred Pickup Location"
              required
            />
          </>
        )}

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
          />
          I agree to the{" "}
          <a
            href="/guidelines"
            target="_blank"
            rel="noreferrer"
            className={styles.guidelinesLink}
          >
            community guidelines
          </a>
        </label>

        <button
          className={styles.primaryBtn}
          type="submit"
          disabled={!agreed || isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
