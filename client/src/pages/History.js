import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Fiction.css";

const History = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("You must be logged in to view books.");
          return;
        }

        const res = await axios.get("http://localhost:8080/books?genre=History", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBooks(res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          setMessage("Unauthorized: Please log in again.");
        } else {
          setMessage("Failed to load books.");
        }
      }
    };
    fetchBooks();
  }, []);

  const handleBorrow = async (bookId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to borrow books.");
      return;
    }

    const res = await axios.post(
      "http://localhost:8080/books/borrow",
      { bookId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message || "Borrow request sent.");
  } catch (error) {
    console.error("Error sending borrow request:", error);
    alert("Failed to send borrow request.");
  }
};


  return (
    <div className="fictionContainer">
      <h2>📚 History Books</h2>
      {message && <p className="error">{message}</p>}
      <div className="bookGrid">
        {books.map((book) => (
          <div key={book._id} className="bookCard">
            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Genre:</strong> {book.genre}
            </p>
            <p>
              <strong>Description:</strong> {book.description}
            </p>
            <button onClick={() => handleBorrow(book._id)}>Borrow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
