import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explore from "./pages/Explore";
import Home from "./pages/Home"; // Import the Home component
import LenderDashboard from "./pages/LenderDashboard";
import AddBook from "./pages/AddBook";
import Fiction from "./pages/Fiction";
import Science from "./pages/Science";
import History from "./pages/History";
import BorrowRequests from "./pages/BorrowRequests";
import SelfDevelopment from "./pages/SelfDevelopment";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/explore" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/lender-dashboard" element={<LenderDashboard />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/fiction" element={<Fiction />} />
        <Route path="/history" element={<History />} />
        <Route path="/self-development" element={<SelfDevelopment />} />
        <Route path="/science" element={<Science />} />
        <Route path="/borrow-requests" element={<BorrowRequests />} />
      </Routes>
    </>
  );
};

export default App;
