import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/LandingPage.module.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Store the user's role
  const navigate = useNavigate();
  const location = useLocation();

  // Check token and role on mount or route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      // Decode token to fetch role (assuming role is in the payload)
      const decodedToken = parseJwt(token);
      setUserRole(decodedToken?.role || "user");
    } else {
      setUserRole(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Utility function to decode JWT payload
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        📚 ShelfShare
      </Link>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/home">Home</Link>
        </li>
  
        {isLoggedIn && (
          <li>
            <Link to={userRole === "lender" ? "/lender-dashboard" : "/explore"}>
              {userRole === "lender" ? "Dashboard" : "Explore"}
            </Link>
          </li>
        )}

        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register" className={styles.registerBtn}>
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button className={styles.registerBtn} onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
