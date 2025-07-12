import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          Happy Blogging!
        </div>
        <nav>
          <a href="/" className="nav-link">Home</a>
          <a href="/compose" className="nav-link">Compose</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/contact" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header; 