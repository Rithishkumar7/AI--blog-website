import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Compose from "./Compose";
import Post from "./Post";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="App">
        <Header />
        <button
          className="theme-toggle"
          style={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}
          onClick={() => setDarkMode((d) => !d)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/posts/:postId" element={<Post />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
