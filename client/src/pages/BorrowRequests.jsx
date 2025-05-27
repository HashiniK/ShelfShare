import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BorrowRequests.css";

const BorrowRequests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("You must be logged in to view borrow requests.");
          return;
        }

        const res = await axios.get("http://localhost:8080/books/borrow", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching borrow requests:", error);
        setMessage("Failed to fetch borrow requests.");
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="borrowRequestsSection">
      <h2 className="pageTitle">📋 Borrow Requests</h2>
      {message && <p className="errorMessage">{message}</p>}
      {requests.length > 0 ? (
        <div className="requestCards">
          {requests.map((req) => (
            <div className="requestCard" key={req._id}>
              <h3>{req.bookId.title}</h3>
              <p>
                <strong>Status:</strong> {req.status}
              </p>
              <p>
                <strong>Requested At:</strong>{" "}
                {new Date(req.requestedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !message && <p className="noRequestsMessage">No borrow requests available.</p>
      )}
    </div>
  );
};

export default BorrowRequests;
