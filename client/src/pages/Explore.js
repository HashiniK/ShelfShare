import React, { useState } from "react";
import "../styles/Explore.css";
import { CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import Fiction from "../assets/images/Fiction.png";
import Science from "../assets/images/Science.png";
import SelfDevelopment from "../assets/images/Self-esteem.jpg";
import History from "../assets/images/History.png";
import BorrowRequests from "../assets/images/Kids Borrowing Books Illustration.jpg";

const categories = [
  {
    title: "📚 Fiction",
    desc: "Escape into amazing stories and powerful narratives.",
    image: Fiction,
    path: '/fiction'
  },
  {
    title: "🔬 Science & Tech",
    desc: "Stay updated with the world of innovation and discovery.",
    image: Science,
    path: '/science'
  },
  {
    title: "🧠 Self-Development",
    desc: "Grow with the best self-help and productivity books.",
    image: SelfDevelopment,
    path: '/self-development'
  },
  {
    title: "🌍 History & Culture",
    desc: "Understand the world through insights into its past.",
    image: History,
    path: '/history'
  },
  {
    title: "🔖 Borrow Requests",
    desc: "Manage all your pending borrow requests in one place.",
    image: BorrowRequests,
    path: "/borrow-requests",
  },
];

const Explore = () => {
  // State for search query and selected genre filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  // Filter categories based on search and selected genre
  const filteredCategories = categories.filter((cat) => {
    const isSearchMatch =
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const isGenreMatch = selectedGenre
      ? cat.title.includes(selectedGenre)
      : true;
    return isSearchMatch && isGenreMatch;
  });

  return (
    <section className="exploreSection">
      <h2 className="exploreTitle">📖 Explore Our Book Collection</h2>
      <p className="exploreSubtitle">
        Dive into various genres and discover something new every day.
      </p>

      {/* Search Bar */}
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search for a genre or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchBar"
        />
      </div>

      {/* Filter by Genre Dropdown */}
      <div className="filterContainer">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="genreFilter"
        >
          <option value="">Filter by Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science & Tech</option>
          <option value="Self-Development">Self-Development</option>
          <option value="History">History & Culture</option>
        </select>
      </div>

      <div className="categoryGrid">
        {filteredCategories.map((cat, idx) => (
          <div className="categoryCard" key={idx}>
            <Link to={cat.path} style={{ textDecoration: "none"}}>
              {" "}
              <CardMedia
                component="img"
                image={cat.image}
                alt={cat.title}
                className="categoryImage"
              />
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Explore;
