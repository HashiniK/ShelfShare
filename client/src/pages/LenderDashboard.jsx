import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/LenderDashboard.css";

const LenderDashboard = () => {
  const [listedBooks, setListedBooks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState("");

  // Utility function to decode JWT payload (to get userId)
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  // Fetch lender's books
  const fetchBooks = async () => {
    setLoadingBooks(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in.");

      const response = await axios.get("http://localhost:8080/books", {
        headers: { Authorization: `Bearer ${token}` },
        // You can use params if your backend supports filtering by user ID,
        // or filter on frontend as done below
      });

      // Extract userId from token
      const userData = parseJwt(token);
      const userId = userData ? userData._id : null;

      // Filter books owned by logged-in user (if backend does not filter)
      const myBooks = response.data.filter((book) => book.userId === userId);

      setListedBooks(myBooks);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books.");
    } finally {
      setLoadingBooks(false);
    }
  };

  // Fetch borrow requests for lender's books
  const fetchRequests = async () => {
    setLoadingRequests(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in.");

      const response = await axios.get(
        "http://localhost:8080/books/lender-requests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRequests(response.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Failed to load requests.");
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchRequests();
  }, []);

  // Handle approve/reject request
  const handleRequestAction = async (requestId, action) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in.");

      await axios.patch(
        `http://localhost:8080/requests/${requestId}`,
        { status: action },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Request ${action.toLowerCase()}ed successfully.`);

      // Update requests state to reflect change without refetching
      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: action } : req
        )
      );
    } catch (error) {
      console.error(`Error ${action.toLowerCase()}ing request:`, error);
      alert(`Failed to ${action.toLowerCase()} request.`);
    }
  };

  return (
    <section className="lenderDashboardSection">
      <h2 className="dashboardTitle">📦 Lender Dashboard</h2>
      <p className="dashboardSubtitle">
        Manage your listed books and lending requests.
      </p>

      {/* Error message */}
      {error && <p className="errorMessage">{error}</p>}

      {/* Listed Books */}
      <div className="dashboardSection">
        <h3>Your Listed Books</h3>
        {loadingBooks ? (
          <p>Loading books...</p>
        ) : (
          <div className="bookGrid">
            {listedBooks.length ? (
              listedBooks.map((book) => (
                <div className="bookCard" key={book._id}>
                  {book.image ? (
                    <CardMedia
                      component="img"
                      image={`http://localhost:8080${book.image}`}
                      alt={book.title}
                      className="bookImage"
                    />
                  ) : (
                    <div className="noImagePlaceholder">No Image</div>
                  )}
                  <h4>{book.title}</h4>
                  <p>{book.genre}</p>
                  <p>Status: {book.status || "Available"}</p>
                  <div className="bookActions">
                    <Link to={`/edit-book/${book._id}`}>Edit</Link> |{" "}
                    <Link to={`/delete-book/${book._id}`}>Delete</Link>
                  </div>
                </div>
              ))
            ) : (
              <p>You have no listed books yet.</p>
            )}

            {/* Add new book card */}
            <div className="bookCard addBookCard">
              <Link to="/add-book">
                <div className="addBookButton">➕ Add New Book</div>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Pending Requests */}
      <div className="dashboardSection">
        <h3>Pending Requests</h3>
        {loadingRequests ? (
          <p>Loading requests...</p>
        ) : requests.length > 0 ? (
          <ul className="requestList">
            {requests.map((req) => (
              <li key={req._id} className="requestItem">
                <div>
                  <strong>Borrower:</strong> {req.userId.name} ({req.userId.email})
                </div>
                <div>
                  <strong>Book:</strong> {req.bookId.title}
                </div>
                <div>
                  <strong>Requested At:</strong>{" "}
                  {new Date(req.requestedAt).toLocaleString()}
                </div>
                <div>
                  <strong>Status:</strong> {req.status || "Pending"}
                </div>
                <div className="requestActions">
                  {req.status === "Pending" && (
                    <>
                      <button onClick={() => handleRequestAction(req._id, "Approved")}>
                        Accept
                      </button>
                      <button onClick={() => handleRequestAction(req._id, "Rejected")}>
                        Reject
                      </button>
                    </>
                  )}
                  {(req.status === "Approved" || req.status === "Rejected") && (
                    <span className={`statusLabel ${req.status.toLowerCase()}`}>
                      {req.status}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No current requests.</p>
        )}
      </div>
    </section>
  );
};

export default LenderDashboard;
