import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" id="navbar__logo">gurshan.sidhar</Link>
        
        {/* Mobile Menu Button */}
        <div className={`navbar__toggle ${menuOpen ? "is-active" : ""}`} id="mobile-menu" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navbar Menu */}
        <ul className={`navbar__menu ${menuOpen ? "active" : ""}`}>
          <li className="navbar__item">
            <Link to="/" className="navbar__links" onClick={toggleMenu}>Home</Link>
          </li>
          <li className="navbar__item">
            <Link to="/projects" className="navbar__links" onClick={toggleMenu}>Projects</Link>
          </li>
          <li className="navbar__item">
            <Link to="/gallery" className="navbar__links" onClick={toggleMenu}>About Me</Link>
          </li>
          <li className="navbar__btn">
            <a href="/Gurshan Sidhar Resume.pdf" className="button" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
