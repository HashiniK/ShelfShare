import React, { useState } from "react";
import axios from "axios";
import "../styles/AddBook.css";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    image: null,
  });
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated.");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("genre", formData.genre);
      data.append("description", formData.description);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.post("http://localhost:8080/books", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Book added successfully!");
      setFormData({
        title: "",
        author: "",
        genre: "",
        description: "",
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Error submitting book:", error);
      setMessage(error.response?.data?.message || "Failed to add book.");
    }
  };

  return (
    <div className="addBookContainer">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="addBookForm">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short Description"
          rows="4"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        {imagePreview && (
          <div className="imagePreview">
            <img src={imagePreview} alt="Book Preview" />
          </div>
        )}
        <button type="submit">Add Book</button>
      </form>
      {message && <p className="statusMessage">{message}</p>}
    </div>
  );
};

export default AddBook;
